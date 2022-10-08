require("dotenv").config();
const express = require("express");
const cors = require("cors"); // to handle CORS issue
const app = express(); // to start a new Express application
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // create application/json parser
app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   next();
// });

const { connection } = require("./db.configs/db");
connection.establishConnection; // invoke the method to establish connection with mongoDB

const baseURL = "/dealer_zone/api/v1/";

const login = require("./routes/login");
const user = require("./routes/user");
const car = require("./routes/car");

app.use(`${baseURL}login`, login);
app.use(`${baseURL}user`, user);
app.use(`${baseURL}car`, car);

app.get("/", (req, res) => {
  // console.log(req);
  res.send("<h1>Hello Dealerrrrrrrrrrrr!!!</h1>");
});

app.post("/test", (req, res) => {
  console.log("Req Recieved...............");
  res.send("<h1>Req Recieved</h1>");
});

app.listen(process.env.PORT, (req, res) => {
  console.log(`express app listening on Port ${process.env.PORT}`);
});
