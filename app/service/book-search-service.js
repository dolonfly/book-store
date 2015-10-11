/**
 * Created by dll on 15/10/11.
 */
"use strict"
var Book = require("../models/book-model");

function findByIsbn(isbns, callback) {
    var isbnArray = isbns.split(",");
    Book.find({isbn13: {$in: isbnArray}}).exec(callback);
}