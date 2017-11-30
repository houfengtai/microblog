/**
 * 用户登录类
 * Created by hou on 2017/8/25.
 */
const crypto = require('crypto');
const baseService = require("../service/baseService.js");
const sysParam = require("../common/sysParam.js");
module.exports = {
    /**
     *登录跳转方法
     * @param req
     * @param res
     */
    loginPage : function(req, res){
        res.render('login', {
            title: '登录',
            error: req.flash('error').toString()
            }
        );
    },
    /**
     *登录校验方法
     * @param req
     * @param res
     */
    login : function(req, res){
        var userName = req.body.userName;
        var password = req.body.password;
        //密码加密：md5
        var md5 = crypto.createHash('md5'),password = md5.update(req.body.userName+req.body.password).digest('hex');
        baseService.findOne(sysParam.USERS,{userName:userName},function (err,doc) {
            console.log(JSON.stringify(doc));
            if(doc==null||doc==""||doc==undefined){
                req.flash("error","用户不存在！");
                return res.redirect('/login.html');//返回登录页
            };
            if(password != doc.password){
                req.flash("error","密码不正确！");
                return res.redirect('/login.html');//返回登录页
            };
            req.session.user = doc;
            req.flash('success', '登陆成功!');
            res.redirect('/');//登陆成功后跳转到主页

        });
    },
    /**
     *注册页面跳转方法
     * @param req
     * @param res
     */
    regPage: function(req , res){
        res.render('register', { title: '注册',error: req.flash('error').toString() });
    },

    /**
     *注册方法
     * @param req
     * @param res
     */
    reg: function(req, res){
        var bs = new baseService();
        var username = req.body.userName;
        var password = req.body.password;
        var password_re = req.body['password-repeat'];
        var email = req.body.email;

        //判断2次输入的密码是否一致
        if(password_re != password){
            req.flash('error','两次输入的密码不一致！');
            return res.redirect('/reg.html');//返回注册页
        };
        //密码加密：md5
        var md5 = crypto.createHash('md5'),password = md5.update(req.body.userName+req.body.password).digest('hex');
        /*var newUser = new User({
         userName: username,
         password: password,
         email: email
         });*/
        var user = {userName: username, password: password,email: email};
        baseService.findOne(sysParam.USERS,{userName:username},function (err,doc) {
            if(err){
                req.flash('error',err);
                return res.redirect('/');
            };
            if(doc){
                req.flash('error','用户已存在！');
                return res.redirect('/reg.html');//返回注册页
            };
            //如果不存在则新增用户
            bs.insert(sysParam.USERS,user,function(err,data){
                if(err){
                    req.flash('error',err);
                    return res.redirect('/reg.html');//注册失败返回注册页面
                };
                console.log("返回数据："+JSON.stringify(data));
                req.session.user =data.ops[0];
                req.flash('success', '注册成功!');
                res.redirect('/');//注册成功后返回主页
            })
        })
    },
    /**
     * 退出登录
     * @param req
     * @param res
     */
    loginout : function (req, res) {
        req.session.user = null;
        req.flash('success', '退出成功!');
        res.redirect('/');//登出成功后跳转到主页
    },
    /**
     * 判断是否已登录
     * @param req
     * @param res
     * @param next function
     */
    checkLogin : function (req , res , next) {
        console.log("user="+(!req.session.user));
        if(!req.session.user){
            req.flash('error', '未登录!');
            res.redirect('/login.html');
        }else{
            next();
        }

    },
    /**
     * 判断是否已登录
     * @param req
     * @param res
     * @param next function
     */
    checkNotLogin : function (req , res , next) {
        if (req.session.user) {
            req.flash('error', '已登录!');
            res.redirect('back');//返回之前的页面
        }else{
            next();
        }

    }


}