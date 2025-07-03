import { Fragment } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { Container } from '@/components/container'
import { GradientBackground } from '@/components/gradient'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { AnimatedNumber } from '@/components/animated-number'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
const CountdownTimer = dynamic(() => import('@/components/countdown-timer'), { ssr: false })
import TicketPurchase from '@/components/ticket-purchase'
import PrizesTable, { type Prize } from '@/components/prizes'
import { useRouter } from 'next/router'

export const metadata: Metadata = {
  title: "Rob's Ribfest",
  description:
    'Rob\'s Ribfest is a community event that brings together food lovers and local charities. Enjoy delicious ribs while supporting a good cause.',
}

const raffle = {
  Guid: 'r50-001',
  name: 'Rob\'s Ribfest',
  amount_raised: 220295,
  start_date: '2025-06-01',
  end_date: '2025-07-04T01:00:00',
  draw_location: 'City Park, Springfield',
  imageSrc: 'https://i.ibb.co/ycznPrB5/ribfest.png',
  imageAlt: 'Sample of 30 icons with friendly and fun details in outline, filled, and brand color styles.',
  primary_color: '#301934',
  font_color: 'white',
  tickets: [
    {
      id: 1,
      number_of_tickets: '50',
      price: 50,
      description: 'NA',
    },
    {
      id: 2,
      number_of_tickets: '20',
      price: 25,
      description: 'NA',
    },
    {
      id: 3,
      number_of_tickets: '5',
      price: 10,
      description: 'NA',
    },
  ],
  prizes: [
    {
      order: 1,
      title: 'Early Bird 1',
      description: 11000,
      date: '2025-06-25T01:00:00',
      winnerId: 'TKT-22341'
    },
    {
      order: 2,
      title: 'Early Bird 2',
      description: 11000,
      date: '2025-06-30T01:00:00',
      winnerId: 'TKT-34134'
    },
    {
      order: 3,
      title: 'Grand Prize',
      description: 100000,
      date: '2025-07-04T01:00:00',
      winnerId: ''
    }
  ]
}
const details = {
  href: '#',
  summary:
    'For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.',
  content: `
    <h4>Rob's Ribfest July 4th 50/50 Raffle</h4>

    <p>Support youth hockey and win big with the Rob's Ribfest July 4th 50/50 Raffle! All proceeds go directly to supporting the Rob's Ribfest program — helping young athletes grow, compete, and thrive on and off the ice.</p>

    <ul role="list">
    <li>Draw Date: July 4th</li>
    <li>Time: 8:00 PM</li>
    <li>Location: Raymond Ice Rink</li>
    </ul>
    <p>Tickets are just $10 each, and you can buy as many as you like. The more you buy, the bigger the jackpot! Half of the proceeds go to the winner, and the other half supports our local youth hockey programs.</p>
    <p>Let’s celebrate Canada Day by supporting local youth and building a stronger hockey community.</p>
    <p>Get your tickets today!</p>
  `,
}
const rules = `
  <h4>Rob\'s Ribfest 50/50 Raffle Rules</h4>
  <ol role="list" class="list-decimal pl-5">
    <li>Participants must be 18 years or older to enter.</li>
    <li>Tickets are non-refundable and cannot be exchanged.</li>
    <li>The draw will take place on July 4th at 8:00 PM.</li>
    <li>Winners will be notified via email and announced on our website.</li>
  </ol>
`;

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

function Raffle() {
  return (
    <div className="bg-white">
      <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col-reverse">
          <div className="mb-5">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{raffle.name}</h1>
          </div>
        </div>
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-4 xl:gap-x-16">
          {/* Product image */}
          <div className="lg:col-span-5 lg:row-end-1">
            <img
              alt={raffle.imageAlt}
              src={raffle.imageSrc}
              className="aspect-4/2 w-full rounded-lg bg-gray-100 object-cover"
            />
          </div>

          {/* Raffle details */}
          <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-2 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div className="text-center p-6 bg-[{raffle.primary_color}] rounded-2xl border-2 border-gray-300 text-[#{raffle.font_color}] max-w-xs mx-auto">
              {/* Big raised amount */}
              <p className="text-5xl font-extrabold tracking-tight sm:text-6xl animate-pulse [animation-duration:1s] text-[#b060ff]">
                $<AnimatedNumber end={raffle.amount_raised} decimals={0} />
              </p>

              {/* Smaller “Jackpot” label */}
              <p className="mt-2 text-2xl font-bold text-gray-600 sm:text-3xl">
                Jackpot
              </p>

              {/* Smaller “Winner” label */}
               <p className="mt-2 text-sm font-medium text-gray-600">
                Winner takes half
              </p>
            </div>

            {/* Ticket Sales End Time */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <div className="text-center max-w-xs mx-auto">
                <p className="text-xl tracking-tight text-gray-900 sm:text-2xl">
                  Ticket Sales Ends In
                </p>

                {/* Smaller “Jackpot” label */}
                <p className="mt-2 text-2xl font-bold sm:text-3xl">
                  <CountdownTimer endDate={raffle.end_date} />
                </p>
              </div>
            </div>

            {/* Ticket Purchase */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <TicketPurchase tickets={raffle.tickets} raffleID={raffle.Guid} />
            </div>
          </div>

          <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-5 lg:mt-0 lg:max-w-none">
            {/* Raffle Details */}
            <dl className="mx-auto grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 bg-gray-900/5 px-4 py-2 sm:px-6 xl:px-8 rounded-xl">
                <dt className="text-sm font-medium text-gray-500">Licence #</dt>
                <dd className="w-full flex-none text-xl font-medium tracking-tight text-gray-900">736570</dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 bg-gray-900/5 px-4 py-2 sm:px-6 xl:px-8 rounded-xl">
                <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                <dd className="w-full flex-none text-xl font-medium tracking-tight text-gray-900">{raffle.start_date}</dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 bg-gray-900/5 px-4 py-2 sm:px-6 xl:px-8 rounded-xl">
                <dt className="text-sm font-medium text-gray-500">Draw Date</dt>
                <dd className="w-full flex-none text-xl font-medium tracking-tight text-gray-900">{raffle.end_date}</dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 bg-gray-900/5 px-4 py-2 sm:px-6 xl:px-8 rounded-xl">
                <dt className="text-sm font-medium text-gray-500">Draw Location</dt>
                <dd className="w-full flex-none text-xl font-medium tracking-tight text-gray-900">{raffle.draw_location}</dd>
              </div>
            </dl>

            {/* Share */}
            <div className="border-gray-200 mb-10">
              <h3 className="text-sm font-medium text-gray-900">Share</h3>
              <ul role="list" className="mt-4 flex items-center space-x-6">
                <li>
                  <a href="#" className="flex size-6 items-center justify-center text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Share on Facebook</span>
                    <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-5">
                      <path
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex size-6 items-center justify-center text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Share on Instagram</span>
                    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="size-6">
                      <path
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex size-6 items-center justify-center text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Share on X</span>
                    <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-5">
                      <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>


            <TabGroup>
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8">
                  <Tab className="border-b-2 border-transparent py-6 text-sm font-medium whitespace-nowrap text-gray-700 hover:border-gray-300 hover:text-gray-800 data-selected:border-indigo-600 data-selected:text-indigo-600">
                    Details
                  </Tab>
                  <Tab className="border-b-2 border-transparent py-6 text-sm font-medium whitespace-nowrap text-gray-700 hover:border-gray-300 hover:text-gray-800 data-selected:border-indigo-600 data-selected:text-indigo-600">
                    Rules
                  </Tab>
                  <Tab className="border-b-2 border-transparent py-6 text-sm font-medium whitespace-nowrap text-gray-700 hover:border-gray-300 hover:text-gray-800 data-selected:border-indigo-600 data-selected:text-indigo-600">
                    Prizes
                  </Tab>
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                <TabPanel className="pt-10">
                  <h3 className="sr-only">Details</h3>

                  <div
                    dangerouslySetInnerHTML={{ __html: details.content }}
                    className="text-sm text-gray-500 [&_h4]:mt-5 [&_h4]:font-medium [&_h4]:text-gray-900 [&_li]:pl-2 [&_li::marker]:text-gray-300 [&_p]:my-2 [&_p]:text-sm/6 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:text-sm/6 [&>:first-child]:mt-0"
                  />
                </TabPanel>

                <TabPanel className="pt-10">
                  <h3 className="sr-only">Rules</h3>

                  <div
                    dangerouslySetInnerHTML={{ __html: rules }}
                    className="text-sm text-gray-500 [&_h4]:mt-5 [&_h4]:font-medium [&_h4]:text-gray-900 [&_li]:pl-2 [&_li::marker]:text-gray-300 [&_p]:my-2 [&_p]:text-sm/6 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:text-sm/6 [&>:first-child]:mt-0"
                  />
                </TabPanel>

                <TabPanel className="text-sm text-gray-500">
                  <h3 className="sr-only">Prizes</h3>

                  <PrizesTable prizes={raffle.prizes} />
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
        </div>
      </div>
    </div>
  )
}


export default function Raffles() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <Raffle />
      <Footer />
    </main>
  )
}