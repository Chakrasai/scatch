const usermodel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generatetoken");

module.exports.registeruser = async (req, res) => {
    try {
        let { fullname, email, password } = req.body;
        let user = await usermodel.findOne({ email: email });
        if (user) {
            // req.flash("error", "User already exists");
            return res.redirect("/");
        } 
        else {
            bcrypt.genSalt(10, function (err, salt) {
                if (err) return res.send(err.message);
                bcrypt.hash(password, salt, async function (err, hash) {
                    if (err) return res.send(err.message);
                    else {
                        let createduser = await usermodel.create({
                            email,
                            password: hash,
                            fullname,
                        });
                        let emailtoken = generateToken(createduser);
                        res.cookie("token", emailtoken);
                        res.redirect('/');
                    }
                });
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.loginuser = async (req, res) => {
    let { email, password } = req.body;
    let user = await usermodel.findOne({ email: email });
    if (!user) return res.send("user doesn't exist");

    bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
            console.error("Error comparing passwords:", err);
            return res.status(500).send("Internal Server Error");
        }
        if (result) {
            let token = generateToken(user);
            res.cookie("token", token);
            return res.redirect("/shop");
        } else {
            res.send("email or password incorrect");
        }
    });
};