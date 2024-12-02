const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const productmodel = require("./models/productmodel");
const db = require("./config/mongoose-connection");
const ownersrouter = require("./routes/ownersrouter");
const usersrouter = require("./routes/usersrouter");
const productsrouter = require("./routes/productsrouter");
const indexRouter = require("./routes/index");
const expressSession = require("express-session");
const flash = require("connect-flash");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

app.use(
    expressSession({
        secret: process.env.SESSION_SECRET || "scatch",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(flash());

// let products = productmodel.find();
// console.log(products);

app.use("/", indexRouter);
app.use("/owners", ownersrouter);
app.use("/users", usersrouter); 
app.use("/products", productsrouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});