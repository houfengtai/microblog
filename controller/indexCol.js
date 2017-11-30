/**
 * 首页跳转类
 * Created by hou on 2017/8/31.
 */
const baseService = require("../service/baseService.js");
const sysParam = require("../common/sysParam.js");

module.exports = {
	/**
     *首页跳转方法
     * @param req
     * @param res
     */
    index : function(req , res){
        baseService.findArrayLimit(sysParam.ARTICLES,null,null,null,1,10,function(err,articles,total){
            console.log('err => ' + err);
            console.log('articles => ' + articles);
            console.log('total => ' + total);
            //Article.get(null,function(err,articles){
            if(err){
                articles = [];
            }

            baseService.count(sysParam.USERS,null,function(err,num){
                console.log(num);
                res.render('index', { title: '主页' ,
                    user: req.session.user,
                    articles : articles,
                    count:num,
                    success: req.flash('success').toString(),
                    error: req.flash('error').toString()
                });
            });


        });
    }
}