//import the top level function of express module
var express = require('express');
//new route object
var router = express.Router();
//to make database operation under the database file
var database = require('../database');

//parse and access user data if sent in json format
router.use(express.json());
//parse and access user data sent in html format
router.use(express.urlencoded({ extended: true }));

//SELECT

//display the products in browser
router.get('/', function(request, response, next){
    //mysql query for selecting all products in descending order of their Ids
    var query = "SELECT * FROM products ORDER BY Id DESC";
    //data fetched from mysql table
    database.query(query, function(error, data){
        if(error){
            //if query not executed
            throw error;
        }
        else{
            //displaying in product_data route if query is successfully executed in the database
            response.render('product_data', {title:'Product Inventory System', action:'list', productData:data});
        }
    });
    
});

//ADD

//define add route to add product data
router.get("/add", function(request, response, next){
    response.render("product_data", {title:'Add Product', action:'add'});
});

//handle data request from form; recieves data and responds
router.post("/add_product_data", function(request, response, next){
    //store each of form input data to local variables
    var product_name = request.body.product_name;
    var product_description = request.body.product_description;
    var price = request.body.price;
    var quantity = request.body.quantity;
    //insert mysql query; saves local variable values as column data in mysql table
    var query = `
    INSERT INTO products (ProductName, ProductDescription, Price, Quantity)
    VALUES ("${product_name}","${product_description}",${price},${quantity})
    `;
    database.query(query, function(error, data){
        if(error) {
            //if query did not execute
           throw error;
        }
        else{
            //redirect to specified route for successful query execution
            response.redirect("/product_data");
        }
    });
});

//EDIT

//define route for each "selected to be edited" product
router.get('/edit/:id', function(request,response,next){
    var id = request.params.id;
    //select specific product
    var query = `SELECT * FROM products WHERE Id = "${id}"`;
    database.query(query, function(error, data){
        //if query successfully executed
        response.render('product_data', {title:'Update Product Information', action:'edit', productData:data[0]});
    });
});

router.post('/edit/:id', function(request, response, next){
    var id = request.params.id;
    var product_name = request.body.product_name;
    var product_description = request.body.product_description;
    var price = request.body.price;
    var quantity = request.body.quantity;
    //mysql update query
    var query = `
    UPDATE products SET ProductName = "${product_name}",
    ProductDescription = "${product_description}",
    Price = ${price},
    Quantity = ${quantity}
    WHERE Id = "${id}"
    `;

    database.query(query, function(error, data){
        if(error) {
            throw error;
        }
        else{
            //if query successfully executed
            response.redirect('/product_data');
        }
    });
});

//DELETE

//route for specific product to be deleted
router.get('/delete/:id', function(request, response, next){
    var id = request.params.id;

    //query to delete row from mysql table
    var query = `
    DELETE FROM products WHERE Id = "${id}"
    `;
    database.query(query, function(error, data){
        if(error) {
            throw error;
        }
        else{
            response.redirect('/product_data');
        }
    });
})

module.exports = router;