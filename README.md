# NodeJs+Express+MongoDb最新教程
## NodeJs 零基础快速搭建一个microblog（入门级别）

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
