'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Question = { id: number; text: string; order: number }

export default function JournalPage() {
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<string[]>(['', '', ''])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/questions').then(r => r.json()).then(setQuestions)
  }, [])

  if (!questions.length) return (
    <div className="min-h-[100svh] bg-amber-50 flex items-center justify-center">
      <p className="text-amber-500">読み込み中...</p>
    </div>
  )

  const q = questions[current]
  const progress = ((current + 1) / questions.length) * 100

  const handleNext = async () => {
    if (!answers[current].trim()) return
    if (current < questions.length - 1) {
      setCurrent(current + 1)
    } else {
      setLoading(true)
      await fetch('/api/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: questions.map((q, i) => ({ questionId: q.id, text: answers[i] })),
        }),
      })
      router.push('/journal/done')
    }
  }

  return (
    <main className="min-h-[100svh] bg-amber-50 flex flex-col">
      <div className="max-w-md mx-auto w-full px-4 pt-10 pb-28 flex flex-col flex-1">
        {/* プログレスバー */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-amber-600 mb-2">
            <span>質問 {current + 1} / {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-amber-200 rounded-full">
            <div className="h-2 bg-amber-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* 質問と入力 */}
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-xl font-bold text-amber-900 mb-6 leading-relaxed">{q.text}</p>
          <textarea
            className="w-full bg-white border-2 border-amber-200 rounded-2xl p-4 text-base text-gray-800 resize-none focus:outline-none focus:border-amber-400 min-h-[200px]"
            placeholder="ここに入力..."
            value={answers[current]}
            onChange={e => {
              const next = [...answers]
              next[current] = e.target.value
              setAnswers(next)
            }}
            autoFocus
          />
        </div>
      </div>

      {/* 固定ボタン */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-50 border-t border-amber-100 px-4 py-3">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleNext}
            disabled={!answers[current].trim() || loading}
            className="w-full h-14 bg-amber-500 disabled:bg-amber-200 text-white font-bold rounded-2xl text-lg transition-colors shadow-md"
          >
            {loading ? '保存中...' : current < questions.length - 1 ? '次へ →' : '完了 ✓'}
          </button>
        </div>
      </div>
    </main>
  )
}
