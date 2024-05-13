const express = require("express");
const app = express();
const cors = require("cors");

//? Importing routers
const authRoutes = require("./routes/auth.js");

//? Middlewares
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded());

//? Routes
// app.get("/", (req, res) => {
// 	res.send("Hello world");
// });
app.use("/auth", authRoutes);

module.exports = app;
