const mongoose = require('mongoose');
const environment = process.env.NODE_ENV || 'development';
const config = require(`./config/${environment}`);
const mongoDbUrl = config.mongoDbUrl;


function mongodb() {
    mongoose.connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch(err => {
      console.error('Error connecting to MongoDB:', err);
    });
}
module.exports = {
    mongodb
}