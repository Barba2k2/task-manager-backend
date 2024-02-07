const express = require("express");
const dotenv = require("dotenv");

const connectToDatabse = require("./src/databse/mongoose.database");

dotenv.config();

const app = express();

connectToDatabse();

app.get("/", (req, res) => {
  res.status(200).send("Hello, world!");
});

app.listen(8000, () => console.log("Listening on port 8000!"));
