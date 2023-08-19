const {Router} = require('express');
const {createSession, paymentsSuccess, paymentsCancel } = require('../controllers/payments')


const payments = Router();

payments.post('/create-checkout-session', createSession);
// payments.get('/create-checkout-session', createSession);
payments.get('/payments/success', paymentsSuccess );
payments.get('/cancel-payments', paymentsCancel);



module.exports = payments