var express = require('express');
var router = express.Router();
var homeController = require('../controller/home');
var isbnController = require('../controller/isbn');

router.get('/', homeController.index);
router.get('/isbn/:isbn', isbnController.index);

module.exports = router;
