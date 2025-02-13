const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const productmodel = require("../models/productmodel");


router.post("/create",upload.single("image"),async (req, res)=>{
    try {
        const { name, price, bgcolor, panelcolor, textcolor } = req.body;
        const imagePath = req.file.filename;
        console.log(imagePath)
        let createdProduct = await productmodel.create({
            name,
            price,
            bgcolor,
            panelcolor,
            textcolor,
            image: imagePath
        });

        res.redirect("/shop");
    } catch (err) {
        // console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports=router;