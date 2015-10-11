/**
 * Created by dll on 15/10/11.
 */

var bookSearch = require("../service/book-search-service");

function search(req, res, next) {
    var isbn = req.query.isbn;
    if (!isbn) {
        res.status(400).send({
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
            res.json(data);
        }
    });
}

module.exports = {
    search: search
}
