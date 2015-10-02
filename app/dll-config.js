"use strict";

var perrier = require('perrier');
var _ = require("lodash");
var path = require("path");

function initDllConfig(opts) {
    var dllConfig = {};
    var config = perrier.create({
        rootPath: opts.rootPath,
        globalFields: {
            NODE_ENV: opts.env,
            ROOT_DIR: path.join(opts.rootPath, "..")
        },
        monitor: function (err, fileName) {
            if (err) {
                throw new Error("can not load config file " + fileName, err);
            }
            console.log("load config successfully: " + fileName);
        }
    });
    config.merge(
        'base.json',
        opts.env + '.json'
    );
    _.assign(dllConfig, config);
    return dllConfig;
}

var config = initDllConfig({
    rootPath: path.join(__dirname, "..", 'config'),
    env: process.env.NODE_ENV || 'dev'
});

module.exports = config;