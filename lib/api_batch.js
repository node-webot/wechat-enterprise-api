// 本文件用于实现异步批量任务接口
// 所有的批量操作都是以上传的数据文件(CSV格式)作为基础的，
// 所以在调用一下接口之前需要先调用uploadMedia把数据文件传到微信的服务器上。
var util = require('./util');
var postJSON = util.postJSON;
var wrapper = util.wrapper;

/**
 * 批量邀请成员
 * 详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1%E6%8E%A5%E5%8F%A3#.E9.82.80.E8.AF.B7.E6.88.90.E5.91.98.E5.85.B3.E6.B3.A8
 *
 * Examples:
 * ```
 * api.batchInviteUser(to, taskCb, callback);
 * ```
 * To:
 * ```
 * {
 *   "touser":"xxx|xxx",
 *   "toparty":"xxx|xxx",
 *   "totag":"xxx|xxx",
 *   "invite_tips":"xxx",
 * }
 * ```
 * ```
 * TaskCb:
 * ```
 *   {
 *     "url": "xxx",
 *     "token": "xxx",
 *     "encodingaeskey": "xxx"
 *   }
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
 *   "errcode": 0,
 *   "errmsg": "ok",
 *   "jobid": "IoZW03y44Zcwuz-2K6T6rHTcf1uwyVbcYu2aRALKw-U"
 * }
 * ```
 * @param {Object} to 批量邀请的数据结构
 * @param {Object} taskCb 任务执行完毕后的回调结构
 * @param {Function} callback 回调函数
 */
exports.batchInviteUser = function (to, taskCb, callback) {
  this.preRequest(this._batchInviteUser, arguments);
};

exports._batchInviteUser = function (to, taskCb, callback) {
  var url = this.prefix + 'batch/inviteuser?access_token=' + this.token.accessToken;
  var data = to;
  if (taskCb) {
    data.callback = taskCb;
  }
  this.request(url, postJSON(data), wrapper(callback));
};

/**
 * 批量更新成员
 * 详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1%E6%8E%A5%E5%8F%A3#.E9.82.80.E8.AF.B7.E6.88.90.E5.91.98.E5.85.B3.E6.B3.A8
 *
 * Examples:
 * ```
 * api.batchSyncUser(mediaId, taskCb, callback);
 * ```
 *
 * ```
 * TaskCb:
 * ```
 *   {
 *     "url": "xxx",
 *     "token": "xxx",
 *     "encodingaeskey": "xxx"
 *   }
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
 *   "errcode": 0,
 *   "errmsg": "ok",
 *   "jobid": "IoZW03y44Zcwuz-2K6T6rHTcf1uwyVbcYu2aRALKw-U"
 * }
 * ```
 * @param {String} mediaId 数据文件的mediaId
 * @param {Object} taskCb 任务执行完毕后的回调结构
 * @param {Function} callback 回调函数
 */
exports.batchSyncUser = function (mediaId, taskCb, callback) {
  this.preRequest(this._batchSyncUser, arguments);
};

exports._batchSyncUser = function (mediaId, taskCb, callback) {
  var url = this.prefix + 'batch/syncuser?access_token=' + this.token.accessToken;
  var data = {
    media_id: mediaId
  };

  if (taskCb) {
    data.callback = taskCb;
  }

  this.request(url, postJSON(data), wrapper(callback));
};

/**
 * 全量覆盖成员
 * 详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1%E6%8E%A5%E5%8F%A3#.E9.82.80.E8.AF.B7.E6.88.90.E5.91.98.E5.85.B3.E6.B3.A8
 *
 * Examples:
 * ```
 * api.batchReplaceUser(mediaId, taskCb, callback);
 * ```
 *
 * ```
 * TaskCb:
 * ```
 *   {
 *     "url": "xxx",
 *     "token": "xxx",
 *     "encodingaeskey": "xxx"
 *   }
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
 *   "errcode": 0,
 *   "errmsg": "ok",
 *   "jobid": "IoZW03y44Zcwuz-2K6T6rHTcf1uwyVbcYu2aRALKw-U"
 * }
 * ```
 * @param {String} mediaId 数据文件的mediaId
 * @param {Object} taskCb 任务执行完毕后的回调结构
 * @param {Function} callback 回调函数
 */
exports.batchReplaceUser = function (mediaId, taskCb, callback) {
  this.preRequest(this._batchReplaceUser, arguments);
};

exports._batchReplaceUser = function (mediaId, taskCb, callback) {
  var url = this.prefix + 'batch/replaceuser?access_token=' + this.token.accessToken;
  var data = {
    media_id: mediaId
  };

  if (taskCb) {
    data.callback = taskCb;
  }

  this.request(url, postJSON(data), wrapper(callback));
};

/**
 * 全量覆盖部门
 * 详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1%E6%8E%A5%E5%8F%A3#.E9.82.80.E8.AF.B7.E6.88.90.E5.91.98.E5.85.B3.E6.B3.A8
 *
 * Examples:
 * ```
 * api.batchReplaceParty(mediaId, taskCb, callback);
 * ```
 *
 * ```
 * TaskCb:
 * ```
 *   {
 *     "url": "xxx",
 *     "token": "xxx",
 *     "encodingaeskey": "xxx"
 *   }
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
 *   "errcode": 0,
 *   "errmsg": "ok",
 *   "jobid": "IoZW03y44Zcwuz-2K6T6rHTcf1uwyVbcYu2aRALKw-U"
 * }
 * ```
 * @param {Object} mediaId 数据文件的mediaId
 * @param {Object} taskCb 任务执行完毕后的回调结构
 * @param {Function} callback 回调函数
 */
exports.batchReplaceParty = function (mediaId, taskCb, callback) {
  this.preRequest(this._batchReplaceParty, arguments);
};

exports._batchReplaceParty = function (mediaId, taskCb, callback) {
  var url = this.prefix + 'batch/replaceparty?access_token=' + this.token.accessToken;
  var data = {
    media_id: mediaId
  };

  if (taskCb) {
    data.callback = taskCb;
  }

  this.request(url, postJSON(data), wrapper(callback));
};

/**
 * 获取批量任务的结果
 * 详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1%E6%8E%A5%E5%8F%A3#.E9.82.80.E8.AF.B7.E6.88.90.E5.91.98.E5.85.B3.E6.B3.A8
 *
 * Examples:
 * ```
 * api.batchGetResult(jobid, callback);
 * ```
 *
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * 返回结果参考微信的官方文档
 * @param {String} jobid 启动批量任务时返回的任务id
 * @param {Function} callback 回调函数
 */
exports.batchGetResult = function (jobid, callback) {
  this.preRequest(this._batchGetResult, arguments);
};

exports._batchGetResult = function(jobid, callback) {
  var url = this.prefix + 'batch/getresult?access_token=' + this.token.accessToken + '&jobid=' + jobid;
  this.request(url, wrapper(callback));
};
