require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_RENDER, DB_PORT } = process.env;




//Con este trabajan desde su maquina
//   console.log(DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT );
//   const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
//    host: DB_HOST,
//    port: DB_PORT,
//    dialect: 'postgres',
//  });


  //Con esta cuando ya este deployada
  const sequelize = new Sequelize(DB_RENDER, {
    logging: false,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false 
      }
    }
  });
 
  
  
  
  
  


const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

//los models

const {
    Category,
    Product
  } = sequelize.models;


  //Relaciones

  Product.belongsToMany(Category, { through: 'ProductCategory', timestamps : false });
  Category.belongsToMany(Product, { through: 'ProductCategory', timestamps : false });


 module.exports = {
    ...sequelize.models,
    conn: sequelize,
  };