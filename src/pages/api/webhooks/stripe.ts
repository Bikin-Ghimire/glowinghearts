// // pages/api/webhook/stripe.ts
// import Stripe from 'stripe'
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2025-06-30.basil',
// })
// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const sig = req.headers['stripe-signature'];
//     let event;
//     try {
//       event = stripe.webhooks.constructEvent(req.body, sig, `${endpointSecret}`);
//     } catch (err) {
//       console.error('Error verifying webhook signature:', err);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }


    
//     // Handle the event
//     switch (event.type) {
//       case 'checkout.session.completed':
//         // Handle successful payment
//         const session = event.data.object as Stripe.Checkout.Session;

//       const payload = {
//         Guid_RaffleId: session.metadata?.raffleID,
//         Guid_PurchaseId: crypto.randomUUID(),
//         Dt_Purchased: new Date(session.created * 1000).toISOString().replace('T', ' ').slice(0, 19),
//         Dec_PurchaseAmount: (session.amount_total || 0) / 100,
//         VC_PlayerEmail: session.customer_details?.email ?? '',
//         VC_PlayerFullName: session.customer_details?.name,
//         VC_PlayerAddr1: session.customer_details?.address?.line1 ?? '',
//         VC_PlayerAddr2: session.customer_details?.address?.line2 ?? '',
//         VC_PlayerCity: session.customer_details?.address?.city ?? '',
//         VC_PlayerProvince: session.customer_details?.address?.state ?? '',
//         VC_PlayerPostalCode: session.customer_details?.address?.postal_code ?? '',
//         VC_PlayerPhone: session.customer_details?.phone,
//         obj_BuyIns: JSON.parse(session.metadata?.obj_BuyIns || '[]'),
//         isAgeConfirmed: session.metadata?.isAgeConfirmed,
//         isTCConfirmed: session.metadata?.isTCConfirmed,
//       }
        
//         break;
//       case 'invoice.payment_succeeded':
//         // Handle successful subscription payment
//         break;
//       // Add more cases for other event types you want to handle
//       default:
//         console.log(`Unhandled event type: ${event.type}`);
//     }
//     res.status(200).json({ received: true });
//   } else {
//     res.setHeader('Allow', 'POST');
//     res.status(405).end('Method Not Allowed');
//   }
// }
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };


// pages/api/webhook/stripe.ts
import Stripe from 'stripe';
import fetch from 'node-fetch';
import crypto from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const SERVICE_URL = process.env.SERVICE_URL!;

async function postToBackend(url: string, payload: any, retries = 100, delayMs = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) return true;
      throw new Error(`Backend returned ${res.status}`);
    } catch (err) {
      console.error(`Post attempt ${i + 1} failed:`, err);
      if (i < retries - 1) {
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
  }
  return false;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const sig = req.headers['stripe-signature'];

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret!);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const payload = {
        Guid_RaffleId: session.metadata?.raffleID,
        Guid_PurchaseId: crypto.randomUUID(),
        Dt_Purchased: new Date(session.created * 1000).toISOString().replace('T', ' ').slice(0, 19),
        Dec_PurchaseAmount: (session.amount_total || 0) / 100,
        VC_PlayerEmail: session.customer_details?.email ?? '',
        VC_PlayerFullName: session.customer_details?.name,
        VC_PlayerAddr1: session.customer_details?.address?.line1 ?? '',
        VC_PlayerAddr2: session.customer_details?.address?.line2 ?? '',
        VC_PlayerCity: session.customer_details?.address?.city ?? '',
        VC_PlayerProvince: session.customer_details?.address?.state ?? '',
        VC_PlayerPostalCode: session.customer_details?.address?.postal_code ?? '',
        VC_PlayerPhone: session.customer_details?.phone,
        obj_BuyIns: JSON.parse(session.metadata?.obj_BuyIns || '[]'),
        isAgeConfirmed: session.metadata?.isAgeConfirmed,
        isTCConfirmed: session.metadata?.isTCConfirmed,
      };

      const success = await postToBackend(`${SERVICE_URL}/Sale/${payload.Guid_RaffleId}`, payload);
      console.log(payload)
      if (!success) {
        console.error('❌ Could not post purchase to backend after retries. Logging for later retry.');
        // Store to DB/file for later processing
      }
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
