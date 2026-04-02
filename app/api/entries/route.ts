import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  const { answers } = await req.json()
  const entry = await prisma.entry.create({
    data: {
      answers: {
        create: answers.map((a: { questionId: number; text: string }) => ({
          questionId: a.questionId,
          text: a.text,
        })),
      },
    },
    include: { answers: true },
  })
  return NextResponse.json(entry)
}

export async function GET() {
  const entries = await prisma.entry.findMany({
    orderBy: { createdAt: 'desc' },
    include: { answers: { include: { question: true } } },
  })
  return NextResponse.json(entries)
}
