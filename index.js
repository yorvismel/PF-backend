const axios = require("axios");
const server = require("./server/src/server");
const { conn } = require("./server/src/db");


const PORT = require('./server/src/config')

conn
  .sync({ force: false })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Backend Funcionando (por ahora) ${ PORT}`);
    });
  })
  .catch((error) => console.error(error));
