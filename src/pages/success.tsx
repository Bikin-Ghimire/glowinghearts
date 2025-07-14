// pages/success.tsx
import Head from 'next/head'
import { GradientBackground } from '@/components/gradient'
import TicketStub from '@/components/ticket-stub'

import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

const raf = {
  Guid: 'r50-001',
  name: 'Rob\'s Ribfest',
  amount_raised: 220295,
  start_date: '2025-06-01',
  end_date: '2025-07-04T01:00:00',
  draw_location: 'City Park, Springfield',
  imageSrc: 'https://i.ibb.co/ycznPrB5/ribfest.png',
  imageAlt: 'Sample of 30 icons with friendly and fun details in outline, filled, and brand color styles.',
  primary_color: '#301934',
  font_color: 'white'
}

const tickets = [
    {
        id: 'ticket-001'
    },
    {
        id: 'ticket-002'
    },
    {
        id: 'ticket-003'
    },
    {
        id: 'ticket-004'
    },
    {
        id: 'ticket-005'
    },
    {
        id: 'ticket-006'
    },
    {
        id: 'ticket-007'
    },
    {        id: 'ticket-008'
    },
    {        id: 'ticket-009'
    },
    {        id: 'ticket-010'
    },
    {        id: 'ticket-011'
    },
    {        id: 'ticket-012'
    },
    {        id: 'ticket-013'
    },
    {        id: 'ticket-014'
    },
    {        id: 'ticket-015'
    },
    {        id: 'ticket-016'
    },
    {        id: 'ticket-017'
    },
    {        id: 'ticket-018'
    },
    {        id: 'ticket-019'
    },
    {        id: 'ticket-020'
    },
    {        id: 'ticket-021'
    },
    {        id: 'ticket-022'
    },
    {        id: 'ticket-023'
    },
    {        id: 'ticket-024'
    },
    {        id: 'ticket-025'
    },
    {        id: 'ticket-026'
    },
    {        id: 'ticket-027'
    },
    {        id: 'ticket-028'
    },
    {        id: 'ticket-029'
    },
    {        id: 'ticket-030'
    },
    {        id: 'ticket-031'
    },
    {        id: 'ticket-032'
    },
    {        id: 'ticket-033'
    },
    {        id: 'ticket-034'
    },
    {        id: 'ticket-035'
    }
]

interface SuccessProps {
  session: Stripe.Checkout.Session & {
    line_items: Stripe.ApiList<Stripe.LineItem>
    customer_details: Stripe.Checkout.Session.CustomerDetails
  }
  raffle: {
    salesEndDate: string
    drawDate: string
    rafflePagePath: string
  }
}

const Success: NextPage<SuccessProps> = ({ session, raffle }) => {
  const {
    id: orderNumber,
    created,
    line_items,
    customer_details: customer,
    amount_total: totalAmount,
    currency,
  } = session

  const purchaseDate = new Date(created * 1000).toLocaleString('en-CA', {
    dateStyle: 'long',
    timeStyle: 'short',
  })

  return (
    <>
      <Head>
        <title>Success - Glowing Hearts Fundraising</title>
        <meta name="description" content="Your donation was successful. Thank you for your support!" />
      </Head>
      <main className="overflow-hidden">
        <GradientBackground />
        <div className="mt-10 max-w-4xl mx-auto p-6 space-y-8">
            {/* Banner */}
            <div className="lg:col-span-5 lg:row-end-1">
                <img
                    alt={raf.imageAlt}
                    src={raf.imageSrc}
                    className="aspect-4/2 w-full rounded-lg bg-gray-100 object-cover"
                />
            </div>

            {/* 1. Success message */}
            <h1 className="text-3xl font-bold text-green-600 text-center">
                🎉 Thank you for your purchase!
            </h1>
            <p className="text-center text-gray-700">
                Your order <span className="font-mono">{orderNumber}</span> was confirmed on{' '}
                <time dateTime={new Date(created * 1000).toISOString()}>{purchaseDate}</time>.
            </p>

            {/* 2. Order details */}
            <section className="bg-gray-50 p-4 rounded shadow-sm">
                <h2 className="text-xl font-semibold mb-2">Order Details</h2>

                {/* Items table */}
                <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                    <th className="border-b py-1">Item</th>
                    <th className="border-b py-1">Qty</th>
                    <th className="border-b py-1">Price</th>
                    <th className="border-b py-1">Line Total</th>
                    </tr>
                </thead>
                <tbody>
                    {line_items.data.map(item => {
                    const unit = (item.price?.unit_amount || 0) / 100
                    const qty = item.quantity || 0
                    return (
                        <tr key={item.id}>
                        <td className="py-1">{item.description}</td>
                        <td className="py-1">{qty}</td>
                        <td className="py-1">${unit.toFixed(2)}</td>
                        <td className="py-1">${(unit * qty).toFixed(2)}</td>
                        </tr>
                    )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                    <td colSpan={3} className="pt-2 font-bold text-right">Total:</td>
                    <td className="pt-2 font-bold">${((totalAmount || 0) / 100).toFixed(2)}</td>
                    </tr>
                </tfoot>
                </table>

                {/* Customer address */}
                <div className="mt-4">
                <h3 className="font-semibold">Billing Address</h3>
                <address className="not-italic">
                    {customer.name}<br />
                    {customer.address?.line1}<br />
                    {customer.address?.line2 && <>{customer.address.line2}<br/></>}
                    {customer.address?.city}, {customer.address?.postal_code}<br />
                    {customer.address?.country}<br />
                    <abbr title="Phone">P:</abbr> {customer.phone}
                </address>
                </div>
            </section>

            {/* 3. Tickets */}
            <section className="bg-gray-50 p-4 rounded shadow-sm">
                <h2 className="text-xl font-semibold mb-2">Your Tickets</h2>
                <dl className="mx-auto grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {tickets.map(ticket => (
                        <TicketStub key={ticket.id} ticketNumber={ticket.id} />
                    ))}
                </dl>
            </section>

            {/* 5. Back to raffle link */}
            <div className="text-center">
                <Link
                    href={raffle.rafflePagePath}
                    className="inline-block px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                    Back to Raffle Page
                    </Link>
            </div>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const sessionId = ctx.query.session_id as string

  // Fetch the session with line items & customer details
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'customer_details'],
  })
  
  // Pull in raffle dates however you store them (env, database, etc.)
  const raffle = {
    salesEndDate: process.env.RAFFLE_SALES_END || '2025-07-31',
    drawDate:     process.env.RAFFLE_DRAW_DATE   || '2025-08-15',
    rafflePagePath: '/raffle/robs-ribfest',
  }
// debugger
  return {
    props: {
      session,
      raffle,
    },
  }
}

export default Success