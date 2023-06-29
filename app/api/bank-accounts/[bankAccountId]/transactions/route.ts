import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { TransactionType } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const routeContextSchema = z.object({
  params: z.object({
    bankAccountId: z.string(),
  }),
})

const postBody = z.object({
  categoryName: z.string(),
  category: z.string(),
  amount: z.number(),
  description: z.string(),
  type: z.enum([TransactionType.INCOME, TransactionType.EXPENSE]),
})

export async function DELETE(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  console.log("In the delete route of transactions")
  const { params } = routeContextSchema.parse(context)
  if (req.method !== "DELETE") {
    return new Response("Method not allowed", { status: 405 })
  }
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      console.log("You may not delete transactions if you're not logged in")
      return NextResponse.json("Unauthorized", { status: 403 })
    }
    if (
      !(await verifyCurrentUserHasAccessToBankAccount(params.bankAccountId))
    ) {
      console.log("User does not have access to this bank account")
      return NextResponse.json(null, { status: 403 })
    }

    const idsParam = req.nextUrl.searchParams.get("ids")
    const ids = JSON.parse(decodeURIComponent(idsParam || "")) as string[]
    //Check if the user has access to the transactions
    if (!(await verifyCurrentUserHasAccessToTransactions(ids))) {
      console.log("User has no access to these transactions")
      return NextResponse.json(
        "You're not authorized to delete these transaction(s)",
        { status: 403 }
      )
    }
    try {
      console.log("IDs to delete:", ids)
      const deleteResult = await db.transaction.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      })
      console.log("Delete result:", deleteResult)
      return NextResponse.json(
        `Successfully deleted ${ids.length} transaction(s).`,
        { status: 200 }
      )
    } catch (error) {
      console.log("Error in Prisma deleteMany operation:", error)
      return NextResponse.json(
        error ?? "An error occured while deleting transactions",
        { status: 500 }
      )
    }
  } catch (error) {
    console.log("An error occured during transactions DELETE", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 })
    }

    return NextResponse.json(
      error ?? "An error occured while deleting transactions",
      { status: 500 }
    )
  }
}

export async function POST(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  const { params } = routeContextSchema.parse(context)

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 })
  }

  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      console.log("You may not create transactions if you're not logged in")
      return NextResponse.json("Unauthorized", { status: 403 })
    }

    if (
      !(await verifyCurrentUserHasAccessToBankAccount(params.bankAccountId))
    ) {
      console.log("User does not have access to this bank account")
      return NextResponse.json(null, { status: 403 })
    }

    const json = await req.json()
    const body = postBody.parse(json)

    // Find category or create new one
    let category = await db.transactionCategory.findFirst({
      where: {
        userId: session.user.id,
        id: body.category,
      },
    })

    if (!category) {
      console.log("Category does not exist, creating it")
      category = await db.transactionCategory.create({
        data: {
          name: body.categoryName,
          user: {
            connect: {
              id: session.user.id,
            },
          },
        },
      })
    }

    // Create transaction
    await db.transaction.create({
      data: {
        amount: body.amount,
        type: body.type,
        description: body.description,
        category: {
          connect: {
            id: category.id,
          },
        },
        bankAccount: {
          connect: {
            id: params.bankAccountId,
          },
        },
      },
    })

    return NextResponse.json("Successfully created transaction", {
      status: 201,
    })
  } catch (error) {
    console.log("An error occured during transactions POST", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 })
    }

    return NextResponse.json(
      error ?? "An error occured while creating transaction",
      { status: 500 }
    )
  }
}

async function verifyCurrentUserHasAccessToTransactions(
  transactionsIds: string[]
) {
  const session = await getServerSession(authOptions)
  // Fetch all the transactions the user is trying to delete
  const transactions = await db.transaction.findMany({
    where: {
      id: {
        in: transactionsIds,
      },
    },
    include: {
      bankAccount: true,
    },
  })

  // Check if the user has access to all the transactions
  return transactions.every(
    (transaction) => transaction.bankAccount.userId === session?.user.id
  )
}

const verifyCurrentUserHasAccessToBankAccount = async (
  bankAccountId: string
) => {
  const session = await getServerSession(authOptions)
  // Fetch the bank account the user is trying to access
  const bankAccount = await db.bankAccount.findUnique({
    where: {
      id: bankAccountId,
    },
  })

  // Check if the user has access to the bank account
  return bankAccount?.userId === session?.user.id
}
