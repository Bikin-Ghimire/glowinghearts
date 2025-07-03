import { AnimatedNumber } from '@/components/animated-number'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import type { Metadata } from 'next'
import {testRaffles} from '@/data/raffles'
import RaffleList, { type Raffle } from '@/components/raffle-list'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Raffles',
  description:
    'Directory of all 50/50 raffles managed by glowing hearts fundraising.',
}

const activeRaffles = testRaffles
  .filter(r => new Date(r.obj_RaffleData.Dt_SalesClose) > new Date() && r.obj_RaffleData.Int_DrawStatus === 2)
  .sort((a, b) => new Date(a.obj_RaffleData.Dt_SalesClose).getTime() - new Date(b.obj_RaffleData.Dt_SalesClose).getTime())

// const raffles: Raffle[] = [
//   {
//     id: 1,
//     name: "Rob's Ribfest",
//     imageSrc: 'https://i.ibb.co/ycznPrB5/ribfest.png',
//     imageAlt: "Rob's Ribfest event",
//     end_date: '2025-07-04T01:00:00',
//     amount_raised: 220295,
//   },
//   {
//     id: 2,
//     name: "The Foundation's 50/50 Raffle",
//     imageSrc: 'https://fondation.canadiens.com/app/uploads/2023/09/1920x1080-rouge-en-1024x576.png',
//     imageAlt: "The Foundation's 50/50 Raffle",
//     end_date: '2025-07-09T01:00:00',
//     amount_raised: 10295,
//   },
//   {
//     id: 3,
//     name: "50/50 Raffle | Fall Fundraiser | Etobicoke Human Society",
//     imageSrc: 'https://etobicokehumanesociety.com/wp-content/uploads/2023/10/5050Graphic-Blog-jpg.webp',
//     imageAlt: "50/50 Raffle | Fall Fundraiser | Etobicoke Human Society",
//     end_date: '2025-07-01T01:00:00',
//     amount_raised: 20295,
//   },
//   {
//     id: 4,
//     name: "RBC JCC Sports Dinner Cadillac and 50/50 Raffle",
//     imageSrc: 'https://homelottery.ca/wp-content/uploads/2025/01/Sports-Dinner-raffles-home-lottery-graphic.png',
//     imageAlt: "RBC JCC Sports Dinner Cadillac and 50/50 Raffle",
//     end_date: '2025-08-04T01:00:00',
//     amount_raised: 220125,
//   },
//   {
//     id: 5,
//     name: "50/50 Rogers Place",
//     imageSrc: 'https://images.rogersplace.com/wp-content/uploads/2024/07/08093636/RP5050_2425_GENERIC_1920X1080_opt-1024x576.jpg',
//     imageAlt: "50/50 Rogers Place",
//     end_date: '2025-07-07T01:00:00',
//     amount_raised: 110295,
//   },
//   {
//     id: 6,
//     name: "2024 Move to Cure ALS 50/50 Raffle",
//     imageSrc: 'https://www.alsbc.ca/wp-content/uploads/2024/01/2024-50-50-Raffle-Header-Image.png',
//     imageAlt: "2024 Move to Cure ALS 50/50 Raffle",
//     end_date: '2025-06-04T01:00:00',
//     amount_raised: 1220295,
//   },
// ]

interface PageProps {
  searchParams: { page?: string }
}

export default function RafflesPage({ searchParams }: PageProps) {
  // 1) determine current page from ?page=
  const currentPage = Math.max(1, parseInt(searchParams.page || '1', 10))

  // 4) paginate
  const perPage = 3
  const totalPages = Math.ceil(activeRaffles.length / perPage)
  const paginated = activeRaffles.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  )

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>

      {/* pass only the 3 you want this page */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Ongoing Raffles
            </h2>
            <p className="mt-4 text-xl/8 text-gray-600">Support a cause. Win big.</p>
          </div>
          <RaffleList raffles={paginated} />
        </div>
      </section>

      {/* pagination */}
      <nav className="flex items-center justify-between border-t border-gray-200 px-6 lg:px-8 mx-auto max-w-7xl mb-10">
        <div className="flex-1">
          {currentPage > 1 && (
            <Link
              href={`/raffles?page=${currentPage - 1}`}
              className="inline-flex items-center pt-4 pr-1 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" />
              Previous
            </Link>
          )}
        </div>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i}
              href={`/raffles?page=${i + 1}`}
              aria-current={i + 1 === currentPage ? 'page' : undefined}
              className={
                i + 1 === currentPage
                  ? 'border-indigo-500 text-indigo-600 inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium'
              }
            >
              {i + 1}
            </Link>
          ))}
        </div>
        <div className="flex-1 text-right">
          {currentPage < totalPages && (
            <Link
              href={`/raffles?page=${currentPage + 1}`}
              className="inline-flex items-center pt-4 pl-1 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Next
              <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" />
            </Link>
          )}
        </div>
      </nav>

      <Footer />
    </main>
  )
}