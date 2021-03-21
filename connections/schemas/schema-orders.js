const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerOrdersList = require("./schema-orders-list");

const customerOrders = new Schema(
    {
        custNumber: String,
        custName: String,
        custPhone: String,
        custEmail: String,
        custPromoPermission: Boolean,
        orderOnline: Boolean,
        orderInProcess: Boolean,
        orderReady: Boolean,
        orderPaid: Boolean,
        itemReturnedOnThisReciept: Boolean,
        //itemsReturnedOnThisReciept: Array,
        customerInstructions: String,
        customerOrders: [customerOrdersList],
        customerSubTotal: Number,
        customerTaxes: Number,
        customerTotal: Number,
        transactionDate: String,
        orderPickerComments: String
    }
  );

module.exports = customerOrders;
