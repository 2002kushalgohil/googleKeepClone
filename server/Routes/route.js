const express = require("express");
const route = express.Router();
const middleware = require("../middleware/middleware");
const { register, login, create, read, find, update, deleteData, logout} = require("../Controllers/controller");

route.post("/signup", register);

route.post("/signin", login);

route.get("/logout", middleware, logout);

route.post("/create", middleware, create);

route.get("/read", middleware, read);

route.post("/find/:id", middleware, find);

route.post("/update/:id", middleware, update);

route.post("/delete/:id", middleware, deleteData);


module.exports = route;
