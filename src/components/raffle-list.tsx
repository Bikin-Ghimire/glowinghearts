import { format } from 'date-fns'
import React from 'react'
import Link from 'next/link'
import { slugify } from '@/utils/slugify'
import type { RaffleResponse } from '@/data/raffles'

interface RaffleListProps {
  raffles: RaffleResponse[]
}

/**
 * A responsive grid of raffle cards.
 */
export const RaffleList: React.FC<RaffleListProps> = ({ raffles }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {raffles.map((raffle) => (
        <div
          key={raffle.obj_RaffleData.Guid_DrawId}
          className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
        >
          <img
            src={raffle.obj_RaffleData.bannerSrc}
            alt={raffle.obj_RaffleData.bannerAlt}
            className="aspect-4/2 w-full bg-gray-200 object-cover group-hover:opacity-75 sm:aspect-4/2"
          />
          <div className="flex flex-1 flex-col space-y-2 p-4">
            <h3 className="text-2xl font-medium text-gray-900">
              <Link href={`/raffles/${slugify(raffle.obj_RaffleData.VC_CharityDesc)}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {raffle.obj_RaffleData.VC_CharityDesc}
              </Link>
            </h3>
            <p className="text-3xl font-bold">${Number(raffle.obj_RaffleData.Dec_MoneyRaised).toLocaleString('en-CA')} raised</p>
            <div className="flex flex-1 flex-col justify-end">
              <p className="text-md text-gray-500 italic">Sales End Date: {format(new Date(raffle.obj_RaffleData.Dt_SalesClose), 'dd MMM')}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RaffleList

/*
Usage example in a page (e.g. pages/index.tsx):

import React from 'react'
import ProductList, { Product } from '@/components/ProductList'

const products: Product[] = [
  {
    id: 1,
    name: 'Basic Tee 8-Pack',
    href: '#',
    price: '$256',
    description: 'Get the full lineup of our Basic Tees...',
    options: '8 colors',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-01.jpg',
    imageAlt: 'Eight shirts arranged on table...'
  },
  // more products...
]

export default function HomePage() {
  return (
    <main>
      <ProductList products={products} />
    </main>
  )
}
*/