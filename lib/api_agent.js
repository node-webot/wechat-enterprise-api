var util = require('./util');
var wrapper = util.wrapper;
var postJSON = util.postJSON;
var make = util.make;

/**
 * 获取企业号应用
 * 详细请看：<http://qydev.weixin.qq.com/wiki/index.php?title=获取企业号应用>
 * 
 * Examples:
 * ```
 * api.getAgent(agentid, callback);
 * ```
 *
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {
 * "errcode":"0",
 * "errmsg":"ok" ,
 * "agentid":"1" ,
 * "name":"NAME" ,
 * "square_logo_url":"xxxxxxxx" ,
 * "round_logo_url":"yyyyyyyy" ,
 * "description":"desc" ,
 * "allow_userinfos":{
 *     "user":[
 *           {
 *               "userid":"id1",
 *               "status":"1"
 *           },
 *           {
 *               "userid":"id2",
 *               "status":"1"
 *           },
 *           {
 *               "userid":"id3",
 *               "status":"1"
 *           }
 *            ]
 *  },
 * "allow_partys":{
 *     "partyid": [1]
 *  },
 * "allow_tags":{
 *     "tagid": [1,2,3]
 *  }
 * "close":0 ,
 * "redirect_domain":"www.qq.com",
 * "report_location_flag":0,
 * "isreportuser":0,
 * "isreportenter":0
 * ```
 * @param {String} agentid 企业号应用的id
 * @param {Function} callback 回调函数
 */
make(exports, 'getAgent', function (agentid, callback) {
  if (typeof agentid === 'function') {
    callback = agentid;
    agentid = this.agentid;
  }
  if (!agentid) {
    throw new Error('It requires an agentid.');
  }
  var url = this.prefix + 'agent/get?access_token=' + this.token.accessToken;
  var opts = {
    dataType: 'json',
    data: {
      agentid: agentid
    }
  };
  this.request(url, opts, wrapper(callback));
});

/**
 * 设置企业号应用
 * 详细请看：<http://qydev.weixin.qq.com/wiki/index.php?title=设置企业号应用>
 *
 * Examples:
 * ```
 * api.setAgent(opts, callback);
 * ```
 * Opts:
 * ```
 * {
 *   "agentid": "5",
 *   "report_location_flag": "0",
 *   "logo_mediaid": "xxxxx",
 *   "name": "NAME",
 *   "description": "DESC",
 *   "redirect_domain": "xxxxxx",
 *   "isreportuser":0,
 *   "isreportenter":0
 * }
 * ```
 *
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * ```
 *
 * Result:
 * {
 *   "errcode":"0",
 *   "errmsg":"ok" ,
 * }
 * ```
 * @param {Object} opts 更新的数据
 * @param {Function} callback 回调函数
 */
make(exports, 'setAgent', function (opts, callback) {
  var url = this.prefix + 'agent/set?access_token=' + this.token.accessToken;
  this.request(url, postJSON(opts), wrapper(callback));
});


/**
 * 获取应用概况列表
 * 详细请看：<http://qydev.weixin.qq.com/wiki/index.php?title=获取应用概况列表>
 *
 * Examples:
 * ```
 * api.listAgent(callback);
 * ```
 *
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * ```
 *
 * Result:
 * {
 *  "errcode": 0,
 *  "errmsg": "ok",
 *  "agentlist": [
 *    {
 *       "agentid": "5",
 *       "name": "企业小助手",
 *       "square_logo_url": "url",
 *       "round_logo_url": "url"
 *    },
 *    {
 *       "agentid": "8",
 *       "name": "HR小助手",
 *       "square_logo_url": "url",
 *       "round_logo_url": "url"
 *    }
 *  ]  
 * }
 * ```
 * @param {Function} callback 回调函数
 */
make(exports, 'listAgent', function (callback) {
  var url = this.prefix + 'agent/list?access_token=' + this.token.accessToken;
  var opts = {
    dataType: 'json'
  };
  this.request(url, opts, wrapper(callback));
});
