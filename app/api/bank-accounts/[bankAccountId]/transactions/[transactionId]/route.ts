import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  console.log("In the get route of transactions")
  return NextResponse.json("Hello from the get route of transactions")
}
