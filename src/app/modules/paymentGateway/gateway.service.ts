import Stripe from 'stripe';
import config from '../../config';

const stripe = new Stripe(config.stipe_private_key as string);

const createGateway = async (price: number) => {
  const amount = Math.round(price * 100);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    payment_method_types: ['card'],
  });

  return paymentIntent.client_secret;
};

export const gatewayService = {
  createGateway,
};
