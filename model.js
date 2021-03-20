const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let pluItem = new Schema(
  {
    itemCode: {
        type: Number
    },
    itemDepartment: {
        type: String
    },
    itemCategory: {
        type: String
    },
    itemBrand: {
        type: String
    },
    itemType: {
        type: String
    },
    itemDescription: {
        type: String
    },
    itemPerBox: {
        type: Number
    },
    itemPrice: {
        type: Number
    },
    itemPromo: {
        type: Number
    },
    promo: {
        type: Boolean
    },
    hst: {
        type: Boolean
    },
    weighedItem: {
        type: Boolean
    },
    itemImage: {
        type: String
    }

  },
  { collection: "store_plu_data" }
);

module.exports = mongoose.model("store_plu_data", pluItem);
