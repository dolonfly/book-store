"use strict"

var fs = require('fs');
var exist = fs.existsSync('../../config.json');
var CONFIG;
if (exist) {
    CONFIG = require("../../config.json");
}

function getApikey(platform) {
    if (CONFIG) {
        return CONFIG["apiKey_" + platform];
    }
    return null;
}

module.exports = {
    getApiKey: getApikey
}
