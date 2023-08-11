 const axios = require("axios");
 const server = require("./server/src/server");
 const { conn } = require("./server/src/db");
 const PORT = 3001;

 conn
   .sync({ force: false })
   .then(() => {
     server.listen(PORT, () => {
       console.log(`Backend Funcionando (por ahora y por siempre)`);
     });
   })
   .catch((error) => console.error(error));
