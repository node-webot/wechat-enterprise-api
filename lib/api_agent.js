var util = require('./util');
var wrapper = util.wrapper;
var postJSON = util.postJSON;

/**
 * 获取企业号应用
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
exports.getAgent = function (agentid, callback) {
  this.preRequest(this._getAgent, arguments);
};

/*!
 * 获取企业号应用的未封装版本
 */
exports._getAgent = function (agentid, callback) {
  // https://qyapi.weixin.qq.com/cgi-bin/agent/get?access_token=xxxx&agentid=yyy
  var url = this.prefix + 'agent/get?access_token=' + this.token.accessToken + '&agentid=' + agentid;
  this.request(url, wrapper(callback));
};

/**
 * 设置企业号应用
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
exports.setAgent = function (opts, callback) {
  this.preRequest(this._setAgent, arguments);
};

/*!
 * 设置企业号应用列表的未封装版本
 */
exports._setAgent = function (opts, callback) {
  // https://qyapi.weixin.qq.com/cgi-bin/agent/set?access_token=xxxx
  var url = this.prefix + 'agent/set?access_token=' + this.token.accessToken;
  this.request(url, postJSON(opts), wrapper(callback));
};


/**
 * 企业号应用列表
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

exports.listAgent = function (agentid, callback) {
  this.preRequest(this._listAgent, arguments);
};

/*!
 * 获取企业号应用列表的未封装版本
 */
exports._listAgent = function (agentid, callback) {
  // https://qyapi.weixin.qq.com/cgi-bin/agent/get?access_token=xxxx&agentid=yyy
  var url = this.prefix + 'agent/list?access_token=' + this.token.accessToken;
  this.request(url, wrapper(callback));
};
