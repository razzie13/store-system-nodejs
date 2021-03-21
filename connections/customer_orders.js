const mongoose = require('mongoose');

var uri_customer_orders = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-eyzy7.gcp.mongodb.net/customer_orders?retryWrites=true&w=majority`;

const connection_customer_orders = mongoose.createConnection(uri_customer_orders, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, function(err){
    if (!err){
        console.log(`MongoDB database connection established at: customer_orders`);
      } else {
        console.log(`Error starting server ${err}`);
      }
});
connection_customer_orders.model('checkout_and_online_orders', require('./schemas/schema-orders'));

module.exports = connection_customer_orders;