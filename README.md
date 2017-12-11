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
const indexController = require("../controller/indexController.js");
const loginController = require("../controller/loginController.js");
const regController = require("../controller/regController.js");
const articleController = require("../controller/articleController.js");

module.exports = function(app) {
    /**
     * 主页
     */
    app.get('/', indexController.indexPage);

    /**
     * 登录跳转页面
     */
    app.get('/login.html', checkNotLogin);
    app.get('/login.html', loginController.loginPage);

    /**
     * 登录方法
     */
    app.post('/login.do', checkNotLogin);
    app.post('/login.do',loginController.login);

    /**
     * 注册跳转页面
     */
    app.get('/reg.html', checkNotLogin);
    app.get('/reg.html',regController.regPage);

    /**
     * 注册方法
     */
    app.post('/reg.do', checkNotLogin);
    app.post('/reg.do', regController.reg);

    /**
     * 文章发表跳转页面
     */
    app.get('/push.html', checkLogin);
    app.get('/push.html',articleController.pushPage);

    /**
     * 文章发表方法
     */
    app.post('/push.do', checkLogin);
    app.post('/push.do',articleController.push);

    /**
     * 文章编辑跳转页面
     */
    app.get('/edit/article.html',checkLogin);
    app.get('/edit/article.html',articleController.editPage);

    /**
     * 文章编辑功能
     */
    app.post('/edit/article.do',checkLogin);
    app.post('/edit/article.do',articleController.edit);

    /**
     * 文章删除功能
     */
    app.get('/del/article.html',checkLogin);
    app.get('/del/article.html',articleController.del);

    /**
     * 退出登录方法
     */
    app.get('/loginout', checkLogin);
    app.get('/loginout', loginController.loginout);

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
