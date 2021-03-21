const mongoose = require("mongoose");
//const Schema = mongoose.Schema;

//const pluItem = new Schema(
const pluItem = new mongoose.Schema(
    {
        itemCode: Number,
        itemDepartment: String,
        itemCategory: String,
        itemBrand: String,
        itemType: String,
        itemDescription: String,
        itemPerBox: Number,
        itemPrice: Number,
        itemPromo: Number,
        promo: Boolean,
        hst: Boolean,
        weighedItem: Boolean,
        itemImage: String
    }
);
module.exports = pluItem
//const store_plu_data = mongoose.model('store_plu_data', pluItem);
//module.exports = store_plu_data;


