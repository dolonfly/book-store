var express = require('express');
var router = express.Router();
var isbnBookSearch = require("../api/isbn-book");

router.get("/isbn/search", isbnBookSearch.search);

module.exports = router;