// import { format } from 'date-fns'
// import React from 'react'
// import Link from 'next/link'
// import { slugify } from '@/utils/slugify'
// import type { RaffleResponse } from '@/data/raffles'
// import useBannerREST from '@/app/hooks/useBannerRest'

// interface RaffleListProps {
//   raffles: RaffleResponse[]
// }

// /**
//  * A responsive grid of raffle cards.
//  */
// export const RaffleList = ({ raffles }) => {
//     const rafflesData = Array.isArray(raffles) ? raffles : [raffles]
//   // console.log(rafflesData);

//   return (
//     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//       {rafflesData.map((raffle) => {
//         const { charityData, isLoading, isBannerError } = useBannerREST(raffle?.Guid_CharityId)
//         return(
//         <div
//           key={raffle?.Guid_DrawId}
//           className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
//         >
//           <img
//             src={charityData[0]?.obj_Banner[0]?.VC_BannerLocation}
//             alt={''}
//             className="aspect-4/2 w-full bg-gray-200 object-cover group-hover:opacity-75 sm:aspect-4/2"
//           />
//           <div className="flex flex-1 flex-col space-y-2 p-4">
//             <h3 className="text-2xl font-medium text-gray-900">
//               {/* <Link href={`/raffles/${raffle?.Guid_DrawId? slugify(raffle?.Guid_DrawId) : ''}`}>
//                */}
//               <Link href={`/raffles/${raffle?.Guid_DrawId}`}>
//                 <span aria-hidden="true" className="absolute inset-0" />
//                 {raffle?.VC_RaffleName}
//               </Link>
//             </h3>
//             <p className="text-3xl font-bold">${Number(raffle?.Dec_MoneyRaised)} raised</p>
//             <div className="flex flex-1 flex-col justify-end">
//               <p className="text-md text-gray-500 italic">Sales End Date: {raffle?.Dt_SalesClose? format(new Date(raffle?.Dt_SalesClose), 'dd MMM'): ''}</p>
//             </div>
//           </div>
//         </div>
//       )})}
//     </div>
//   )
// }

// export default RaffleList

// /*
// Usage example in a page (e.g. pages/index.tsx):

// import React from 'react'
// import ProductList, { Product } from '@/components/ProductList'

// const products: Product[] = [
//   {
//     id: 1,
//     name: 'Basic Tee 8-Pack',
//     href: '#',
//     price: '$256',
//     description: 'Get the full lineup of our Basic Tees...',
//     options: '8 colors',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-01.jpg',
//     imageAlt: 'Eight shirts arranged on table...'
//   },
//   // more products...
// ]

// export default function HomePage() {
//   return (
//     <main>
//       <ProductList products={products} />
//     </main>
//   )
// }
// */

//new code
import React from 'react'
import type { RaffleResponse } from '@/data/raffles'
import { RaffleCard } from './raffle-card'

interface RaffleListProps {
  raffles: RaffleResponse[]
}

export const RaffleList = ({ raffles }: RaffleListProps) => {
  const rafflesData = Array.isArray(raffles) ? raffles : [raffles]

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {rafflesData.map((raffle) => (
        <RaffleCard key={raffle[0]?.Guid_DrawId} raffle={raffle} />
      ))}
    </div>
  )
}

export default RaffleList
