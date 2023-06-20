import { db } from "@/lib/db"
import { isValidEmail } from "@/utils/email"
import { Prisma } from "@prisma/client"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 })
  }

  const { email, password, confirmPassword, name } = await request.json()

  if (password !== confirmPassword) {
    return NextResponse.json("Passwords do not match", { status: 400 })
  }

  if (!isValidEmail(email)) {
    return NextResponse.json("Invalid email", { status: 400 })
  }

  if (name.length < 2 || name.length > 25) {
    return NextResponse.json("Name must be between 2 and 25 characters", {
      status: 400,
    })
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  try {
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Check if email is already in use
      if (error.code === "P2002") {
        return NextResponse.json(
          "This email is already in use. Please try again with another email.",
          { status: 500 }
        )
      }
    }
    return NextResponse.json(error, { status: 500 })
  }
}
