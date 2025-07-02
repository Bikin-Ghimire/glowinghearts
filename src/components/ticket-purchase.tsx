'use client'
import { useState } from 'react'

export interface TicketTier {
  id: number | string
  number_of_tickets: string  // e.g. "50"
  price: number              // e.g. 50
  description?: string
}

interface TicketPurchaseProps {
  /** Pass in your raffle.tickets array */
  tickets: TicketTier[]
}

export default function TicketPurchase({ tickets }: TicketPurchaseProps) {
  // initialize counts keyed by id
  const [counts, setCounts] = useState<Record<string, number>>(
    tickets.reduce((acc, t) => ({ ...acc, [t.id]: 0 }), {})
  )

  const increment = (id: string | number) =>
    setCounts(c => ({ ...c, [id]: c[id] + 1 }))
  const decrement = (id: string | number) =>
    setCounts(c => ({ ...c, [id]: Math.max((c[id] || 0) - 1, 0) }))

  // calculate total cost
  const total = tickets.reduce(
    (sum, t) => sum + (counts[t.id] || 0) * t.price,
    0
  )

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-900 text-center">Purchase Tickets</h2>

      {/* Ticket bundle rows */}
      {tickets.map((t) => (
        <div key={t.id} className="flex items-center justify-between">
          <span className="text-gray-800">
            {t.number_of_tickets} tickets for ${t.price}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => decrement(t.id)}
              className="px-2 py-1 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
            >
              −
            </button>
            <span className="w-6 text-center">{counts[t.id] || 0}</span>
            <button
              onClick={() => increment(t.id)}
              className="px-2 py-1 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>
      ))}

      {/* Total summary */}
      <div className="flex items-center justify-between">
        <span className="font-bold text-gray-900">Total:</span>
        <span className="font-bold text-gray-900">${total}</span>
      </div>

      {/* Purchase button */}
      <button
        disabled={total === 0}
        className="w-full py-2 rounded bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Purchase Tickets
      </button>
    </div>
  )
}