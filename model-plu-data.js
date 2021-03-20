const mongoose = require("mongoose");

const model_plu_items = connection_plu_data.model('Model', pluItemSchema);
const pluItemSchema = new Schema((
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
));

module.exports = pluItemSchema;
//module.exports = mongoose.model("store_plu_data", pluItem);
