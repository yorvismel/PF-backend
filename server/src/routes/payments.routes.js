const { Router } = require('express');
const { createCheckoutSessionHandler } = require('../handlers/payments.handler');

const stripeRouter = Router();

stripeRouter.post('/create-checkout-session', createCheckoutSessionHandler);

module.exports = stripeRouter;
