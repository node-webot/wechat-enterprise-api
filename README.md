wechat enterprise api
=====================

微信公共平台企业号版主动调用API

## 模块状态
- [![NPM version](https://badge.fury.io/js/wechat-enterprise-api.png)](http://badge.fury.io/js/wechat-enterprise-api)
- [![Build Status](https://travis-ci.org/node-webot/wechat-enterprise-api.png?branch=master)](https://travis-ci.org/node-webot/wechat-enterprise-api)
- [![Dependencies Status](https://david-dm.org/node-webot/wechat-enterprise-api.png)](https://david-dm.org/node-webot/wechat-enterprise-api)
- [![Coverage Status](https://coveralls.io/repos/node-webot/wechat-enterprise-api/badge.png)](https://coveralls.io/r/node-webot/wechat-enterprise-api)

## 功能列表
- 主动消息
- 菜单操作
- 部门管理
- 用户管理
- 标签管理
- 媒体文件
- OAuth API（授权、获取基本信息）
- JS SDK 授权
- 管理企业号应用
- 通讯录批量操作接口
- 永久素材管理接口
- 企业号摇一摇周边接口


## 详细文档
- [文档主页](http://doxmate.cool/node-webot/wechat-enterprise-api/index.html)
- [API文档](http://doxmate.cool/node-webot/wechat-enterprise-api/api.html)
- 代码[测试覆盖率](http://node-webot.github.io/wechat-enterprise-api/coverage/index.html)
- [新手上路](http://node-webot.github.io/wechat-enterprise-api/Getting%20start.html)

### 通过代理服务器访问

#### 场景

对于大规模的集群部署模式，为了安全和速度，会有一些负载均衡的节点放在内网的服务器上（即负载均衡的节点与主结点通过内网连接，并且内网服务器上没有外网的IP）。这时，就需要配置代理服务器来使内网的机器可以有限度的访问外网的资源。例如：微信套件中的各种主动调用接口。

如何架设代理服务器在这里不做赘述，一般推荐使用squid 3，免费、快速、配置简单。

#### 技术原理

由于需要访问的微信API服务器是https协议，所以普通的http代理模式不能使用。
而一般都是http协议的代理服务器。
我们要实现的就是通过http代理通道来走https的请求。

基本的步骤是2步：

- 连接到代理服务器，发送CONNECT命令，打开一个TCP连接。
- 使用上一步打开的TCP连接，发送https的请求。

#### 实现步骤

一、下载[node-tunnel](https://github.com/koichik/node-tunnel) 注意：npm上的版本较老，不支持node v0.10以上的版本。

二、使用 httpsOverHttp 这个agent。

三、将agent配置给urllib，通过urllib的beforeRequest这个方法。

```js
var tunnel = require('tunnel');

var agent = tunnel.httpsOverHttp({
  proxy: {
    host: 'proxy_host_ip',
    port: 3128
  }
});

api.setOpts({
    beforeRequest:function(options){
        options.agent = agent;
    }
});

```

## Show cases
### Node.js API自动回复

![Node.js API自动回复机器人](http://nodeapi.diveintonode.org/assets/qrcode.jpg)

欢迎关注。

代码：<https://github.com/JacksonTian/api-doc-service>

你可以在[CloudFoundry](http://www.cloudfoundry.com/)、[appfog](https://www.appfog.com/)、[BAE](http://developer.baidu.com/wiki/index.php?title=docs/cplat/rt/node.js)等搭建自己的机器人。

## License
The MIT license.

## 交流群
QQ群：157964097，使用疑问，开发，贡献代码请加群。

## 感谢
感谢以下贡献者：

```

 project  : wechat-enterprise-api
 repo age : 7 months
 active   : 20 days
 commits  : 32
 files    : 34
 authors  :
    18	Jackson Tian            56.2%
    12	Nick Ma                 37.5%
     2	Qun Lin                 6.2%

```

## 捐赠
如果您觉得Wechat企业号版本对您有帮助，欢迎请作者一杯咖啡

![捐赠wechat](https://cloud.githubusercontent.com/assets/327019/2941591/2b9e5e58-d9a7-11e3-9e80-c25aba0a48a1.png)
