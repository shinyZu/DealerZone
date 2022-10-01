require("dotenv").config();
const express = require("express");
const app = express(); // to start a new Express application
app.use(express.json());

const { connection } = require("./db.configs/db");
connection.establishConnection; // invoke the method to establish connection with mongoDB

const baseURL = "/dealer_zone/api/v1/";

const user = require("./routes/user");
app.use(`${baseURL}user`, user);

app.get("/", (req, res) => {
  console.log(req);
  res.send("<h1>Hello Dealer!!!</h1>");
});

app.listen(process.env.PORT, (req, res) => {
  console.log(`express app listening on Port ${process.env.PORT}`);
});
