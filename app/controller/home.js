/**
 * Created by dll on 16/1/2.
 */

function index(req, res, next) {
    res.render('pages/book-information');
}

module.exports = {
    index: index
};