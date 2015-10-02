"use strict";

var mongoose = require('mongoose');
var dbConfig = require('../book-library-config').db;

var DEFAULT_CONNECTION = mongoose.createConnection(dbConfig.uri, dbConfig.options);

function defaultConnection() {
    return DEFAULT_CONNECTION;
};


module.exports = {
    defaultConnection: defaultConnection,
    init: function (dbConfig) {
        //Enyu : this method only for enjoy if you know me...
    }
};