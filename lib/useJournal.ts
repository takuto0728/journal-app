'use client'

import { useState, useEffect, useCallback } from 'react'
import { JournalEntry, JournalDraft } from './types'
import { QUESTIONS } from './questions'

const ENTRIES_KEY = 'journal_entries'
const DRAFT_KEY = 'journal_draft'

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

export function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [draft, setDraft] = useState<JournalDraft | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setEntries(loadFromStorage<JournalEntry[]>(ENTRIES_KEY, []))
    setDraft(loadFromStorage<JournalDraft | null>(DRAFT_KEY, null))
    setLoaded(true)
  }, [])

  const saveEntry = useCallback((answers: string[]) => {
    const now = new Date().toISOString()
    const entry: JournalEntry = {
      id: `entry_${Date.now()}`,
      date: now.split('T')[0],
      answers: QUESTIONS.map((q, i) => ({
        questionId: q.id,
        questionText: q.text,
        text: answers[i] ?? '',
      })),
      createdAt: now,
      updatedAt: now,
    }
    setEntries(prev => {
      const next = [entry, ...prev]
      saveToStorage(ENTRIES_KEY, next)
      return next
    })
    return entry
  }, [])

  const saveDraft = useCallback((answers: string[]) => {
    const d: JournalDraft = {
      date: new Date().toISOString().split('T')[0],
      answers,
      updatedAt: new Date().toISOString(),
    }
    setDraft(d)
    saveToStorage(DRAFT_KEY, d)
  }, [])

  const clearDraft = useCallback(() => {
    setDraft(null)
    if (typeof window !== 'undefined') localStorage.removeItem(DRAFT_KEY)
  }, [])

  const deleteEntry = useCallback((id: string) => {
    setEntries(prev => {
      const next = prev.filter(e => e.id !== id)
      saveToStorage(ENTRIES_KEY, next)
      return next
    })
  }, [])

  return { entries, draft, loaded, saveEntry, saveDraft, clearDraft, deleteEntry }
}
