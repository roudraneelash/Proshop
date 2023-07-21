const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const port = process.env.PORT;
const db = require("./config/db");

const app = express();
//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser middleware
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.end("Api running...");
});

app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log("server is up and running on port", port);
});
