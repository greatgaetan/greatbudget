import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { bankAccountPatchSchema } from "@/lib/validations/bankAccount"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const routeContextSchema = z.object({
  params: z.object({
    bankAccountId: z.string(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this bank account.
    if (
      !(await verifyCurrentUserHasAccessToBankAccount(params.bankAccountId))
    ) {
      return NextResponse.json(null, { status: 403 })
    }

    // Delete the bank account.
    await db.bankAccount.delete({
      where: {
        id: params.bankAccountId,
      },
    })

    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 })
    }

    return NextResponse.json(null, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  console.log("In bank-accounts PATCH")
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this bank account.
    if (
      !(await verifyCurrentUserHasAccessToBankAccount(params.bankAccountId))
    ) {
      console.log("User does not have access to this bank account")
      return NextResponse.json(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    const body = bankAccountPatchSchema.parse(json)

    await db.bankAccount.update({
      where: {
        id: params.bankAccountId,
      },
      data: {
        name: body.name,
      },
    })

    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    console.log("Error in PATCH: ", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 })
    }

    return NextResponse.json(null, { status: 500 })
  }
}

async function verifyCurrentUserHasAccessToBankAccount(bankAccountId: string) {
  const session = await getServerSession(authOptions)
  const count = await db.bankAccount.count({
    where: {
      id: bankAccountId,
      userId: session?.user.id,
    },
  })

  return count > 0
}
