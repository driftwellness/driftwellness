import { Router } from 'express';
import Stripe from 'stripe';

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { items, customerInfo } = req.body;

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'nok',
        product_data: {
          name: item.name,
          images: item.imageUrl ? [`${req.protocol}://${req.get('host')}${item.imageUrl}`] : [],
        },
        unit_amount: item.price, // Price in øre
      },
      quantity: item.quantity,
    }));

    // Add shipping as a line item
    lineItems.push({
      price_data: {
        currency: 'nok',
        product_data: {
          name: 'Shipping',
        },
        unit_amount: 9900, // 99 NOK in øre
      },
      quantity: 1,
    });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.protocol}://${req.get('host')}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.protocol}://${req.get('host')}/checkout`,
      customer_email: customerInfo.email,
      metadata: {
        customerName: customerInfo.name,
        address: customerInfo.address,
        city: customerInfo.city,
        postalCode: customerInfo.postalCode,
        country: customerInfo.country,
      },
      shipping_address_collection: {
        allowed_countries: ['NO', 'SE', 'DK', 'FI', 'IS'],
      },
    });

    res.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/checkout-session/:sessionId', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    res.json(session);
  } catch (error: any) {
    console.error('Session retrieval error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
