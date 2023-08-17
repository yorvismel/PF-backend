const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Stripe = require("stripe");
require("dotenv").config();
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.json());

const stripe = new Stripe(
  "sk_test_51Ndg6vIUVtBugw8y4IsIMM0HNb4xxJHayQqcaZggnA80Tm1Izo1qzw44lDJRduCoNuRMbpnKUHewPMLkjznq5zes00jGdky9a9"
); 

app.post("/payments/create-checkout-session", async (req, res) => {
  try {
    const cartItems = req.body.cartItems;

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.image],
          metadata: {
            product_id: item.id,
          },
        },
        unit_amount: Math.round(item.price * item.quantity * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "/payments/success", 
      cancel_url: "/payments/cancel", 
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend funcionando en el puerto ${PORT}`);
});
