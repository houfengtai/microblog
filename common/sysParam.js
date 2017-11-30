/**
 * 常量配置类
 * Created by hou on 2017/8/18.
 */
var path = require("path");
var sysParam = {};

sysParam.USERS = "users";//用户表
sysParam.ARTICLES = "articles";//文章表
sysParam.PHOTO_URL = path.join(__dirname, '../public/20170815/');

module.exports = sysParam;