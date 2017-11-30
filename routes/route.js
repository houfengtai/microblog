/**
 * 路由配置类
 * Created by hou on 2017/7/15.
 */

var loginController= require("../controller/loginCol.js"),
    uploadController= require("../controller/uploadCol.js"),
    pushController= require("../controller/pushCol.js"),
    indexController= require("../controller/indexCol.js");
var multer=require('multer');
var upload = multer();

module.exports = function(app){
	/**
	 * 主页
	 */
	app.get('/', indexController.index);
    app.get('/index.html', indexController.index);

	/**
	 * 登录页面跳转路径
	 */
	app.get('/login.html',loginController.checkNotLogin);
	app.get('/login.html',loginController.loginPage);
	
	/**
	 * 登录路径
	 */
	app.post('/login.do',loginController.checkNotLogin);
	app.post('/login.do', loginController.login);

    /**
     * 用户注册跳转路径
     */
	app.get('/reg.html',loginController.checkNotLogin);
	app.get('/reg.html', loginController.regPage);
	
	/**
	 * 用户注册路径
	 */
	app.post('/reg.do',loginController.checkNotLogin);
	app.post('/reg.do', loginController.reg);

    /**
     * 退出系统
     */
    app.get('/logout',loginController.checkLogin);
    app.get('/logout', loginController.loginout);

    /**
	 * 文章发布路径
     */
	app.get('/push.html',loginController.checkLogin);
	app.get('/push.html',pushController.pushPage);

	app.post('/push.do',loginController.checkLogin);
	app.post('/push.do', pushController.push);

    app.get('/edit/article.html',loginController.checkLogin);
    app.get('/edit/article.html',pushController.editPage);

    app.post('/edit/article.do',loginController.checkLogin);
    app.post('/edit/article.do', pushController.edit);

    app.get('/del/article.html',loginController.checkLogin);
    app.get('/del/article.html',pushController.del);

	// 单图上传
	app.post('/upload.do', upload.single('logo'),uploadController.upload);
	app.get('/upload.html',uploadController.uploadPage);

};
