/**
 * Created by dll on 15/10/11.
 */

"use strict"

var request = require("request");
var iconv = require('iconv-lite');
var JSON5 = require('json5');
var app_config = require('../utils/app-config');

/**
 * 根据图书的isbn号码获取图书信息
 * @param isbn
 * @param callback
 */
function generateBook(isbn, callback) {
    var api_key = app_config.getApiKey('douban');
    var api_param = "";
    if (api_key) {
        api_param = "?apikey=" + api_key;
    }
    var options = {
        url: 'https://api.douban.com/v2/book/isbn/' + isbn + api_param,
        encoding: null,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36',
            'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
        }
    };
    request(options, function (err, res) {
            if (err) return callack(err);

            var html = iconv.decode(res.body, "utf-8");

            var json5 = JSON5.parse(html);

            if (json5.msg) return callback(json5.msg);

            var item = {
                title: json5.title,//图书名称
                originTitle: json5.origin_title,//对应豆瓣上的 origin_title=原作名
                subTitle: json5.subtitle,//子标题
                isbn10: json5.isbn10,//isbn
                isbn13: json5.isbn13,//isbn
                author: json5.author,//作者
                translator: json5.translator,//译者
                authorIntro: json5.author_intro,//作者简介
                publishTime: json5.pubdate,//出版时间
                publisher: json5.publisher,//出版社
                pages: json5.pages,//页码
                price: json5.price,//定价
                binding: json5.binding,//装帧
                series: json5.series,//丛书
                rating: json5.rating,//评价
                tags: json5.tags,//标签  [{"count":4801,"name":"青山七惠","title":"青山七惠"},{"count":2757,"name":"日本文学","title":"日本文学"},{"count":1849,"name":"日本","title":"日本"},{"count":1429,"name":"小说","title":"小说"},{"count":1048,"name":"温柔的叹息","title":"温柔的叹息"},{"count":343,"name":"外国文学","title":"外国文学"},{"count":240,"name":"文学","title":"文学"},{"count":174,"name":"日@青山七惠","title":"日@青山七惠"}]
                image: json5.image,//图片url
                catalog: json5.catalog,//目录
                summary: json5.summary,//内容简介
                doubanId: json5.id,//对应的豆瓣图书Id
                ebookPrice: json5.ebook_price,//ebook的价格
                ebookUrl: json5.ebook_url,//ebook 的url
                category: null,
                source: 'douban'
            };
            callback(null, item);
        }
    );
}


module.exports = {
    generateBook: generateBook
};

