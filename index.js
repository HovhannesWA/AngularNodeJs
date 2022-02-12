require("dotenv").config();
const express = require("express");
const sequelize = require('./utils/database');
const app = express();
const body_parser = require("body-parser");
const path = require("path");
const port = process.env.port || 3000;
const routes = require("./routes/index");

// parse application/x-www-form-urlencoded
app.use(body_parser.urlencoded({ extended: false }));
// parse application/json
app.use(body_parser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", routes);

async function start(){
  await sequelize.sync();
  app.listen(port, (err) => {
    if (err) console.log(err);
    else{
      console.log('##############################');
      console.log(`Server is running on port ${port}`);
      console.log('##############################');
    }
  });
}

start();

