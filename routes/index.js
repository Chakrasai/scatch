const express = require("express");
const router = express.Router();
const isloggin = require("../middlewares/isloggin");
const productmodel = require("../models/productmodel");
const { fetchProducts } = require("../service/productapi");
const usermodel = require("../models/usermodel");

router.get("/", async (req, res) => {
    let error = req.flash("error");
    res.render('index', { error, isloggin:false });
});

router.get("/shop", isloggin, async (req, res) => {
    try {
        let products = await productmodel.find();
        res.render("shop", { products: products });
    } catch (err) {
        console.error("Error fetching products:", err);
        req.flash("error", "Internal Server Error");
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
router.get("/addtocart/:id", isloggin, async (req, res) => {
    let product = await productmodel.findbyid(req.params.id);
    let user = await usermodel.findOne({ email: req.user.email });
    
})



module.exports = router;