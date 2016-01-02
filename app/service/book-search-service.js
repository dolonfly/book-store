/**
 * Created by dll on 15/10/11.
 */
"use strict";

var async = require('async');
var Book = require("../models/book-model");
var isbnSuite = require('../utils/isbnSuite');
var book_fetch_service = require('./book-fetch-service');
var dangdang_fetch_service = require('./fetch/dangdang');

function findByIsbn(isbn, callback) {
    if (isbn.length == 10) {
        isbn = isbnSuite.convert.isbn10to13(isbn);
    }
    Book.findOne({isbn13: isbn}, {source: 0}).exec(callback);
}

function findByIsbn2(isbn, callback) {
    if (isbn.length == 10) {
        isbn = isbnSuite.convert.isbn10to13(isbn);
    }

    async.waterfall([
        function (callback) {
            console.log('search from db');
            Book.findOne({isbn13: isbn}, {source: 0}).exec(callback);
        },
        function (book, callback) {
            console.log('search from douban');
            if (!book) {
                book_fetch_service.generateBook(isbn, callback);
            } else {
                callback(null, book);
            }
        },
        function (book, callback) {
            console.log('search from db');
            if (!book) {
                dangdang_fetch_service.generateBook(isbn, callback);
            } else {
                callback(null, book);
            }
        }
    ], function (err, book) {
        console.log('err:',err);
        callback(err, book);
    });
}

module.exports = {
    findByIsbn: findByIsbn,
    findByIsbn2: findByIsbn2
};