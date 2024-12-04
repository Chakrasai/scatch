const mongoose = require('mongoose');
const dbgr = require('debug')("development:mongoose");
const config = require('config');
mongoose.set('debug', true);

mongoose
    .connect(`mongodb://127.0.0.1:27017/scatch`)
    .then(() => {
        dbgr("connected to MongoDB");
        // console.log("connected to MongoDB");
    })
    .catch((err) => {
        dbgr("Error connecting to MongoDB:", err);
        console.error("Error connecting to MongoDB:", err);
    });

module.exports = mongoose.connection;