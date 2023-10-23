var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { subTitle: 'Type in: localhost/3000/product_data in the search bar', title:'Product Inventory System' });
});

module.exports = router;
