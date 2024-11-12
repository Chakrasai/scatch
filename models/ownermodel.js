const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minlength: 3,
        trim:true
    },
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    products: {
        type: Array,
        default: []
    },
    contact: Number,
    gstin: String,
});

module.exports = mongoose.model("owner", ownerSchema);