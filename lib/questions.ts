export const QUESTIONS = [
  { id: 1, text: '今日、一番よかったことは何ですか？', order: 1 },
  { id: 2, text: '今日、感謝できることを一つ挙げてください。', order: 2 },
  { id: 3, text: '明日、楽しみにしていることは何ですか？', order: 3 },
] as const

export type Question = typeof QUESTIONS[number]
