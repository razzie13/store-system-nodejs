const express = require("express");
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = express.Router();
const ejs = require("ejs");

const dotenv = require('dotenv');
dotenv.config();

const plu_data_schema = require("./connections/schemas/schema-plu-data");
const pluItem = require("./connections/schemas/schema-plu-data");
const customerOrders = require("./connections/schemas/schema-orders");


// --------------------------------------------------------------------------------------------------------------------

app.use('/public', express.static(__dirname + '/public'));
app.use('/images', express.static(__dirname + '/public/images/'));


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(4000);

// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// ---------------   MONGODB CONNECTIONS   ----------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

var uri_plu_data = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-eyzy7.gcp.mongodb.net/plu_data?retryWrites=true&w=majority`;
var uri_customer_orders = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-eyzy7.gcp.mongodb.net/customer_orders?retryWrites=true&w=majority`;
//var uri_sales_data = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-eyzy7.gcp.mongodb.net/sales_data?retryWrites=true&w=majority`;


const connection_plu_data = mongoose.createConnection(uri_plu_data, { useUnifiedTopology: true, useNewUrlParser: true });
const connection_customer_orders = mongoose.createConnection(uri_customer_orders, { useUnifiedTopology: true, useNewUrlParser: true });
//const connection_sales_data = mongoose.createConnection(uri_sales_data, { useUnifiedTopology: true, useNewUrlParser: true });


const plu_data = connection_plu_data.model('store_plu_data', require('./connections/schemas/schema-plu-data'), 'store_plu_data');
const customer_orders = connection_customer_orders.model('checkout_and_online_orders', require('./connections/schemas/schema-orders'), 'checkout_and_online_orders');
//const sales_data = connection_sales_data.model('daily_sales_data', require('./schema-sales-data'), 'daily_sales_data');


// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// ---------------   INTRO PAGE   -------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

app.get('/', (req, res) => {
    res.render(__dirname + '/index')
})



// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// ---------------   WEBSTORE   ---------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

/* -- WORKING - WEBSTORE PAGE - ALL MONGO STORE_PLU_DATA COLLECTION DATA -- */

var customerOrderAtWebStore = [];
let webStoreRecieptSubTotalToString;
let webStoreRecieptTaxesToString;
let webStoreRecieptTotalToString;

app.get("/store-system/webstore",function(req,res){
        var response = {};
        plu_data.find({},function(err,data){
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = data;
            console.log('success: webstore .get');
            res.render(__dirname + '/webstore/webstore', { data, customerOrderAtWebStore });
            
            
        }
    });
    })

    app.get("/store-system/webstore-cart",function(req,res){
    let webStoreRecieptSubTotal = customerOrderAtWebStore.reduce(function(prev, cur) {return prev + cur.itemPrice;}, 0);
    webStoreRecieptSubTotalToString = webStoreRecieptSubTotal.toFixed(2)

    let webStoreRecieptTaxes = customerOrderAtWebStore.reduce(function(prev, cur) {return prev + cur.itemTaxes;}, 0);
    webStoreRecieptTaxesToString = webStoreRecieptTaxes.toFixed(2)

    let webStoreRecieptTotal = customerOrderAtWebStore.reduce(function(prev, cur) {return prev + (cur.itemPrice + cur.itemTaxes);}, 0);
    webStoreRecieptTotalToString = webStoreRecieptTotal.toFixed(2)
    res.render(__dirname + '/webstore/webstore-cart', { customerOrderAtWebStore, webStoreRecieptSubTotalToString, webStoreRecieptTaxesToString, webStoreRecieptTotalToString });
    console.log('subtotal, taxes, total')
    console.log(webStoreRecieptSubTotalToString, webStoreRecieptTaxesToString, webStoreRecieptTotalToString)
})

/* -- WORKING - WEBSTORE JUMP TO DIFFERENT DEPARTMENT -- */
app.post("/store-system/webstore-departments",(function(req,res){
        let jumpToDepartmentButton = req.body.itemDepartment;
        var response = {};
        plu_data.find({ itemDepartment: jumpToDepartmentButton },function(err,data){
        if(err) {
            response = "Sorry, Nothing Matches your Search."
        } else {
            response = data;

        }
        res.render(__dirname + '/webstore/webstore-departments.ejs', { data, jumpToDepartmentButton, customerOrderAtWebStore });
        console.log("Success : webstore-departments .post");
        console.log(__dirname + '/images');

        console.log(__dirname + '/public/images');
    });
})); 


/* -- WORKING - WEBSTORE PAGE - SEARCH RESULTS FROM BOTH TOP-OF-PAGE FORMS -- */
app.post("/store-system/webstore-search",(function(req,res){
        let itemCodeFormField = req.body.itemCode;
        let itemCategoryFormField = req.body.itemCategory;
        let itemDescriptionFormField = req.body.itemDescription;
        let jumpToDepartmentButton = req.body.itemDepartment;
        var response = {};
        plu_data.find({$or: [{ itemDepartment: jumpToDepartmentButton }, { itemCode: itemCodeFormField }, { itemCategory: itemCategoryFormField }, { itemDescription: itemDescriptionFormField }, { itemDescription: itemDescriptionFormField }]},function(err,data){
        if(err) {
            response = "Sorry, Nothing Matches your Search."
        } else {
            response = data;

        }
        res.render(__dirname + '/webstore/store-data-search.ejs', { data, response, itemCodeFormField, itemCategoryFormField, itemDescriptionFormField, customerOrderAtWebStore });
        console.log("Success : webstore-search .post");
        
    });
}));

/* -- WEBSTORE ADD TO CART -- */
app.post("/store-system/webstore-add-to-cart",(function(req,res){

    let itemCodeFormField = req.body.itemPluCode; // hidden form input value for PLU code
    let quantityFormField = req.body.quantity; // amount of units or pounds the customer requests

    var response = {};
    plu_data.find({ itemCode: itemCodeFormField },function(err,data){
        if(err) {
            response = "Sorry, Nothing Matches your Search."
        } 
        else {
            response = data;
                for( let i = 0; i < data.length; i++)  {
                    let itemTaxes;

                if(data[i].itemCode == itemCodeFormField)  {
                
                    if (data[i].promo == true)  {
                        data[i].itemPrice = data[i].itemPromo // applies promotional price
                    }
                    
                    if (data[i].weighedItem == true)  {
                        itemWeight = quantityFormField
                        data[i].itemPrice = (data[i].itemPrice * 0.454); // sell by pound quantity
                    } else  {
                        itemWeight = null;
                        quantity = quantityFormField; // sell by individual units
                    }

                    if (data[i].weighedItem == false)  {
                        data[i].itemPrice = (data[i].itemPrice) // price * individual units
                    }

                    if (data[i].hst == true)  {
                        itemTaxes = (data[i].itemPrice * 0.13) // adds Ontario HST
                    } else  {
                        itemTaxes = 0
                    }
                
                    for(let j = 0; j < quantityFormField; j++)  {
                        customerOrderAtWebStore.push({itemBrand: data[i].itemBrand, itemDescription: data[i].itemDescription, itemType: data[i].itemType, itemCode: data[i].itemCode, itemPrice: data[i].itemPrice, itemTaxes: itemTaxes, itemWeight: itemWeight, weighedItem: data[i].weighedItem});
                    }

                }
        }}

        res.render(__dirname + '/webstore/webstore-add-to-cart-confirm.ejs', { data, itemCodeFormField, quantityFormField, customerOrderAtWebStore/*, recieptSubTotalToString, recieptTaxesToString, recieptTotalToString*/ });
        console.log("Success : /webstore .post");        
        console.log("customerOrderAtWebStore");    
        console.log(customerOrderAtWebStore);    
    });
}));



app.post("/store-system/send-web-order-to-database",(function(req,res){
    console.log('/send-web-order-to-database');
    console.log(customerOrderAtWebStore);

    let custName = req.body.customerName;
    let custPhone = req.body.customerPhone;
    let custEmail = req.body.customerEmail;
    let customerInstructions = req.body.customerInstructions;
    let custPromoPermission = req.body.customerEmailPermission;


    var submittedWebOrder = 
        [{
            custNumber: null,
            custName: custName,
            custPhone: custPhone,
            custEmail: custEmail,
            custPromoPermission: custPromoPermission,
            orderOnline: true,
            orderInProcess: false,
            orderReady: false,
            orderPaid: false,
            itemReturnedOnThisReciept: false,
            customerInstructions: customerInstructions,
            customerOrders: customerOrderAtWebStore,
            customerSubTotal: webStoreRecieptSubTotalToString,
            customerTaxes: webStoreRecieptTaxesToString,
            customerTotal: webStoreRecieptTotalToString,
            transactionDate: Date()
        }]
        
        customer_orders.create(submittedWebOrder, function(err, result) {
        if (err) {
            return res.send(err);
        } else {
            res.render(__dirname + '/webstore/webstore-order-submit-confirm.ejs', { result, customerOrderAtWebStore })
        }});



        //todaysSalesTotal
}));


/* IN PROGRESS - CHECKS TO SEE IF ITEMCODE ALREADY EXISTS IN DATABASE AND IF NOT, ALLOWS USER TO ADD */

/* -- add-new-item.html -- */
app.get("/store-system/add-new-item",function(req,res){
    res.render(__dirname + '/add-new-item.ejs');
});


app.route("/store-system/add-new-item-plu").post(function(req, res){
    // --
    var newData = 
    {   
        "itemCode": req.body.itemCode,
        "itemDepartment": req.body.itemDepartment,
        "itemCategory": req.body.itemCategory,
        "itemBrand": req.body.itemBrand,
        "itemType": req.body.itemType,
        "itemDescription": req.body.itemDescription,
        "itemPerBox": req.body.itemPerBox,
        "itemPrice": req.body.itemPrice,
        "itemPromo": req.body.itemPromo,
        "promo": req.body.promo,
        "hst": req.body.hst,
        "weighedItem": req.body.weighedItem,
        "itemImage": req.body.itemImage
    };

    //plu_data.create(newData, function(err, result) {
    plu_data.create(newData, function(err, result) {
        if (err) {
        res.send(err);
        console.log("Data Submission Has Failed");
        } else {
        res.send(result);
        console.log('Record has been added');
        db.close();
        }
    });
    });


// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// ---------------   VIEW WEBSITE ORDERS   ----------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

app.get("/store-system/webstore-orders",function(req,res){
        res.render(__dirname + '/web-orders-get-new');
        console.log('success: web-orders-get-new .get');
});


app.get("/store-system/webstore-order-pick",function(req,res){
    var response = {};
    customer_orders.findOne({ orderOnline: true, orderReady: false }).sort({transactionDate: 1}).exec(function(err,data){ // shows oldest unresolved online order
    if(err) {
        response = {"error" : true,"message" : "Error fetching data"};
    } else {
        response = data;
        console.log('success: web-orders-new .get');
        //res.send(data);
        res.render(__dirname + '/webstore/web-orders-new', { data });
    }
});
})

app.post("/store-system/webstore-order-finalize", function(req, res) {
    let documentId = {_id: req.body.documentId};
    let orderPickerComments = req.body.orderPickerComments;
    customer_orders.findOneAndUpdate(documentId, { orderReady: true, orderPickerComments: orderPickerComments, useFindAndModify: false }, function(err, doc) {
        if (err) {res.send(500, {error: err})}
        else  {
            res.render(__dirname + '/webstore/web-orders-complete-confirm.ejs');
        }
    });
});


// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// ---------------   MAKE FULL PAGE SIGNS   ---------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

app.get("/store-system/create-full-page-signs",function(req,res){
    res.render(__dirname + '/create-full-page-signs.ejs');

});


var signArray = []
app.post("/store-system/print-full-page-signs",(function(req,res){

        let itemCodeFormField = req.body.itemNumberInput;
        let countryOfOriginField = req.body.countryOriginInput;

        var response = {};
        plu_data.find({ itemCode: itemCodeFormField },function(err,data){
            if(err) {
                //response = {"error" : true,"message" : "Error fetching data"};
                response = "Sorry, Nothing Matches your Search."
            } 
            else {
                response = data;
                    for( let i = 0; i < data.length; i++)  {
                    
                    if(data[i].itemCode == itemCodeFormField)  {
                        signArray.push({itemDescription: data[i].itemDescription, itemType: data[i].itemType, itemCode: data[i].itemCode, itemPrice: data[i].itemPrice, promo: data[i].promo, weighedItem: data[i].weighedItem, itemPromo: data[i].itemPromo, origin: countryOfOriginField});
                    }
            }}
            res.render(__dirname + '/print-full-page-signs.ejs', { response, itemCodeFormField, signArray });
            console.log("Success : print-full-page-signs .post");
            
        });
}));

app.get("/store-system/clear-generated-signs",function(req,res){
    signArray = []
    res.render(__dirname + '/create-full-page-signs.ejs');
});


// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// ---------------   POINT OF SALE   ----------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

var customerOrderAtCheckout = [];
var todaysSalesTotal = []
let recieptSubTotalToString;
let recieptTaxesToString;
let recieptTotalToString;

app.get("/store-system/point-of-sale",function(req,res){
    customerOrderAtCheckout = []
    res.render(__dirname + '/point-of-sale.ejs', {customerOrderAtCheckout});
});

app.post("/store-system/point-of-sale",(function(req,res){

        let itemCodeFormField = req.body.itemNumberInput;
        //let weightFormField = req.body.weightInput;
        
        var response = {};
        plu_data.find({ itemCode: itemCodeFormField },function(err,data){
            if(err) {
                //response = {"error" : true,"message" : "Error fetching data"};
                response = "Sorry, Nothing Matches your Search."
            } 
            else {
                response = data;
                    for( let i = 0; i < data.length; i++)  {
                        let itemTaxes;

                    if(data[i].itemCode == itemCodeFormField)  {
                    
                        if (data[i].promo == true)  {
                            data[i].itemPrice = data[i].itemPromo
                        }
                        
                        if (data[i].weighedItem == true)  {
                            itemWeight = 1000
                            data[i].itemPrice = ((itemWeight * 0.001) * data[i].itemPrice) 
                            
                        } else  {
                            itemWeight = null
                        }

                        if (data[i].hst == true)  {
                            itemTaxes = (data[i].itemPrice * 0.13) // HST
                        } else  {
                            itemTaxes = 0
                        }
                    
                        customerOrderAtCheckout.push({itemBrand: data[i].itemBrand, itemDescription: data[i].itemDescription, itemType: data[i].itemType, itemCode: data[i].itemCode, itemPrice: data[i].itemPrice, itemTaxes: itemTaxes, itemWeight: itemWeight, itemQuantity: 1});
                    }
            }}

            let recieptSubTotal = customerOrderAtCheckout.reduce(function(prev, cur) {return prev + cur.itemPrice;}, 0);
            recieptSubTotalToString = recieptSubTotal.toFixed(2)

            let recieptTaxes = customerOrderAtCheckout.reduce(function(prev, cur) {return prev + cur.itemTaxes;}, 0);
            recieptTaxesToString = recieptTaxes.toFixed(2)

            let recieptTotal = customerOrderAtCheckout.reduce(function(prev, cur) {return prev + (cur.itemPrice + cur.itemTaxes);}, 0);
            recieptTotalToString = recieptTotal.toFixed(2)

            res.render(__dirname + '/point-of-sale.ejs', { response, itemCodeFormField, customerOrderAtCheckout, recieptSubTotalToString, recieptTaxesToString, recieptTotalToString });
            console.log("Success : /point-of-sale .post");
            console.log(recieptSubTotal, recieptTaxes , recieptTotal);
            
        });
}));


app.post("/store-system/send-store-reciept-to-database",(function(req,res){
    console.log('/send-store-reciept-to-database');
    console.log(customerOrderAtCheckout);

    var transactionRecord = 
        [{
            custNumber: null,
            custName: null,
            custPhone: null,
            custEmail: null,
            custPromoPermission: null,
            orderOnline: false,
            orderInProcess: false,
            orderReady: true,
            orderPaid: true,
            itemReturnedOnThisReciept: false,
            customerInstructions: null,
            customerOrders: customerOrderAtCheckout,
            customerSubTotal: recieptSubTotalToString,
            customerTaxes: recieptTaxesToString,
            customerTotal: recieptTotalToString,
            transactionDate: Date(),
            orderPickerComments: null
        }]
        
        customer_orders.create(transactionRecord, function(err, result) {
        if (err) {
            return res.send(err);
        } else {
            res.send(result);
        }});
        //todaysSalesTotal
}));


// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// ---------------   FRONTEND CODE ROLODEX   --------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

app.get("/store-system/frontend-produce-plu",function(req,res){
    res.render(__dirname + '/frontend-produce-plu.html');
});


// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// ---------------   MAIN INDEX LANDING   -----------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

/* -- index.html -- */

app.get('/store-system', (req, res) => {
    //res.send('hello world');
    res.render(__dirname + '/index.ejs');
});

// -------------- INSERT DATA ------------------
/*
router.route("/insertdata").post(function(req, res) {

var newData = 
[{
    "itemCode": 3029,
    "itemDepartment": "Produce",
    "itemCategory": "citrus",
    "itemBrand": "",
    "itemType": "mandarins",
    "itemDescription": "satsuma",
    "itemPerBox": null,
    "itemPrice": 4.39,
    "itemPromo": null,
    "promo": false,
    "hst": false,
    "weighedItem": true,
    "itemImage": "images/produce/"
  }]

  plu_data.create(newData, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });


});
*/

// -------------- FETCH DATA ------------------
app.route("/store-system/fetchdata").get(function(req, res) {
    plu_data.find({}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });


// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// ---------------   API SECTION   ------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

/* WORKING!! DELIVERS ENTIRE DATASET OF STORE DATA IN JSON */
app.route("/store-system/store-plu-api-data/")
.get(function(req,res){
    var response = {};
    plu_data.find({},function(err,data){
    if(err) {
        response = {"error" : true,"message" : "Error fetching data"};
    } else {
        response = {"error" : false,"message" : data};
    }
    res.json(response);
    console.log("Success : store-plu-api-data called");
});
});

/* WORKING!! SENDS ONLY CERTAIN SECTIONS OF API DATA - DO NOT DELETE */
app.route("/store-system/public-plu-data/")
.get(function(req,res){
    var response = {};
    plu_data.find({ itemDepartment: "Produce" }, { itemCode : 1, itemDescription : 1, itemType : 1 }, function(err,data){
    if(err) {
        response = {"error" : true, "message" : "Error fetching data"};
    } else {
        response = data;
    }
    res.json(response);
    console.log("Success : public-data called");
});
});