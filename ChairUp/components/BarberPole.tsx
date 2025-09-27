export default function BarberPole() {
  return (
    <div className="relative h-64 w-16 mx-auto">
      <div className="absolute inset-0 rounded-full bg-gray-200 border border-gray-300" />
      <div className="absolute inset-1 rounded-full pole" />
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-6 w-10 rounded-t-2xl bg-gray-300 border border-gray-400" />
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-6 w-10 rounded-b-2xl bg-gray-300 border border-gray-400" />
    </div>
  )
}
