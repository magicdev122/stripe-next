import Stripe from 'stripe';
import { buffer } from 'micro';

const stripe = new Stripe("sk_test_51MbOhQEPYl4oiRUL7AGeaSZOxZAyg9tBvVG2dDntTeM8etjz4NXHrm9lu7icpj0Fi96MXvk62pS8aybPVY41G7ou00cSRZO8sC");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let event;

    try {
      // 1. Retrieve the event by verifying the signature using the raw body and secret
      const rawBody = await buffer(req);
      const signature = req.headers['stripe-signature'];

      event = stripe.webhooks.constructEvent(
        rawBody.toString(),
        signature,
        "whsec_seDcfZI5UacRUZgbfykODJkfCh6GRaWV"
      );
    } catch (err) {
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Successfully constructed event
    console.log('✅ Success:', event.id);

    // 2. Handle event type (add business logic here)
    if (event.type === 'checkout.session.completed') {
      console.log(`💰  Payment received!`);
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // 3. Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}