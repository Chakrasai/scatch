const express = require("express");
const router = express.Router();
const ownermodel = require("../models/ownermodel");
const { route } = require(".");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateToken} = require('../utils/generatetoken');
const isloggin = require("../middlewares/isloggin");


router.get("/loginsign",(req, res)=>{
    res.render("ownerlogin");
});
router.get("/register",(req, res)=>{
    res.render("ownerregister");
});
router.post("/register", async function (req, res) {
    let { email, password,} = req.body;
    let owner = await ownermodel.findOne({email: email});
    if (owner) return res.send("owner already exists");
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            console.error("Error hashing password:", err);
            return res.status(500).send("Internal Server Error");
        }
        ownermodel.create({
            email: email,
            password: hash,
        });
        res.redirect("/owners/loginsign");
    });

});
router.get("/admin", (req, res) => {
    res.render('createproducts')
});

router.post('/login',async (req,res)=>{
    let {email, password} = req.body;
    let owner = await ownermodel.findOne({email: email});
    if (!owner) return res.send("owner doesn't exist");

    bcrypt.compare(password, owner.password, function (err, result) {
        if (err) {
            // console.error("Error comparing passwords:", err);
            return res.status(500).send("Internal Server Error");
        }
        if (result) {
            let token = generateToken(owner);
            res.cookie("token", token);
            return res.redirect("/owners/admin");
        } else {
            res.send("email or password incorrect");
        }
    });
})

module.exports=router;