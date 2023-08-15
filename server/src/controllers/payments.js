const {STRIPE_SECRET} = process.env
const Stripe = require('stripe');
const stripe = new Stripe(STRIPE_SECRET);

const createSession = async (req, res) => {
  try {
    const cartItems = req.body.cartItems;
    console.log("Received cart items:", cartItems); 

    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          images:[ item.image], 
          metadata: {
            product_id: item.id, 
            
          },
        },
        unit_amount: Math.round( item.price * item.quantity * 100,) 
      },
      quantity: item.quantity,
    }));
    

    console.log("Constructed line items:", lineItems); 

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/payments/success',
      cancel_url: 'http://localhost:3001/payments/cancel',
    });
    console.log("Session ID:", session.id);

    res.status(200).json({ sessionId: session.id });
    
  } catch (error) {
    console.error("Error:", error); // Agregamos un log para mostrar el error específico
    res.status(500).json({ error: error.message });
  }
};

const paymentsSuccess = (req, res) => {
  res.redirect('http://localhost:5173/payments/success');
};
const paymentsCancel = (req, res) => res.send('Cancel');

module.exports = { createSession, paymentsSuccess, paymentsCancel };
