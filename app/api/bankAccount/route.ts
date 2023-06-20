import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

const bankAccountCreateSchema = z.object({
  name: z.string(),
})
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 403 })
    }

    const { user } = session
    const bankAccounts = await db.bankAccount.findMany({
      select: {
        id: true,
        name: true,
        categories: true,
      },
      where: {
        userId: user.id,
      },
    })

    return NextResponse.json(bankAccounts, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 403 })
    }

    const { user } = session

    const json = await req.json()
    const body = bankAccountCreateSchema.parse(json)

    if (!body.name || body.name.length < 0 || body.name.length > 25) {
      return NextResponse.json("Name must be between 2 and 25 characters", {
        status: 400,
      })
    }
    const bankAccounts = await db.bankAccount.create({
      data: {
        name: body.name,
        userId: user.id,
      },
      select: {
        id: true,
      },
    })
    return NextResponse.json(bankAccounts, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 })
    }

    return NextResponse.json(error, { status: 500 })
  }
}
