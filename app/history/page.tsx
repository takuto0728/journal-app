'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useJournal } from '@/lib/useJournal'

export default function HistoryPage() {
  const { entries, loaded, deleteEntry } = useJournal()
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    deleteEntry(id)
    setConfirmId(null)
  }

  if (!loaded) {
    return (
      <div className="min-h-[100svh] bg-amber-50 flex items-center justify-center">
        <p className="text-amber-600">読み込み中...</p>
      </div>
    )
  }

  return (
    <div className="min-h-[100svh] bg-amber-50 max-w-md mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/" className="text-amber-600">← 戻る</Link>
        <h1 className="text-2xl font-bold text-amber-900">過去の記録</h1>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-16 text-amber-500">
          <p className="text-4xl mb-4">📔</p>
          <p>まだ記録がありません</p>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="bg-white rounded-2xl p-4 shadow-sm border border-amber-100">
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm font-semibold text-amber-700">{entry.date}</span>
                <button
                  onClick={() => setConfirmId(entry.id)}
                  className="text-xs text-red-400 hover:text-red-600 px-2 py-1"
                >
                  🗑️ 削除
                </button>
              </div>
              {entry.answers.map((ans) => (
                <div key={ans.questionId} className="mb-3">
                  <p className="text-xs text-amber-600 mb-1">{ans.questionText}</p>
                  <p className="text-sm text-gray-800">{ans.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {confirmId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-xs w-full">
            <p className="font-semibold text-gray-800 mb-4">この記録を削除しますか？</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmId(null)} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600">
                キャンセル
              </button>
              <button onClick={() => handleDelete(confirmId)} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold">
                削除する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
