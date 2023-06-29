import { Prisma, PrismaClient, TransactionType } from "@prisma/client"

const db = new PrismaClient()
async function main() {
  for (let i = 0; i < 10; i++) {
    const amount = Math.floor(Math.random() * 1000)
    const type =
      Math.random() > 0.5 ? TransactionType.INCOME : TransactionType.EXPENSE
    await db.transaction.create({
      data: {
        amount,
        description: "Fake transaction",
        bankAccount: {
          connect: {
            id: "clj37an0t0001ru6x1wve0nm2",
          },
        },
        type,
        category: {
          connect: {
            id: "clj4pviyu0004ruptb7sazpb4",
          },
        },
      },
    })
  }
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
