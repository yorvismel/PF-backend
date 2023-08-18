const { createCheckoutSession } = require('../controllers/payments');

const createCheckoutSessionHandler = async (req, res) => {
  try {
    const sessionId = await createCheckoutSession();
    res.status(200).json({ sessionId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCheckoutSessionHandler,
};
