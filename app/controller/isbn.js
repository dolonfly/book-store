/**
 * Created by dll on 16/1/2.
 */

var bookSearch = require("../service/book-search-service");

function index(req, res, next) {
    var isbn = req.params.isbn;

    bookSearch.findByIsbn2(isbn, function (err, book) {
        if (err) {
            return next(err);
        }
        res.render('pages/book-information', {book: book});
    });
}

module.exports = {
    index: index
};