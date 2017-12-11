# NodeJs+Express+MongoDb全新教程（零基础入门到精通）
## NodeJs 零基础快速搭建一个microblog网站项目

### 前言
初学NodeJs时曾在网上看过不少NodeJs的书籍以及项目实战，无奈NodeJs更新太快变化太大了，网上很多书籍以及项目教程所涉及的代码已不适用，要么就是结构混乱，让初学者苦不堪言（ps：自己动手过，遇到了坑，才会让自己成长）；本文旨在让初学者有个大概了解，能够快速入门上手，从零开始到搭建项目架构（MVC模式）和数据库，并测试通过CRUD等数据库操作。
此项目功能比较简单：只有登录、注册、退出、发表文章、修改文章、删除文章、上传图片这些功能。
<br />
__注：此项目为入门级别，大神可以飘过，有不足之处请多多指教__
<br /><br />
项目源码地址： https://github.com/houfengtai/microblog.git
<br />参考于[使用 Express + MongoDB 搭建多人博客](http://wiki.jikexueyuan.com/project/express-mongodb-setup-blog)
<br />
#### 技术栈
NodeJs8.9.1 + Express4.15.5 + MongoDB3.4

#### 项目运行
##### 注意：由于使用到数据库，请先预装好MongoDB,以及Node环境,项目链接数据库配置文件为setting.js,修改为安装数据库时的电脑IP
```
git clone https://github.com/houfengtai/microblog.git
cd microblog
npm install
node ./bin/www

```
##### 另外
本项目非使用到前端框架，后期会把该项目写成纯API框架形式，前端会使用VUE2.x或angularjs等编写前端项目用来前后台对接，以达到前后端分离效果。

### 本项目完整教程已写到《Node.js项目实战(零基础入门到精通).pdf》中，欢迎下载查阅！

### 高手进阶
在上面我们开发了一个简单的microblog，对于真正的项目来说是非常简陋的，使用的技术也不多，项目结构也是混乱不堪。接下来，开始讲解一下如何对项目进行架构封装，使开发变得更加有条理，结构更加明了，代码简洁。这个就留到下一章《程序员的架构之路》。

```javascript
var crypto = require('crypto'),User = require('../models/user.js'),Article = require('../models/article.js');

module.exports = function(app) {
    /**
     * 主页
     */
    app.get('/', function (req, res) {
        Article.get(null,function(err,articles){
            if(err){
                articles = [];
            }
            res.render('index', { title: '主页',
                user:req.session.user,
                articles:articles,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        })
    });

    /**
     * 登录跳转页面
     */
    app.get('/login.html', checkNotLogin);
    app.get('/login.html', function (req, res) {
        res.render('login', { title: '登录',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    /**
     * 登录方法
     */
    app.post('/login.do', checkNotLogin);
    app.post('/login.do', function (req, res) {
        //生成密码的 md5 值
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');
        //检查用户是否存在
        User.get(req.body.userName, function (err, user) {
            if (!user) {
                req.flash('error', '用户不存在!');
                return res.redirect('/login.html');//用户不存在则跳转到登录页
            }
            //检查密码是否一致
            if (user.password != password) {
                req.flash('error', '密码错误!');
                return res.redirect('/login.html');//密码错误则跳转到登录页
            }
            //用户名密码都匹配后，将用户信息存入 session
            req.session.user = user;
            req.flash('success', '登陆成功!');
            res.redirect('/');//登陆成功后跳转到主页
        });
    });

    /**
     * 注册跳转页面
     */
    app.get('/reg.html', checkNotLogin);
    app.get('/reg.html', function (req, res) {
        res.render('register', { title: '注册',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    /**
     * 注册方法
     */
    app.post('/reg.do', checkNotLogin);
    app.post('/reg.do', function (req, res) {
        var name = req.body.userName,
            password = req.body.password,
            password_re = req.body['password-repeat'];
        //检验用户两次输入的密码是否一致
        if (password_re != password) {
            req.flash('error', '两次输入的密码不一致!');
            return res.redirect('/reg.html');//返回注册页
        }
        //生成密码的 md5 值
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');
        var newUser = new User({
            userName: name,
            password: password,
            email: req.body.email
        });
        //检查用户名是否已经存在
        User.get(newUser.userName, function (err, user) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            if (user) {
                req.flash('error', '用户已存在!');
                return res.redirect('/reg.html');//返回注册页
            }
            //如果不存在则新增用户
            newUser.save(function (err, user) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('/reg.html');//注册失败返回主册页
                }
                req.session.user = user;//用户信息存入 session
                req.flash('success', '注册成功!');
                res.redirect('/');//注册成功后返回主页
            });
        });
    });

    /**
     * 文章发表跳转页面
     */
    app.get('/push.html', checkLogin);
    app.get('/push.html', function (req, res) {
        res.render('push_article', { title: '发表' });
    });

    /**
     * 文章发表方法
     */
    app.post('/push.do', checkLogin);
    app.post('/push.do', function (req, res) {
        var currentUser = req.session.user,
            post = new Article(currentUser.userName, req.body.title, req.body.content);
        post.save(function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            req.flash('success', '发布成功!');
            res.redirect('/');//发表成功跳转到主页
        });
    });

    /**
     * 文章编辑跳转页面
     */
    app.get('/edit/article.html',checkLogin);
    app.get('/edit/article.html',function(req, res){
        var _id = req.param("objId");
        Article.findById(_id,function(err,doc){
            if(err){
                doc = null;
            };
            console.log(JSON.stringify(doc));
            res.render("edit_article",{article:doc});
        })
    });

    /**
     * 文章编辑功能
     */
    app.post('/edit/article.do',checkLogin);
    app.post('/edit/article.do', function(req,res){
        Article.update(req,res,function(err){
            if(err){
                return  res.render("error");
            };
            req.flash('success', '修改成功!');
            res.redirect("/");
        })
    });

    /**
     * 文章删除功能
     */
    app.get('/del/article.html',checkLogin);
    app.get('/del/article.html',function(req,res){
        var _id = req.param("objId");
        Article.removeById(_id,function(err){
            if(err){
                return  res.render("error",{message :err});
            };
            req.flash('success', '删除成功!');
            res.redirect("/");
        })
    });

    /**
     * 退出登录方法
     */
    app.get('/loginout', checkLogin);
    app.get('/loginout', function (req, res) {
        req.session.user = null;
        req.flash('success', '退出成功!');
        res.redirect('/');//退出成功跳转到主页
    });

    function checkLogin(req, res, next) {
        if (!req.session.user) {
            req.flash('error', '未登录!');
            res.redirect('/login.html');
        } else{
            next();
        }
    }

    function checkNotLogin(req, res, next) {
        if (req.session.user) {
            req.flash('error', '已登录!');
            res.redirect('back');//返回之前的页面
        } else{
            next();
        }
    }
};
```
