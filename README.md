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
这段代码的意思是当访问主页时，调用jade模板引擎，来渲染/views/index.jade模板文件（即将 title 变量全部替换为字符串 Express），生成静态页面并显示在浏览器中。<br />
可以看出请求访问浏览器地址到返回数据整个运行流程是：<br />
```
  HTTP-->app.js-->routes-->response
 ```
也就说每一个访问都需要创建一个routes，这样，随着时间的推移，app.js文件不断地require，不断地app.use，主入口文件app.js就会变得非常臃肿难以维护了，也不符合代码模块化的思想。
作为一个有梦想的程序员，需要向着架构师方向前进。代码不仅要写的好，层次要分明，复用率要高。<br />
所以我们要对代码进行改进，Express官方给出的写法是在 app.js 中实现了简单的路由分配，然后再去 index.js 中找到对应的路由函数，最终实现路由功能。我们要把所有请求的routes配置到/routes/index.js文件上，
这样只需要维护一个文件即可，app.js文件只有一个总路由。
打开app.js文件，把
```javascript
var index = require('./routes/index');
var users = require('./routes/users');
```
改成：

```javascript
var routes = require('./routes/index');
```
把
```javascript
app.use('/', index);
app.use('/users', users);
```
改成：
```javascript
routes(app);
```

修改/routes/index.js文件内容改为如下：
```javascript
module.exports = function(app) {

  app.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
  });

};
```
再次运行项目，你会发现主页没有发生任何改变，说明我们的修改是可行的没有影响的。

##### 路由规则
Express封装了多种http请求，我们主要用的是get和post以及all（以后跨域请求会用到），即app.get()和paa.post()以及app.all()。<br />
pp.get() 和 app.post() 的第一个参数都为请求的路径，第二个参数为处理请求的回调函数，回调函数有两个参数分别是 req 和 res，代表请求信息和响应信息 。路径请求及对应的获取路径有以下几种形式：<br />
<br />
req.query
```
// GET /find?f=one+two  
req.query.f  
// => "one two"  

// GET /find?name=huafeng&sex=001&article[state]=001
req.query.name  
// => "huafeng"  

req.query.article.state  
// => "001"  

```

req.body
```
// POST user[name]=huafeng&user[email]=848989747@qq.com  
req.body.user.name  
// => "tobi"  

req.body.user.email  
// => "848989747@qq.com"  

// POST { "name": "huafeng" }  
req.body.name  
// => "huafeng"
```

req.params
```
// GET /user/huafeng
req.params.name  
// => "huafeng"  

// GET /js/javascripts/article.js  
req.params[0]  
// => "javascripts/article.js"
```
req.param(name)

```
// ?name=huafeng  
req.param('name')  
// => "huafeng"  

// POST name=huafeng  
req.param('name')  
// => "huafeng"  

// /user/huafeng for /user/:name   
req.param('name')  
// => "huafeng" 
```
可以看出:<br />
* req.query： 处理 get 请求，获取 get 请求参数
* req.params： 处理 /:xxx 形式的 get 或 post 请求，获取请求参数
* req.body： 处理 post 请求，获取 post 请求体
* req.param()： 处理 get 和 post 请求，但查找优先级由高到低为 req.params→req.body→req.query<br />
路由规则还支持正则表达式，更多请查看Express官方文档: http://www.nodeclass.com/api/express4.html<br />

##### 添加路由规则
当我们访问不存在的请求时,会显示如下:

<img src="https://raw.githubusercontent.com/houfengtai/microblog/master/demoImg/e.png" />

这是因为不存在 /huafeng 的路由规则，而且它也不是一个 public 目录下的文件，所以 express 返回了 404 Not Found 的错误。下面我们来添加这条路由规则，使得当访问 localhost:3000/huafeng 时，页面显示 hello,world!<br />

注意：以下修改仅用于测试，看到效果后再把代码还原回来。<br />

修改 /routes/index.js，在 app.get('/') 函数后添加一条路由规则：<br />
```javascript
app.get('/huafeng', function (req, res) {
        res.send("hello world!");
    });
```
重启项目之后，刷新浏览器如下:<br />
<img src="https://raw.githubusercontent.com/houfengtai/microblog/master/demoImg/welcom1.png" />

创建路由就是如此简单！

#### 模版引擎

接下来开始学习模板引擎。

##### 什么是模板引擎
模板引擎（Template Engine）是一个将页面模板和要显示的数据结合起来生成 HTML 页面的工具。 如果说上面讲到的 express 中的路由控制方法相当于 MVC 中的控制器的话，那模板引擎就相当于 MVC 中的视图。

>模板引擎的功能是将页面模板和要显示的数据结合起来生成 HTML 页面。它既可以运 行在服务器端又可以运行在客户端，大多数时候它都在服务器端直接被解析为 HTML，解析完成后再传输给客户端，因此客户端甚至无法判断页面是否是模板引擎生成的。有时候模板引擎也可以运行在客户端，即浏览器中，典型的代表就是 XSLT，它以 XML 为输入，在客户端生成 HTML 页面。但是由于浏览器兼容性问题，XSLT 并不是很流行。目前的主流还是由服务器运行模板引擎。 在 MVC 架构中，模板引擎包含在服务器端。控制器得到用户请求后，从模型获取数据，调用模板引擎。模板引擎以数据和页面模板为输入，生成 HTML 页面，然后返回给控制器，由控制器交回客户端。 ——《Node.js开发指南》

什么是 jade ?<br />

jade 是模板引擎的一种，也是我们这个教程中使用的模板引擎，因为它使用起来十分简单，而且与 express 集成良好。<br />

详情见：[jade文档](http://jade-lang.com/)

##### 使用模板引擎

前面我们通过以下两行代码设置了模板文件的存储位置和使用的模板引擎：

```javascript
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
```
__注意：__
我们通过 express -e mricroblog 只是初始化了一个使用 jade 模板引擎的工程而已，比如 node_modules 下添加了 jade 模块，
views 文件夹下有 index.jade 。并不是说强制该工程只能使用 jade 不能使用其他的模板引擎比如 ejs，真正指定使用哪个模板引擎的是 app.set('view engine', 'jade'); 
刚才我们就已经改成我们比较熟悉的html了。
<br />

在 /routes/index.js 中通过调用 res.render() 渲染模版，并将其产生的页面直接返回给客户端。它接受两个参数，
第一个是模板的名称，即 views 目录下的模板文件名，扩展名 .jade（注：刚才已改成html）可选。第二个参数是传递给模板的数据对象，用于模板翻译。<br />

打开 views/index.ejs ，内容如下:
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

当我们 res.render('index', { title: 'Express' }); 时，模板引擎会把 <%= title %> 替换成 Express，然后把替换后的页面显示给用户。<br />

渲染后生成的页面代码:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Express</title>
  <link rel='stylesheet', href='/stylesheets/style.css'>
</head>
<body>
  <h1>Express</h1>
  <p>Welcome to Express</p>
</body>
</html>
```
__注意：__
我们通过 app.use(express.static(path.join(__dirname, 'public'))) 设置了静态文件目录为 public 文件夹，
所以上面代码中的 href='/stylesheets/style.css' 就相当于 href='public/stylesheets/style.css' 。<br />

我们刚才改了模板引擎为html，实质上是使用ejs的标签系统，要是学过jsp的估计对这个就非常熟悉了，它只有以下3个标签：<br />
* <% code %>：JavaScript 代码。
* <%= code %>：显示替换过 HTML 特殊字符的内容。
* <%- code %>：显示原始 HTML 内容。

#### 注意：
<%= code %> 和 <%- code %> 的区别，当变量 code 为普通字符串时，两者没有区别。当 code 比如为
### hello
这种字符串时，<%= code %> 会原样输出
### hello
而 <%- code %> 则会显示 H1 大的 hello 字符串。<br />

我们可以在 <% %> 内使用 JavaScript 代码。下面是 ejs 的官方示例：<br />
The Data
```javascript
supplies: ['mop', 'broom', 'duster']
```
The Template

```html
<ul>
<% for(var i=0; i<supplies.length; i++) {%>
   <li><%= supplies[i] %></li>
<% } %>
</ul>
```

The Result
```html
<ul>
  <li>mop</li>
  <li>broom</li>
  <li>duster</li>
</ul>
```
#### 开始搭建微博（microblog）
##### 功能分析
搭建一个简单的具有登陆、注册、发表文章、修改文章、删除文章、退出功能的microblog。

##### 设计方向
未登录：主页顶部显示标题、欢迎语、登陆、注册按钮，下边部分则显示已发表的文章以及作者和发表日期。<br />
登录后：主页顶部显示标题、欢迎语、发表、退出按钮，下边部分则显示已发表的文章以及作者和发表日期。<br />
用户登陆和注册和退出和发表文章成功后都跳转返回到首页。<br /><br />


未登录时，主页如下：

<img src="https://raw.githubusercontent.com/houfengtai/microblog/master/demoImg/index_notlogin.png" />

登陆页：

<img src="https://raw.githubusercontent.com/houfengtai/microblog/master/demoImg/login.png" />

注册页：

<img src="https://raw.githubusercontent.com/houfengtai/microblog/master/demoImg/reg.png" />

登录后，主页如下：

<img src="https://raw.githubusercontent.com/houfengtai/microblog/master/demoImg/index_yeslogin.png" />

文章发表页面：

<img src="https://raw.githubusercontent.com/houfengtai/microblog/master/demoImg/push.png" />

__注意：__
没有登出页，当点击 “退出” 后，退出登陆并返回到主页，上面的页面比较丑，这不是本文重点，以后会专门写一些文章介绍大前端的，手把手教会编写漂亮页面。<br />
html学习手册：http://www.w3school.com.cn/

##### 路由规划

我们上面已经构思好了设计图。接下来就是要规划路由了，路由是整个项目的的骨架部分，处在于核心位置，是页面与后台数据交互的转接点。所以我们需要优先考虑。<br />

根据构思好的设计图，我们把路由规划成如下：
```
/:首页
/login.html:登陆
/reg.html:注册
/push.html:文章发表
/loginout:退出

```

对于/login.html与/reg.html只能是未登录的用户访问，而/push.html与/loginout只能是已登录的用户访问，
根据登录用户与未登录用户主页会展示不同的内容。<br /><br />

修改/routes/index.js文件，如下：
```javascript
module.exports = function(app) {
    /**
     * 主页
     */
    app.get('/', function (req, res) {
        res.render('index', { title: '主页' });
    });

    /**
     * 登录跳转页面
     */
    app.get('/login.html', function (req, res) {
        res.render('login', { title: '登录' });
    });

    /**
     * 注册跳转页面
     */
    app.get('/reg.html', function (req, res) {
        res.render('register', { title: '注册' });
    });
    /**
     * 文章发表跳转页面
     */
    app.get('/push.html', function (req, res) {
        res.render('push_article', { title: '发表' });
    });

    /**
     * 退出登录方法
     */
    app.get('//loginout', function (req, res) {
        res.redirect('/');//发表成功跳转到主页
    });
};
```


