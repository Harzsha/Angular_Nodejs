const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const URI = "mongodb://0.0.0.0:27017/H&SAPP";

function mongodb() {
    mongoose
        .connect(URI)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.log(err);
        });
}
module.exports = {
    mongodb
}