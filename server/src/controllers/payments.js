const mercadopago = require('mercadopago')

const createOrder = async (req, res) => {
  console.log("Log de req body del back",req.body);
  const  payload  = req.body;
  mercadopago.configure({
    access_token: 'TEST-1787823041968797-081915-b3e4e0682dd673b9a11112bae533e39d-1454756743'
  });
console.log("El payload del back", payload);
  const itemsForPayment = payload.items.map(item => ({
    title: item.title,
    image: item.image,
    unit_price: item.unit_price,
    currency_id: 'USD', // Ajusta la moneda según tu caso
    quantity: item.quantity,
  }));
    
  const result = await mercadopago.preferences.create({
    items: itemsForPayment,
    

    // items: [
    //   {
    //     title:'Laptops',
    //     unit_price: 500000,
    //     currency_id: "COP",
    //     quantity: 1,

    //   }
    // ],
    back_urls: {
      success:"http://localhost:3001/success",
      failure:"http://localhost:3001/failure",
      pending:"http://localhost:3001/pending"

    },

      notification_url: "https://78fd-190-90-86-104.ngrok.io/webhook",   
  })
  console.log("Items for payments", itemsForPayment);
  console.log(result);
  res.send(result.body);
}

const successOrder = (req, res) => {
  res.send('Hola Mundo desde la ruta success');
}

const webhook = async (req, res) => {
  const payment = req.query

  try {
  if (payment.type === "payment") {
   const data = await mercadopago.payment.findById(payment["data.id"])
   console.log(data)
  }
  res.send('Hola Mundo desde la ruta webhook');
} catch (error) {
  console.log(error);
  return res.sendStatus(500).json({error: error.message});
}
}
const failure = (req, res) => {

  console.log(req.query);
  res.send('Hola Mundo desde la ruta failure');
}

const pending = (req, res) => {
  res.send('Hola Mundo desde la ruta pending');
}




module.exports = {createOrder, successOrder, webhook, failure, pending}