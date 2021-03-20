const mongoose = require("mongoose");

const model_customer_orders = connection_customer_orders.model('Model', orderSchema);
const orderSchema = new Schema(
    {
        custNumber: {
            type: String
        },
        custName: {
            type: String
        },
        custPhone: {
            type: String
        },
        orderOnline: {
            type: Boolean
        },
        orderReady: {
            type: Boolean
        },
        itemCode: {
            type: Number
        },
        itemBrand: {
            type: String
        },
        itemDescription: {
            type: String
        },
        itemType: {
            type: String
        },
        itemPrice: {
            type: Number
        },
        itemTaxes: {
            type: Number
        }
    },
    { collection: "checkout_and_online_orders" }
  );

module.exports = orderSchema; 
//module.exports = mongoose.model("checkout_and_online_orders", model_customer_orders);
