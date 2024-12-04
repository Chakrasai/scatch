const express = require("express");
const router = express.Router();
const { registeruser, loginuser } = require("../controllers/authcontroller");

router.post("/register", registeruser);

router.post("/login", loginuser);


router.get('/logout', (req,res)=>{
    res.clearCookie('token');
    res.redirect('/');
})


module.exports = router;