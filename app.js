const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/mongoose-connection");
const ownersrouter = require("./routes/ownersrouter");
const usersrouter = require("./routes/usersrouter");
const productsrouter = require("./routes/productsrouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static (path.join(__dirname, "public")));
app.set("view engine", "ejs");


app.use("/owners",ownersrouter);
app.use("/users",usersrouter);
app.use("/products",productsrouter);
app.listen(3000);