require('dotenv').config();
const mongoose = require("mongoose");

const connecting = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("The Bluetooth device is ready to pair");
        })
        .catch((err) => {
            console.error("Error connecting to MongoDB:", err);
        });
};

module.exports = { connecting };
