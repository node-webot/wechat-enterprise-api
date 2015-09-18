var util = require('./util');
var wrapper = util.wrapper;
var postJSON = util.postJSON;
var make = util.make;


/**
 * 获取设备及用户信息
 *
 * Examples:
 * ```
 * api.getShakeInfo("ticket", callback);
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
 *  "errcode": 0,
 *  "errmsg": "ok"
 * }
 * ```
 * @param {String} ticket 摇周边业务的ticket，可在摇到的URL中得到，ticket生效时间为30分钟，每一次摇都会重新生成新的ticket
 * @param {Function} callback 回调函数
 */

make(exports, 'getShakeInfo', function (ticket, callback) {
  //https://qyapi.weixin.qq.com/cgi-bin/shakearound/getshakeinfo?access_token=ACCESS_TOKEN
  var url = this.prefix + 'shakearound/getshakeinfo?access_token=' + this.token.accessToken;
  var opts = {
    "ticket": ticket
  };
  this.request(url, postJSON(opts), wrapper(callback));
});