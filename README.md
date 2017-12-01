# NodeJs+Express+MongoDb最新教程（零基础入门到精通）
## NodeJs 零基础快速搭建一个microblog项目

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
然后你会看到:express的欢迎信息。然后开始我们的express之旅吧！

#### 开始开发

刚刚已经创建了一个最基础化的express项目了，接下来就开始着手开发了，首先进入到项目所在目录查看整个项目结构。
![Image text](microblog/demoImg/prolist.png)

<img src="https://github.com/houfengtai/microblog/tree/master/demoImg/prolist.png" />

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

2、数据库
数据库有：
	关系型数据库：Oracle、DB2、SQL server、Mysql等等
	非关系型数据库有：MongoDB、HBase、Redis等等<br />

本文使用MongoDB,mongo是面向文档的数据库，存储数据格式为BSON,与NodeJs操作的JSON最为衔接，效率也是最快的。

安装方法（有多种环境安装，自行选择一个吧）：<br />
1、Docker上安装（docker是什么？这个不详说了，适用于高级人群，不适合初学者）:<br />

查找Docker Hub上的mongo镜像
```
docker search mongo
```

拉取官方镜像（本文使用mongo3.2版本）

```
docker pull mongo:3.2
```
	
使用mongo镜像
```
docker run -p 27017:27017 -e $PWD/db:/data/db -d mongo:3.2
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
##### 正式开发
经过上面的努力，所有的环境都已安装就绪，下面我们就开始来正式写代码了，想想都有点小激动吧！

打开我们的IDEA工具（需要了解更多的IDEA工具使用方法请自行百度）<br />
点击左上角File-->Open… -->选择刚才创建的microblog项目

<img src="https://github.com/houfengtai/microblog/tree/master/demoImg/open.png" />

看一下我们刚才创建的项目总体结构<br />

<img src="https://github.com/houfengtai/microblog/tree/master/demoImg/prolist1.png" />

app.js：启动文件，或者说入口文件 <br />
package.json：存储着工程的信息及模块依赖<br />
当在 dependencies 中添加依赖的模块时，运行 npm install，npm 会检查当前目录下的 package.json，并自动安装所有指定的模块 node_modules：存放 package.json 中安装的模块，
当你在 package.json 添加依赖的模块并安装后，存放在这个文件夹下<br />
public：存放 image、css、js 等文件 <br />
routes：存放路由文件 <br />
views：存放视图文件或者说模版文件<br />
bin：存放可执行文件<br />
