import { prisma } from '@/lib/db'
import Link from 'next/link'

export default async function HistoryPage() {
  const entries = await prisma.entry.findMany({
    orderBy: { createdAt: 'desc' },
    include: { answers: { include: { question: true }, orderBy: { question: { order: 'asc' } } } },
  })

  return (
    <main className="min-h-screen bg-amber-50 px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/" className="text-amber-500 text-2xl leading-none">←</Link>
          <h1 className="text-2xl font-bold text-amber-900">過去の記録</h1>
        </div>
        {entries.length === 0 && (
          <p className="text-center text-amber-500 mt-20">まだ記録がありません</p>
        )}
        <div className="space-y-4">
          {entries.map(entry => (
            <div key={entry.id} className="bg-white rounded-2xl p-4 shadow-sm border border-amber-100">
              <p className="text-sm text-amber-500 mb-3">
                {new Date(entry.createdAt).toLocaleDateString('ja-JP', {
                  year: 'numeric', month: 'long', day: 'numeric', weekday: 'short'
                })}
              </p>
              <div className="space-y-3">
                {entry.answers.map(a => (
                  <div key={a.id}>
                    <p className="text-xs font-semibold text-amber-600 mb-1">{a.question.text}</p>
                    <p className="text-gray-800 text-sm leading-relaxed">{a.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
