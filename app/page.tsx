import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-amber-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        <div className="text-6xl mb-6">📔</div>
        <h1 className="text-3xl font-bold text-amber-900 mb-3">今日のジャーナル</h1>
        <p className="text-amber-700 mb-10 text-base">3つの質問に答えて、今日を振り返ろう。</p>
        <Link
          href="/journal"
          className="block w-full bg-amber-500 hover:bg-amber-600 text-white font-bold h-14 flex items-center justify-center rounded-2xl text-lg transition-colors shadow-md"
        >
          今日の記録を始める
        </Link>
        <Link
          href="/history"
          className="block w-full mt-4 bg-white border-2 border-amber-300 text-amber-700 font-semibold h-14 flex items-center justify-center rounded-2xl text-lg"
        >
          過去の記録を見る
        </Link>
      </div>
    </main>
  )
}
