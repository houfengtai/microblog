# NodeJs+Express+MongoDb最新教程（零基础入门到精通）
## NodeJs 零基础快速搭建一个microblog网站项目

### 前言
初学NodeJs时曾在网上看过不少NodeJs的书籍以及项目实战，无奈NodeJs更新太快变化太大了，网上很多书籍以及项目教程所涉及的代码已不适用，要么就是结构混乱，让初学者苦不堪言（ps：自己动手过，遇到了坑，才会让自己成长）；本文旨在让初学者有个大概了解，能够快速入门上手，从零开始到搭建项目架构（MVC模式）和数据库，并测试通过CRUD等数据库操作。
此项目功能比较简单：只有登录、注册、退出、发表文章、修改文章、删除文章、上传图片这些功能。
<br />
__注：此项目为入门级别，大神可以飘过，有不足之处请多多指教__
<br /><br />参考于[使用 Express + MongoDB 搭建多人博客](http://wiki.jikexueyuan.com/project/express-mongodb-setup-blog)
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

### 学前准备（安装环境）本教程所使用系统为win10

1、安装NodeJs<br />
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
然后你会看到:express的欢迎信息。然后开始我们的express之旅吧！
<img src="https://raw.githubusercontent.com/houfengtai/microblog/master/demoImg/welcom.png" />

#### 开始开发

刚刚已经创建了一个最基础化的express项目了，接下来就开始着手开发了，首先进入到项目所在目录查看整个项目结构。

<img src="https://raw.githubusercontent.com/houfengtai/microblog/master/demoImg/prolist.png" />

##### 开发前准备

1、开发工具
开发工具有：IntelliJ IDEA 2017.2.5 、JetBrains WebStorm 2017.2.5、eclipse等等<br />

本文使用IntelliJ IDEA 2017.2.5,至于为什么选用这个，主要是因为IDEA很好兼容NodeJs插件,js各种提示都很到位。WebStorm看名字就知道跟IDEA是同一个公司的，兼容性一样好,
eclipse开发NodeJs稍微差一些,很多js提示不到位,使用ES6写的代码提示报错。<br />

IDEA下载官网：https://www.jetbrains.com/idea/download

安装：按照步骤自行安装。安装完成之后先别打开，IDEA是需要依赖JDK的，所以先安装JDK1.8。<br />

JDK下载地址:http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

选择对应系统的版本安装<br />

配置环境变量:自行百度对应系统JDK环境变量配置<br />

IDEA是需要钱的，这个对于我们来说是没有一点技术含量的，百度一个秘钥就可以破解了。

2、数据库<br />
数据库有：<br />
	关系型数据库：Oracle、DB2、SQL server、Mysql等等<br />
	非关系型数据库：MongoDB、HBase、Redis等等<br />

本文使用MongoDB,mongo是面向文档的数据库，存储数据格式为BSON,与NodeJs操作的JSON最为衔接，效率也是最快的。

安装方法（有多种环境安装，自行选择一个吧）：<br />
1、Docker上安装（docker是什么？这个不详说了，适用于高级人群，不适合初学者）:<br />

查找Docker Hub上的mongo镜像
```
docker search mongo
```

拉取官方镜像（本文使用mongo3.4版本）

```
docker pull mongo:3.4
```
	
使用mongo镜像
```
docker run -p 27017:27017 -e $PWD/db:/data/db -d mongo:3.4
```

命令说明：<br />
-p 27017:27017 :将容器的27017 端口映射到主机的27017 端口<br />
-e $PWD/db:/data/db :将主机中当前目录下的db挂载到容器的/data/db，作为mongo数据存储目录<br />

查看容器启动情况
```
docker ps
```

使用mongo镜像执行mongo 命令连接到刚启动的容器,主机IP为172.17.0.1（IP设为本机IP）
```
winpty docker exec -it mongodb bash
mongo --host 172.17.0.1
```
查看mongodb是否能连接上<br />

浏览器访问:http://172.17.0.1:27017
提示：<br />
It looks like you are trying to access MongoDB over HTTP on the native driver port.
<br />表示安装成功<br />

2、Vmware上Linux CentOS 6.7环境安装（推荐使用）：<br />

Vm虚拟机自行安装Linux CentOS 6.7 ，本文就不详说了。（注：Docker与Vm是有冲突的，只能启动其一）<br />

Linux 超级管理员（root）登陆情况下,打开控制台（初学者使用桌面，高级点的使用Xshelll链接）<br />

下载mongodb
```
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-amazon-3.4.6.tgz
```

解压文件
```
tar zxvf mongodb-linux-x86_64-amazon-3.4.6.tgz
```

把解压后文件移动到 /usr/local/mongodb目录下
```
mv mongodb-linux-x86_64-amazon-3.4.6 /usr/local/mongodb
```
如果mongodb目录不存在则先创建

```
cd /usr/local/
mkdir mongodb
cd
mv mongodb-linux-x86_64-amazon-3.4.6 /usr/local/mongodb
```
进入/usr/local/mongodb目录
```
cd /usr/local/mongodb
```
创建data目录
```
mkdir data
cd ./data
```
在data目录下创建db与logs文件夹
```
mkdir db
mkdir logs
```
在data目录下创建mongodb.conf文件
```
vi mongodb.conf
```
添加以下内容
```
#数据目录
dbpath = /usr/local/mongodb/data/db

#日志目录
logpath = /usr/local/mongodb/data/logs/mongodb.log

#设置后台运行
fork = true

#日志输出方式
logappend = true

#开启认证
#auth = true
```
按左上角Esc键<br />
再按Shift + ：冒号键后输入wq保存退出（更多Linux命令自行百度学习）<br />

更新配置文件
```
cd /usr/local/mongodb
./bin/mongod --config /usr/local/mongodb/data/mongodb.conf
```

启动mongodb
```
./bin/mongo
```
修改防火墙开放端口
```
cd /etc/sysconfig
vi iptables

i
```
22端口下添加一行27017端口
按左上角Esc键<br />
再按Shift + ：冒号键后输入wq保存退出（更多Linux命令自行百度学习）<br />

查看Linux本机IP
```
ifconfg
```
浏览器访问:http://本机IP:27017
提示：<br />
It looks like you are trying to access MongoDB over HTTP on the native driver port.
<br />表示安装成功<br />

__拓展:__
关闭mongodb 
```
cd
pkill mongod
```
3、当然还有在本机安装（不建议）：按不同系统自行百度吧！<br />
##### 正式开发
经过上面的努力，所有的环境都已安装就绪，下面我们就开始来正式写代码了，想想都有点小激动吧！<br />
NodeJs API:https://nodejs.org/dist/latest-v8.x/docs/api/
<br />
NodeJs API（中文）:http://nodejs.cn/api/
<br />
Express API:http://www.nodeclass.com/api/express4.html
<br />
Express API（中文）:http://www.expressjs.com.cn/4x/api.html
<br />
打开我们的IDEA工具（需要了解更多的IDEA工具使用方法请自行百度）<br />
点击左上角File-->Open… -->选择刚才创建的microblog项目

<img src="https://raw.githubusercontent.com/houfengtai/microblog/master/demoImg/open.png" />

看一下我们刚才创建的项目总体结构<br />

<img src="https://raw.githubusercontent.com/houfengtai/microblog/master/demoImg/prolist1.png" />

app.js：启动文件，或者说入口文件 <br />
package.json：存储着工程的信息及模块依赖<br />
当在 dependencies 中添加依赖的模块时，运行 npm install，npm 会检查当前目录下的 package.json，并自动安装所有指定的模块 node_modules：存放 package.json 中安装的模块，
当你在 package.json 添加依赖的模块并安装后，存放在这个文件夹下<br />
public：存放 image、css、js 等文件 <br />
routes：存放路由文件 <br />
views：存放视图文件或者说模版文件<br />
bin：存放可执行文件<br />
<br />
打开app.js,让我们看看里面究竟有什么:
```javascript
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

```
这里我们通过require()加载了express、path 等模块,以及 routes 文件夹下的index. js和 users.js 路由文件。 下面来讲解每行代码的含义。<br />

```javascript
var app = express()
```
生成一个express实例 app。<br/>

```javascript
app.set('views', path.join(__dirname, 'views'))
```
设置 views 文件夹为存放视图文件的目录, 即存放模板文件的地方,dirname 为全局变量,存储当前正在执行的脚本所在的目录
```javascript
app.set('view engine', 'jade')
```
设置视图模板引擎为 jade

```javascript
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
```
设置/public/favicon.ico为favicon图标

```javascript
app.use(logger('dev'))
```
加载日志中间件
```javascript
app.use(bodyParser.json())
```
加载解析json的中间件
```javascript
app.use(bodyParser.urlencoded({ extended: false }))
```
加载解析urlencoded请求体的中间件
```javascript
app.use(cookieParser())
```
加载解析cookie的中间件
```javascript
app.use(express.static(path.join(__dirname, 'public')))
```
设置public文件夹为存放静态文件的目录

```javascript
app.use('/', index);
app.use('/users', users);
```
路由控制器
```javascript
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
```
捕获404错误，并转发到错误处理器
```javascript
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
```
开发环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中
```javascript
module.exports = app
```
导出app实例供其他模块调用

<br />

再看看./bin/www 文件（启动文件几乎是不需要改动的）：

```javascript
#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('microblog:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
```
根据Express版本的迭代更新，很多由express集成的模块功能又独立出去了。旧版本的创建服务器功能已移植到http模块上了。
```javascript
#!/usr/bin/env node
```
表明是node可执行文件
```javascript
var app = require('../app');
var debug = require('debug')('microblog:server');
var http = require('http');
```
引入模块依赖
```javascript
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
```
设置端口号
```javascript
var server = http.createServer(app);
```
创建HTTP服务器
```javascript
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
```
在所有网络接口上监听所提供的端口<br />

再看一下./routes/index.js文件：<br />
```javascript
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```

生成一个路由实例用来捕获访问主页的GET请求，导出这个路由并在app.js中通过
app.use('/', routes); 加载。
这样，当访问主页时，就会调用res.render('index', { title: 'Express' });渲染views/index.ejs模版并显示到浏览器中。<br />

再看一下./views/index.jade文件:<br />

```javascript
extends layout

block content
  h1= title
  p Welcome to #{title}
```
可以看出该模板继承了layout模板，在渲染模板时我们传入了一个变量 title 值为 express 字符串，模板引擎会将所有 {title} 替换为 express ，然后将渲染后生成的html显示到浏览器中。<br />

jade文档:http://jade-lang.com/

这个不习惯使用jade的话是可以改成html传统模式的，具体方法如下：<br />
打开app.js这个文件，找到以下行：

```javascript
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

```
替换成
```javascript
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.engine('html', require('ejs').__express);//把ejs修改成html模块
app.set('view engine', 'html');
```
打开package.json文件，找到以下行：
```javascript
"jade": "^1.11.0",
```
替换成
```javascript
"ejs": "~2.5.6",
```
我们保存一下,然后选中package.json文件右键选择 run 'npm update'如图:

<img src="https://raw.githubusercontent.com/houfengtai/microblog/master/demoImg/nupdate.png" />

或者打开控制台输入"npm install" 或者输入"npm update" 回车，如图:
<img src="https://raw.githubusercontent.com/houfengtai/microblog/master/demoImg/n.png" />

把./views/目录下所有jade文件改成html文件<br />
把index.html 内容改成
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title><%= title %></title>
  <link rel='stylesheet', href='/stylesheets/style.css'>
</head>
<body>
  <h1><%= title %></h1>
  <p>Welcome to <%= title %></p>
</body>
</html>
```
IDEA重启一下项目，浏览器访问 http://127.0.0.1/:3000 效果如下：
<img src="https://raw.githubusercontent.com/houfengtai/microblog/master/demoImg/welcom.png" />

发现可以使用html样板了。


#### 路由控制（核心）
上面我们学习了如何创建和启动一个项目，并且对整个项目结构进行了讲解和运行流程，接下来开始讲解Express框架的基本使用与路由控制。<br />
Express文档:http://www.nodeclass.com/api/express4.html
<br />
Express 文档（中文）:http://www.expressjs.com.cn/4x/api.html
<br />
##### 工作原理
在./routes/index.js文件中有以下代码：
```javascript
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
```
这段代码的意思是当访问主页时，调用jade模板引擎，来渲染/views/index.jade模板文件（即将 title 变量全部替换为字符串 Express），生成静态页面并显示在浏览器中。

