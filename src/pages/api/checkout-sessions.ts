'use server'
// pages/api/checkout-sessions.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  try {
    // Expect tickets with quantity
    const { tickets } = req.body as {
      tickets: { Int_NumbTicket: string; Dec_Price: number; quantity: number }[]
    }

    if (!tickets?.length) {
      return res.status(400).json({ error: 'No tickets selected' })
    }

    // Build Stripe line items
    const line_items = tickets.map((t) => ({
      price_data: {
        currency: 'cad',
        product_data: { name: `${t.Int_NumbTicket}-ticket pack` },
        unit_amount: t.Dec_Price * 100,
      },
      quantity: t.quantity,
    }))

    // Create the Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/raffle/robs-ribfest`,
    })

    console.log('✅ [checkout] Session created:', session.id)
    return res.status(200).json({ sessionId: session.id })
  } catch (err) {
    console.error('❌ [checkout] Error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}