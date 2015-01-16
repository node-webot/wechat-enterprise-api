var util = require('./util');
var wrapper = util.wrapper;
var make = util.make;

/**
 * 创建标签
 *
 * 详细请看：<http://qydev.weixin.qq.com/wiki/index.php?title=%E5%9B%9E%E8%B0%83%E6%A8%A1%E5%BC%8F#.E8.8E.B7.E5.8F.96.E5.BE.AE.E4.BF.A1.E6.9C.8D.E5.8A.A1.E5.99.A8.E7.9A.84ip.E6.AE.B5>
 * Examples:
 * ```
 * api.getCallbackIP(name, callback);
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
 *  "ip_list": ["101.226.103.*", "101.226.62.*"]
 * }
 * ```
 * @param {Function} callback 回调函数
 */
make(exports, 'getCallbackIP', function (callback) {
  // https://qyapi.weixin.qq.com/cgi-bin/getcallbackip?access_token=ACCESS_TOKEN
  var url = this.prefix + 'getcallbackip?access_token=' + this.token.accessToken;
  this.request(url, wrapper(callback));
});
