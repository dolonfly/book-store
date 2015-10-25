"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connection = require('./mongo').defaultConnection();

var BookSchema = new Schema({
    title: String,//图书名称
    originTitle: String,//对应豆瓣上的 origin_title=原作名
    subTitle: String,//子标题
    isbn10: String,//isbn
    isbn13: {type: String, index: {unique: true}},//isbn
    author: [],//作者
    translator: [],//译者
    authorIntro: String,//作者简介
    publishTime: String,//出版时间
    publisher: String,//出版社
    pages: Number,//页码
    price: String,//定价
    binding: String,//装帧
    series: {},//丛书
    rating: {},//评价
    tags: Schema.Types.Mixed,//标签  [{"count":4801,"name":"青山七惠","title":"青山七惠"},{"count":2757,"name":"日本文学","title":"日本文学"},{"count":1849,"name":"日本","title":"日本"},{"count":1429,"name":"小说","title":"小说"},{"count":1048,"name":"温柔的叹息","title":"温柔的叹息"},{"count":343,"name":"外国文学","title":"外国文学"},{"count":240,"name":"文学","title":"文学"},{"count":174,"name":"日@青山七惠","title":"日@青山七惠"}]
    image: String,//图片url
    catalog: String,//目录
    summary: String,//内容简介
    doubanId: String,//对应的豆瓣图书Id
    ebookPrice: String,//ebook的价格
    ebookUrl: String,//ebook 的url
    category: String,
    source: String//图书来源网站：douban、dangdang...
}, {
    collection: 'books'
});

var Book = connection.model('Book', BookSchema);

module.exports = Book;