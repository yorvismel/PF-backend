const { Router } = require('express');
const {createOrder, successOrder, webhook, failure, pending, } = require('../controllers/payments');

const paymenrouter = Router();

paymenrouter.post('/create-order', createOrder);

paymenrouter.get('/success', successOrder);
paymenrouter.get('/failure', failure );
paymenrouter.get('/pending', pending );

  paymenrouter.post('/webhook', webhook);

module.exports = paymenrouter;

