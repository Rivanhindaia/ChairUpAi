export default function NeonSign({ text = 'OPEN' }: { text?: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-blue-200 bg-white">
      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
      <span className="font-bold tracking-widest neon text-sky-600">{text}</span>
    </div>
  )
}
