import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.question.deleteMany()
  await prisma.question.createMany({
    data: [
      { text: '今日、一番よかったことは何ですか？', order: 1 },
      { text: '今日、感謝できることを一つ挙げてください。', order: 2 },
      { text: '明日、楽しみにしていることは何ですか？', order: 3 },
    ],
  })
  console.log('Seeded!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
