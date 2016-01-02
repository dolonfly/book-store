/**
 * Created by dll on 16/1/2.
 */

function index(req, res, next) {
    res.render('pages/index');
}

module.exports = {
    index: index
};