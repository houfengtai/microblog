# NodeJs+Express+MongoDb最新教程（入门到精通）
## NodeJs 零基础快速搭建一个microblog

### 前言
初学NodeJs时曾在网上看过不少NodeJs的书籍以及项目实战，无奈NodeJs更新太快变化太大了，网上很多书籍以及项目教程所涉及的代码已不适用，要么就是结构混乱，让初学者苦不堪言（ps：自己动手过，遇到了坑，才会让自己成长）；本文旨在让初学者有个大概了解，能够快速入门上手，从零开始到搭建项目架构（MVC模式）和数据库，并测试通过CRUD等数据库操作。
此项目功能比较简单：只有登录、注册、退出、发表文章、修改文章、删除文章、上传图片这些功能。
####  
__注：此项目为入门级别，大神可以飘过，有不足之处请多多指教__

#### 技术栈
NodeJs8.9.1 + Express4.15.5 + MongoDB3.2

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

### 学前准备（安装环境）本教程所使用系统为win10

1、安装NodeJs
到官网https://nodejs.org/en/download
下载最新版本，已安装的不是最新版的请按自己系统自行百度教程升级最新版本<br/>
查看是否安装成功：打开控制台输入
```
node -v
```
出现版本号即表示安装成功，最新版本是不需要配置环境变量的，安装时会自动配置好的<br />

2、安装Express（这是目前nodeJs唯一官方认证框架，类似于Struts、spring等，通常用于web后端开发）
```
npm install -g express-generator
npm install -g express
express -V
```
__note:__
其中 -g 代表全局安装，这样的话以后可以在任意目录下使用express命令创建项目 -V是大写的，用来查看当前安装的版本号<br />
3、创建项目（体验效果）<br />
1）去到指定目录下
```
cd d:\\workspace
```
2)使用express命令创建express项目
```
express microblog
```
3)进入项目根目录，安装项目依赖包
```
cd ./microblog
npm install
```
4)启动项目:启动方法有多种，项目后期有额外拓展
```
npm start
```
5）浏览器查看项目效果：http://127.0.0.1:3000
然后你会看到:express的欢迎信息
__然后开始我们的express之旅吧__

### 开始开发


