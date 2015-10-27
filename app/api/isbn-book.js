/**
 * Created by dll on 15/10/11.
 */

var bookSearch = require("../service/book-search-service");
var book_store_service = require('../service/book-store-service');

function search(req, res, next) {
    var isbn = req.query.isbn;
    if (!isbn) {
        res.status(400).send({
            code: 400,
            message: "isbn is required."
        });
        return;
    }
    bookSearch.findByIsbn(isbn, function (err, data) {
        if (err) {
            res.send({
                code: 400,
                msg: "search book by isbn err"
            });
        } else {
            if (data) {
                res.json({code: 200, data: data});
            } else {
                book_store_service.fetchAndStoreBook(isbn);
                res.status(404).send({
                    message: 'the book not found'
                });
                return;
            }
        }
    });
}

module.exports = {
    search: search
}
