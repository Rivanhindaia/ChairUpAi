import Link from 'next/link'

export default function ProCard({
  id, name, category, city, priceFrom = 25, rating = 4.8, reviews = 120
}: {
  id: string; name: string; category?: string | null; city?: string | null;
  priceFrom?: number; rating?: number; reviews?: number;
}) {
  return (
    <Link href={`/customer/${id}`} className="card lift overflow-hidden block">
      <div className="flex gap-4 p-4">
        <div className="h-16 w-16 rounded-xl skel" />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-semibold">{name}</div>
              <div className="text-sm text-gray-600">{category ?? '—'} • {city ?? '—'}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">{rating.toFixed(1)}★</div>
              <div className="text-xs text-gray-500">{reviews} reviews</div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm text-gray-600">From ${priceFrom}</div>
            <div className="text-xs text-gray-500">Tap to view services</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
