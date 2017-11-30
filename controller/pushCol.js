/**
 * 文章发布类
 * Created by hou on 2017/8/31.
 */
const baseService = require("../service/baseService.js");
const sysParam = require("../common/sysParam.js");
module.exports = {
    /**
     *文章发布页面跳转方法
     * @param req
     * @param res
     */
    pushPage: function (req , res) {
        res.render('push_article', { title: '发表', error: req.flash('error').toString()});
    },

    /**
     *文章发布方法
     * @param req
     * @param res
     */
    push : function (req, res) {
        var bs = new baseService();
        var currentUser = req.session.user;
        var date = new Date();
        //存储各种时间格式，方便以后扩展
        var time = {
            date : date,
            year : date.getFullYear(),
            month : date.getFullYear() + "-" + (date.getMonth() + 1),
            day : date.getFullYear() + "-" + (date.getMonth() + 1) + date.getDate(),
            minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
            date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
        };
        var article = {
            userName : currentUser.userName,
            title : req.body.title,
            content : req.body.content,
            time : time
        };
        bs.insert(sysParam.ARTICLES,article,function(err,doc){
            if(err){
                req.flash('error',err);
                return res.redirect('/push.html');//提示错误信息
            };
            req.flash('success','发布成功！');
            res.redirect('/');//发表成功跳转到主页
        });

    },

    /**
     *文章修改跳转方法
     * @param req
     * @param res
     */
    editPage : function (req, res) {
        var _id = req.param("objId");
        console.log(_id);
        baseService.findOneById(sysParam.ARTICLES,_id,function(err,doc){
            if(err){
                doc = null;
            };
            console.log(JSON.stringify(doc));
            res.render("edit_article",{article:doc});
        })

    },
    /**
     *文章修改方法
     * @param req
     * @param res
     */
    edit : function (req, res) {
        var bs = new baseService();
        var _id = req.body._id;
        console.log(_id);
        var date = new Date();
        //存储各种时间格式，方便以后扩展
        var time = {
            date : date,
            year : date.getFullYear(),
            month : date.getFullYear() + "-" + (date.getMonth() + 1),
            day : date.getFullYear() + "-" + (date.getMonth() + 1) + date.getDate(),
            minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
            date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
        };
        var data = {$set:{content : req.body.content, time : time}};
        bs.updateById(sysParam.ARTICLES,_id,data,function (err) {
           if(err){
              return  res.render("error");
           };
            res.redirect("/");
        })

    },
    /**
     *文章删除方法
     * @param req
     * @param res
     */
    del : function (req, res) {
        var bs = new baseService();
        var _id = req.param("objId");
        console.log("id="+_id)
        bs.removeById(sysParam.ARTICLES,_id,function (err) {
            if(err){
                return  res.render("error",{message :err});
            };
            res.redirect("/");
        })

    },
}