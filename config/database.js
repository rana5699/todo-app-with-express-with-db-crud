const mongoose = require("mongoose");
require("dotenv").config();

const dataBaseUrl = process.env.DATABASE_STRING;

mongoose
  .connect(dataBaseUrl)
  .then(() => {
    console.log("Database connection sucssesfully");
  })
  .catch((err) => console.log(err.message));
