const express = require("express");
const router = express.Router(); //Router

//? Importing controllers
const { signup, login } = require("../controllers/auth.js");

//? Routes
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
