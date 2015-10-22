/**
 * Created by dll on 15/10/11.
 */
"use strict"
var Book = require("../models/book-model");
var isbnSuite = require('../utils/isbnSuite');

function findByIsbn(isbn, callback) {
    if (isbn.length == 10) {
        isbn = isbnSuite.convert.isbn10to13(isbn);
    }
    Book.findOne({isbn13: isbn}).exec(callback);
}

module.exports = {
    findByIsbn: findByIsbn
}