const express = require("express");
const router = express.Router();
const isloggin = require("../middlewares/isloggin");
const productmodel = require("../models/productmodel");
const { fetchProducts } = require("../service/productapi");
const usermodel = require("../models/usermodel");

router.get("/", async (req, res) => {
    // let error = req.flash("error");
    res.render('index', { error, isloggin:false });
});

router.get("/shop", isloggin, async (req, res) => {
    try {
        let products = await productmodel.find();
        res.render("shop", { products: products });
    } catch (err) {
        // console.error("Error fetching products:", err);
        // req.flash("error", "Internal Server Error");
        res.redirect("/");
    }
});
// router.get("/shop", isloggin, async (req, res) => {
//     try {
//         let products = await fetchProducts(); // Fetch products from the external API
//         res.render("shop", { messages: req.flash(), products: products });
//     } catch (err) {
//         console.error("Error fetching products:", err);
//         req.flash("error", "Internal Server Error");
//         res.redirect("/");
//     }
// });



router.get("/cart", isloggin, async (req, res) => {
    let user = await usermodel.findOne({ email: req.user.email }).populate("cart");
    // console.log(user.cart)
    res.render("cart", { user });
});

router.get("/addtocart/:productid", isloggin, async (req, res) => {
    let user = await usermodel.findOne({ email: req.user.email });
    // console.log(user)
    if (user.cart.includes(req.params.productid)) {
        // req.flash("info", "Product already in cart");
        return res.redirect("/shop");
    }
    user.cart.push(req.params.productid);
    await user.save();
    res.redirect("/shop");
})



module.exports = router;