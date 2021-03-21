const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerOrdersList = new Schema(
    {
        itemBrand: String,
        itemDescription: String,
        itemType: String,
        itemCode: Number,
        itemPrice: Number,
        itemTaxes: Number,
        itemWeight: Number,
        itemQuantity: Number
    }
  );

module.exports = customerOrdersList;
