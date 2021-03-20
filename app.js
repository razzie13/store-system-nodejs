const express = require("express");
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = express.Router();
const ejs = require("ejs");

const dotenv = require('dotenv');
dotenv.config();

const plu_data = require("./model");
//const checkout_order = require("./model-checkout-orders");
//const online_order = require("./model-online-orders");

const port = process.env.PORT;



// ---

app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use("/", router);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname);

app.listen(port, '0.0.0.0', function() {
  console.log("Server is running on Port: " + port);
});

// ---

var uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-eyzy7.gcp.mongodb.net/plu_data?retryWrites=true&w=majority`;

/*
exports.plu_data = mongoose.createConnection(`mongodb+srv://Greg:smart123@cluster0-eyzy7.gcp.mongodb.net/plu_data?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true }, function(err){
  if (!err){
    console.log(`Database Server connection created at: plu_data`);
  } else {
    console.log(`Error starting server ${err}`);
  }
});

exports.customer_orders = mongoose.createConnection(`mongodb+srv://Greg:smart123@cluster0-eyzy7.gcp.mongodb.net/customer_orders?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true }, function(err){
  if (!err){
    console.log(`Database Server connection created at: customer_orders`);
  } else {
    console.log(`Error starting server ${err}`);
  }
});

*/

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});


// ----------------------------------------------------------
// ----------------------------------------------------------
// ---------------   WEBSTORE   -----------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------

/* -- WORKING - WEBSTORE PAGE - ALL MONGO PLU_DATA COLLECTION DATA -- */
router.get("/webstore",function(req,res){
        var response = {};
        plu_data.find({},function(err,data){
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = data;
            console.log('success: webstore .get');
            res.render(__dirname + '/webstore', { data });
        }
    });
    })

router.post("/webstore-departments",(function(req,res){
        let jumpToDepartmentButton = req.body.itemDepartment;
        var response = {};
        plu_data.find({ itemDepartment: jumpToDepartmentButton },function(err,data){
        if(err) {
            //response = {"error" : true,"message" : "Error fetching data"};
            response = "Sorry, Nothing Matches your Search."
        } else {
            response = data;
            //var str = "I want to remove the last word.";
            //var lastIndex = str.lastIndexOf(" ");

            //str = str.substring(0, lastIndex);
        }
        res.render('webstore-departments', { data, jumpToDepartmentButton });
        console.log("Success : webstore-departments .post");
        
    });
})); 

router.post("/webstore-find-other-department-categories",(function(req,res){
        let jumpToDepartmentButton = req.body.itemDepartment;
        var response = {};
        plu_data.find({ itemDepartment: jumpToDepartmentButton },function(err,data){
        if(err) {
            //response = {"error" : true,"message" : "Error fetching data"};
            response = "Sorry, Nothing Matches your Search."
        } else {
            response = data;
            //var str = "I want to remove the last word.";
            //var lastIndex = str.lastIndexOf(" ");

            //str = str.substring(0, lastIndex);
        }
        res.render('webstore-departments', { data, jumpToDepartmentButton });
        console.log("Success : webstore-departments .post");
        
    });
})); 

/* -- WORKING - WEBSTORE PAGE - SEARCH RESULTS FROM BOTH TOP-OF-PAGE FORMS -- */
router.post("/webstore-search",(function(req,res){
        let itemCodeFormField = req.body.itemCode;
        let itemCategoryFormField = req.body.itemCategory;
        let itemDescriptionFormField = req.body.itemDescription;
        let jumpToDepartmentButton = req.body.itemDepartment;
        var response = {};
        plu_data.find({$or: [{ itemDepartment: jumpToDepartmentButton }, { itemCode: itemCodeFormField }, { itemCategory: itemCategoryFormField }, { itemDescription: itemDescriptionFormField }, { itemDescription: itemDescriptionFormField }]},function(err,data){
        if(err) {
            //response = {"error" : true,"message" : "Error fetching data"};
            response = "Sorry, Nothing Matches your Search."
        } else {
            response = data;
            //var str = "I want to remove the last word.";
            //var lastIndex = str.lastIndexOf(" ");

            //str = str.substring(0, lastIndex);
        }
        res.render('store-data-search.ejs', { response, itemCodeFormField, itemCategoryFormField, itemDescriptionFormField });
        console.log("Success : webstore-search .post");
        
    });
}));

// ----------------------------------------------------------
// ----------------------------------------------------------
// ---------------   API SECTION   --------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------

/* WORKING!! DELIVERS ENTIRE DATASET OF STORE DATA IN JSON */
router.route("/store-plu-api-data/")
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
router.route("/public-plu-data/")
    .get(function(req,res){
        var response = {};
        plu_data.find({ itemDepartment: "Produce" }, { itemCode : 1, itemDescription : 1, itemType : 1 }, function(err,data){
        if(err) {
            response = {"error" : true, "message" : "Error fetching data"};
        } else {
            response = {"error" : false, "message" : data};
        }
        res.json(response);
        console.log("Success : public-data called");
    });
});

/* IN PROGRESS - CHECKS TO SEE IF ITEMCODE ALREADY EXISTS IN DATABASE AND IF NOT, ALLOWS USER TO ADD */

/* -- add-new-item.html -- */
router.get("/add-new-item",function(req,res){
    res.render(__dirname + '/add-new-item.ejs');
});

/* -- ROUTE TESTING FOR SERVER NODE.JS APP -- */
router.get("/test-one",function(req,res){
    res.render(__dirname + '/express-test-page');
});
router.get("/test-two",function(req,res){
    res.send('test-two');
});
router.get("/test-three",function(req,res){
    res.sendFile(__dirname + '/express-test-page');
});
app.get("/test-four",function(req,res){
    res.render(__dirname + '/express-test-page');
});
app.get("/test-five",function(req,res){
    res.send('test-five');
});
app.get("/test-six",function(req,res){
    res.sendFile(__dirname + '/express-test-page');
});


router.route("/add-new-item-plu").post(function(req, res){
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
        
        /*
        itemCode: 1213,
        itemDepartment: "test",
        itemCategory: "test",
        itemBrand: "test",
        itemType: "test",
        itemDescription: "test",
        itemPerBox: 6,
        itemPrice: 6.00,
        itemPromo: 4.00,
        promo: true,
        hst: false,
        weighedItem: false,
        itemImage: ''
        */
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


// ----------------------------------------------------------
// ----------------------------------------------------------
// ---------------   MAKE FULL PAGE SIGNS   -----------------
// ----------------------------------------------------------
// ----------------------------------------------------------

router.get("/create-full-page-signs",function(req,res){
    res.render(__dirname + '/create-full-page-signs.ejs');

});


var signArray = []
router.post("/print-full-page-signs",(function(req,res){

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

router.get("/clear-generated-signs",function(req,res){
    signArray = []
    res.render(__dirname + '/create-full-page-signs.ejs');
});


// ----------------------------------------------------------
// ----------------------------------------------------------
// ---------------   POINT OF SALE   ------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------

//router.get("/point-of-sale-system",function(req,res){
//    signArray = []
//    res.sendFile(__dirname + '/point-of-sale.html');
//});

var customerOrderAtCheckout = []

router.route("/point-of-sale",function(req,res){
    customerOrderAtCheckout = []
    res.render(__dirname + '/point-of-sale.ejs', {customerOrderAtCheckout});
});

router.post("/point-of-sale",(function(req,res){

        let itemCodeFormField = req.body.itemNumberInput;
        //let itemWeight = req.body.itemWeight;

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
                        customerOrderAtCheckout.push({itemDescription: data[i].itemDescription, itemType: data[i].itemType, itemCode: data[i].itemCode, itemPrice: data[i].itemPrice});
                    }
            }}

            /*
            let recieptSubTotal = customerOrderAtCheckout.reduce(function(prev, cur) {return prev + cur.itemAmount;}, 0);
            let recieptSubTotalToString = recieptSubTotal.toFixed(2)
            let recieptTaxes = customerOrderAtCheckout.reduce(function(prev, cur) {return prev + cur.itemHST;}, 0);
            let recieptTaxesToString = recieptTaxes.toFixed(2)
            let recieptTotal = customerOrderAtCheckout.reduce(function(prev, cur) {return prev + (cur.itemAmount + cur.itemHST);}, 0);
            let recieptTotalToString = recieptTotal.toFixed(2)

            res.render(__dirname + '/point-of-sale.ejs', { response, itemCodeFormField, customerOrderAtCheckout });
            console.log("Success : /point-of-sale .post");
            */
        });
}));
/*
router.get("/point-of-sale", function(req,res){
        var response = {};
        plu_data.find({},function(err,data){
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = {"error" : false,"message" : data};
        }
        response = data;
        
        console.log("Success : point-of-sale .get");
        //res.render(__dirname + '/point-of-sale.html', { data });
    });
});

router.post("/point-of-sale-end-transaction",function(req, res) {
    
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

// ----------------------------------------------------------
// ----------------------------------------------------------
// ---------------   FRONTEND CODE ROLODEX   ----------------
// ----------------------------------------------------------
// ----------------------------------------------------------

router.get("/frontend-produce-plu",function(req,res){
    res.render(__dirname + '/frontend-produce-plu.html');
});


// ----------------------------------------------------------
// ----------------------------------------------------------
// ---------------   MAIN INDEX LANDING   -------------------
// ----------------------------------------------------------
// ----------------------------------------------------------

/* -- index.html -- */

router.get("/",function(req,res){
    res.send('at least this worked');
});

/*
router.get("/",function(req,res){
    res.render(__dirname + '/index');
});

*/





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
router.route("/fetchdata").get(function(req, res) {
    plu_data.find({}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });

