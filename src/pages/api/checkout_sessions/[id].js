import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51MbOhQEPYl4oiRUL7AGeaSZOxZAyg9tBvVG2dDntTeM8etjz4NXHrm9lu7icpj0Fi96MXvk62pS8aybPVY41G7ou00cSRZO8sC");

export default async function handler(req, res) {
  const id = req.query.id;

  try {
    if (!id.startsWith('cs_')) {
      throw Error('Incorrect CheckoutSession ID.');
    }
    const checkout_session = await stripe.checkout.sessions.retrieve(id);

    res.status(200).json(checkout_session);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
