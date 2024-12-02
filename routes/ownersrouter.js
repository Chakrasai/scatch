const express = require("express");
const router = express.Router();
const ownermodel = require("../models/ownermodel");


if (process.env.NODE_ENV === "development") {
    router.post("/create", async function (req, res) {
        let owners = await ownermodel.find();
        if (owners.length > 0) {
            return res.status(503).send("You don't have permission to create a new owner.");
        }
        let { fullname, email, password } = req.body;
        let createdowner = await ownermodel.create({
            fullname,
            email,
            password,
        });
        res.status(201).send(createdowner);
    });
}
router.get("/owner",(req, res)=>{
    res.send("hey it's working");
});
// console.log(process.env.NODE_ENV)


router.get("/admin", (req, res) => {
    res.render('createproducts')
});


module.exports=router;