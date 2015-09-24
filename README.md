# nodeSite
基于node的站点建设

##运行方式

1. [安装node环境](https://nodejs.org/en/)
2. 在项目根目录下运行`npm install`安装项目的依赖模块
3. 在项目根目录下运行`bower install`安装页面所依赖的插件
4. 在项目根目录下运行`mongod --dbpath=./db --port 27017`启动mangoDB(把数据库存放在了项目的根目录`bd`文件夹下,如果没有请手动创建个空文件夹`mkdir db`)
5. 另启一个控制台,运行`nodemon app.js`或者`node app.js`(前者可以检测文件更改自动重启服务器)

##框架&工具

###服务端
1. Express
2. mongod
3. mongoose
4. jade

...

###客户端
1. bootstrap
2. jquery
3. qst
4. requireJs

...

##页面

### 后台

> 用户名: admin

> 密码: 123123aa

- 主页[http://127.0.0.1:3000/admin/system/module](http://127.0.0.1:3000/admin/system/module)
- 登录页面[http://127.0.0.1:3000/admin/login](http://127.0.0.1:3000/admin/login)
- 功能模块[http://127.0.0.1:3000/admin/system/module](http://127.0.0.1:3000/admin/system/module)
- 项目导航[http://127.0.0.1:3000/admin/manageNavList](http://127.0.0.1:3000/admin/manageNavList)

### 前台

- 项目导航[http://127.0.0.1:3000/](http://127.0.0.1:3000/)

##实现的功能

1. 后台模块的添加,支持无限级添加
2. 通过后台修改前台数据的增删改查
3. 图片的上传
4. 日志管理:登录日志
5. 后台登录逻辑
6. 错误状态的捕捉,跳转到前台的错误展示页去,比如404页
7. 后台首页获取服务器以及客户端的信息进行展示
8. 后台动态生成`面包屑`
9. 页面响应式布局