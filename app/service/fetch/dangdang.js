"use strict"

var request = require("request");
var iconv = require('iconv-lite');
var JSON5 = require('json5');
var cheerio = require('cheerio');
var isbnSuite = require('../../utils/isbnSuite');
var async = require('async');

/**
 * 根据图书的isbn号码获取图书信息
 * @param isbn
 * @param callback
 */
function generateBook(isbn, callback) {
    async.waterfall([
        function (callback) {
            requestBookId(isbn, callback);
        },
        function (params, callback) {
            requestBookInfo(params, callback);
        }
    ], function (err, result) {
        callback(err, result);
    });

}

function requestBookId(isbn, callback) {
    var options = {
        url: 'http://search.dangdang.com/?medium=01&key4=' + isbn + '&category_path=01.00.00.00.00.00&filter=0%7C0%7C0%7C0%7C0%7C1%7C0%7C0%7C0%7C0%7C',
        encoding: null,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36',
            'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
        }
    };
    request(options, function (err, res) {
            if (err) return callback(err);

            var html = iconv.decode(res.body, "utf-8");

            // 根据网页内容创建DOM操作对象
            var $ = cheerio.load(html);
            var bookId, imgUrl;

            $('div[class="con shoplist"] ul li:first-child').each(function () {
                var $me = $(this);
                bookId = $me.attr('id').replace('p', '');
                imgUrl = $me.find('>a>img').attr('src');
            });
            callback(null, {bookId: bookId, imgUrl: imgUrl});
        }
    );
}

function requestBookInfo(params, callback) {
    if (!params || !params.bookId)
        return callback({"msg": "bookId is not exist"});
    var bookId = params.bookId;
    var imgUrl = params.imgUrl;
    var options = {
        url: 'http://product.m.dangdang.com/detail' + bookId + '-0-1.html',
        encoding: null,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36',
            'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
        }
    };
    request(options, function (err, res) {
        if (err) return callback(err);

        var html = iconv.decode(res.body, "utf-8");

        // 根据网页内容创建DOM操作对象
        var $ = cheerio.load(html);
        var summary = $('section[data-content-name="简介"]').text();
        var catalog = ($('section[data-content-name="目录"]').html() + '').replace('null','').replace(/<br>/g, '\r\n');

        var title,
            isbn10,
            isbn13,
            author,
            translator,
            publishTime,
            publisher,
            pages,
            price,
            binding,
            series,
            rating,
            tags,
            image,
            source = 'dangdang';

        $('ul[class=detail_list] li dl').each(function () {
            var $me = $(this);
            var dt = $me.find('dt').text().trim();
            var dd = $me.find('dd').text().trim();

            switch (dt) {
                case '书名':
                    title = dd;
                    break;
                case 'ISBN':
                    isbn13 = dd;
                    if (isbn13.length == 10) {
                        isbn13 = isbnSuite.convert.isbn10to13(isbn13);
                    }
                    break;
                case '作者':
                    author = dd;
                    break;
                case '出版社':
                    publisher = dd;
                    break;
                case '出版时间':
                    publishTime = dd;
                    break;
                case '版次':
                    break;
                case '印次':
                    break;
                case '页数':
                    break;
                case '开本':
                    break;
                case '纸张':
                    break;
                case '包装':
                    binding = dd;
                    break;

            }
        });
        var item = {
            title: title,//图书名称
            isbn10: isbn10,//isbn
            isbn13: isbn13,//isbn
            author: author,//作者
            translator: translator,//译者
            publishTime: publishTime,//出版时间
            publisher: publisher,//出版社
            pages: pages,//页码
            price: price,//定价
            binding: binding,//装帧
            image: imgUrl,//图片url
            catalog: catalog,//目录
            summary: summary,//内容简介
            source: source
        };

        callback(null, item);
    });
}


module.exports = {
    generateBook: generateBook
}
