// const mongoose = require('mongoose');
// const dbgr = require('debug')("development:mongoose");
// const config = require('config');
// mongoose.set('debug', true);

// mongoose
//     .connect(`mongodb://127.0.0.1:27017/scatch`)
//     .then(() => {
//         dbgr("connected to MongoDB");
//         // console.log("connected to MongoDB");
//     })
//     .catch((err) => {
//         dbgr("Error connecting to MongoDB:", err);
//         console.error("Error connecting to MongoDB:", err);
//     });

// module.exports = mongoose.connection;

const mongoose = require('mongoose');
const dbgr = require('debug')("development:mongoose");
require('dotenv').config();
mongoose.set('debug', true);

const mongoDBUrl = process.env.MONGODB_URL;

if (!mongoDBUrl) {
    console.error("Error: MONGODB_URL environment variable is not set.");
    process.exit(1);
}

mongoose
    .connect(`mongodb+srv://chakrasai:scatch@scatch.dgxt4.mongodb.net/?retryWrites=true&w=majority&appName=scatch`)
    .then(() => {
        dbgr("connected to MongoDB");
        console.log("connected to MongoDB");
    })
    .catch((err) => {
        dbgr("Error connecting to MongoDB:", err);
        console.error("Error connecting to MongoDB:", err);
    });

module.exports = mongoose.connection;