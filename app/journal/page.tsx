'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { QUESTIONS } from '@/lib/questions'
import { useJournal } from '@/lib/useJournal'

export default function JournalPage() {
  const router = useRouter()
  const { draft, loaded, saveEntry, saveDraft, clearDraft } = useJournal()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>(['', '', ''])
  const [draftRestored, setDraftRestored] = useState(false)
  const autoSaveRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (loaded && draft && !draftRestored) {
      const today = new Date().toISOString().split('T')[0]
      if (draft.date === today) {
        setAnswers(draft.answers)
        const lastAnswered = draft.answers.reduce((last, a, i) => a.trim() ? i : last, -1)
        if (lastAnswered >= 0) setStep(Math.min(lastAnswered + 1, QUESTIONS.length - 1))
        setDraftRestored(true)
      }
    }
  }, [loaded, draft, draftRestored])

  const handleChange = (value: string) => {
    const next = [...answers]
    next[step] = value
    setAnswers(next)
    if (autoSaveRef.current) clearTimeout(autoSaveRef.current)
    autoSaveRef.current = setTimeout(() => saveDraft(next), 800)
  }

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      saveEntry(answers)
      clearDraft()
      router.push('/journal/done')
    }
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
    else router.push('/')
  }

  const current = QUESTIONS[step]
  const progress = ((step + 1) / QUESTIONS.length) * 100

  return (
    <div className="min-h-[100svh] bg-amber-50 flex flex-col max-w-md mx-auto">
      <div className="flex-1 px-4 pt-8 pb-28">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-amber-600 mb-2">
            <span>{step + 1} / {QUESTIONS.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-amber-200 rounded-full">
            <div className="h-2 bg-amber-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <h2 className="text-xl font-bold text-amber-900 mb-6 leading-relaxed">{current.text}</h2>
        <textarea
          className="w-full min-h-[200px] p-4 rounded-xl border-2 border-amber-200 bg-white focus:outline-none focus:border-amber-400 text-gray-800 text-base resize-none"
          placeholder="ここに入力してください..."
          value={answers[step]}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-amber-50 border-t border-amber-200 p-4 flex gap-3 max-w-md mx-auto">
        <button onClick={handleBack} className="flex-1 h-14 rounded-xl border-2 border-amber-300 text-amber-700 font-semibold text-base">
          {step === 0 ? 'ホームへ' : '前へ'}
        </button>
        <button onClick={handleNext} disabled={!answers[step].trim()} className="flex-1 h-14 rounded-xl bg-amber-500 text-white font-semibold text-base disabled:opacity-40">
          {step === QUESTIONS.length - 1 ? '完了' : '次へ'}
        </button>
      </div>
    </div>
  )
}
