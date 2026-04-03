export type Answer = {
  questionId: number
  questionText: string
  text: string
}

export type JournalEntry = {
  id: string
  date: string
  answers: Answer[]
  createdAt: string
  updatedAt: string
}

export type JournalDraft = {
  date: string
  answers: string[]
  updatedAt: string
}
