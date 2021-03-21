const mongoose = require('mongoose');

var uri_plu_data = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-eyzy7.gcp.mongodb.net/plu_data?retryWrites=true&w=majority`;

const connection_plu_data = mongoose.createConnection(uri_plu_data, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, function(err){
    if (!err){
        console.log(`MongoDB database connection established at: plu_data`);
      } else {
        console.log(`Error starting server ${err}`);
      }
});
const plu_data = connection_plu_data.model('store_plu_data', require('./schemas/schema-plu-data'));

module.exports = connection_plu_data;