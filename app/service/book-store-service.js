"use strict"

var book_fetch_service = require('./book-fetch-service');
var book_search_service = require('./book-search-service');
var Book = require("../models/book-model");

function fetchAndStoreBook(isbn) {
    if (isbn.length == 10) {
        isbn = isbnSuite.convert.isbn10to13(isbn);
    }
    if (isbn.length != 13) {
        return;
    }
    console.log("start fetch book whose isbn is ", isbn);
    book_fetch_service.generateBook(isbn, function (err, book) {
        if (!err) {
            if (book && book.isbn13 && book.title) {
                Book.create(book, function (err, res) {
                    if (err) {
                        console.log("book save to db false :", isbn, " err:", err);
                    } else {
                        console.log("book save to db true :", isbn);
                    }
                });
            }
        } else {
            console.log("fetch ", isbn, "err:", err);
        }
    });

}

module.exports = {
    fetchAndStoreBook: fetchAndStoreBook
}