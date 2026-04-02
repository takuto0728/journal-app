import Link from 'next/link'

export default function DonePage() {
  return (
    <main className="min-h-screen bg-amber-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        <div className="text-7xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-amber-900 mb-3">お疲れさまでした！</h1>
        <p className="text-amber-700 mb-10">今日のジャーナルを記録しました。</p>
        <Link href="/" className="block w-full bg-amber-500 text-white font-bold h-14 flex items-center justify-center rounded-2xl text-lg shadow-md mb-4">
          ホームへ戻る
        </Link>
        <Link href="/history" className="block w-full bg-white border-2 border-amber-300 text-amber-700 font-semibold h-14 flex items-center justify-center rounded-2xl text-lg">
          過去の記録を見る
        </Link>
      </div>
    </main>
  )
}
