var path = require('path');
var fs = require('fs');
var formstream = require('formstream');
var util = require('./util');
var wrapper = util.wrapper;

/**
 * 上传永久素材，分别有图片（image）、语音（voice）、视频（video）和普通文件（file）
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E4%B8%8A%E4%BC%A0%E6%B0%B8%E4%B9%85%E7%B4%A0%E6%9D%90>
 * Examples:
 * ```
 * api.addMaterial(agentid, 'filepath', type, callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {"errcode":0,"errmsg":"ok","media_id": "2-G6nrLmr5EFSDC3MMfasdfb_-zK1dDdzmd0p7"}
 * ```
 * Shortcut:
 *
 * - `exports.addImage(agentid, filepath, callback);`
 * - `exports.addVoice(agentid, filepath, callback);`
 * - `exports.addVideo(agentid, filepath, callback);`
 * - `exports.addFile(agentid, filepath, callback);`
 *
 * @param {String} agentid 应用的id
 * @param {String} filepath 文件路径
 * @param {String} type 媒体类型，可用值有image、voice、video、file
 * @param {Function} callback 回调函数
 */
exports.addMaterial = function (agentid, filepath, type, callback) {
  this.preRequest(this._addMaterial, arguments);
};

/*!
 * 上传永久素材的未封装版本
 */
exports._addMaterial = function (agentid, filepath, type, callback) {
  var that = this;
  fs.stat(filepath, function (err, stat) {
    if (err) {
      return callback(err);
    }
    var form = formstream();
    form.file('media', filepath, path.basename(filepath), stat.size);
    var url = that.prefix + 'material/add_material?access_token=' + that.token.accessToken + '&type=' + type + '&agentid=' + agentid;
    var opts = {
      dataType: 'json',
      type: 'POST',
      timeout: 60000, // 60秒超时
      headers: form.headers(),
      stream: form
    };
    that.request(url, opts, wrapper(callback));
  });
};

['image', 'voice', 'video', 'file'].forEach(function (type) {
  var method = 'add' + type[0].toUpperCase() + type.substring(1);
  exports[method] = function (agentid, filepath, callback) {
    this.addMaterial(agentid, filepath, type, callback);
  };
});

/**
 * 上传永久图文素材
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E4%B8%8A%E4%BC%A0%E6%B0%B8%E4%B9%85%E7%B4%A0%E6%9D%90>
 * Examples:
 * ```
 * api.addMPNews(agentid, mpnews, callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {"errcode": "0","errmsg": "ok","media_id": "2-G6nrLmr5EC3MMfasdfb_-zK1dDdzmd0p7"}
 * ```
 *
 * @param {String} agentid 应用的id
 * @param {String} mpnews 图文消息的结构
 * @param {Function} callback 回调函数
 */
exports.addMPNews = function (agentid, mpnews, callback) {
  this.preRequest(this._addMPNews, arguments);
};

/*!
 * 上传永久图文素材的未封装版本
 */
exports._addMPNews = function (agentid, mpnews, callback) {
  var that = this;
  var post_data = {
    agentid: agentid,
    mpnews: mpnews
  };
  var url = that.prefix + 'material/add_mpnews?access_token=' + that.token.accessToken;
  this.request(url, postJSON(post_data), wrapper(callback));
};

/**
 * 更新永久图文素材
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E4%BF%AE%E6%94%B9%E6%B0%B8%E4%B9%85%E5%9B%BE%E6%96%87%E7%B4%A0%E6%9D%90>
 * Examples:
 * ```
 * api.updateMPNews(agentid, media_id, mpnews, callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {"errcode": "0","errmsg": "ok"}
 * ```
 *
 * @param {String} agentid 应用的id
 * @param {String} media_id 素材id
 * @param {String} mpnews 图文消息的结构
 * @param {Function} callback 回调函数
 */
exports.updateMPNews = function (agentid, media_id, mpnews, callback) {
  this.preRequest(this._updateMPNews, arguments);
};

/*!
 * 更新永久图文素材的未封装版本
 */
exports._updateMPNews = function (agentid, media_id, mpnews, callback) {
  var that = this;
  var post_data = {
    agentid: agentid,
    media_id: media_id,
    mpnews: mpnews
  };
  var url = that.prefix + 'material/update_mpnews?access_token=' + that.token.accessToken;
  this.request(url, postJSON(post_data), wrapper(callback));
};

/**
 * 获取永久素材
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E8%8E%B7%E5%8F%96%E6%B0%B8%E4%B9%85%E7%B4%A0%E6%9D%90>
 * Examples:
 * ```
 * api.getMaterial(agentid, 'media_id', callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的文件Buffer对象
 * - `res`, HTTP响应对象
 *
 * @param {String} agentid 应用的id
 * @param {String} mediaId 媒体文件的ID
 * @param {Function} callback 回调函数
 */
exports.getMaterial = function (agentid, mediaId, callback) {
  this.preRequest(this._getMaterial, arguments);
};

/*!
 * 获取永久素材的未封装版本
 */
exports._getMaterial = function (agentid, mediaId, callback) {
  var url = this.prefix + 'material/get?access_token=' + this.token.accessToken + '&media_id=' + mediaId + '&agentid=' + agentid;
  this.request(url, {}, wrapper(function (err, data, res) {
    // handle some err
    if (err) {
      return callback(err);
    }
    var contentType = res.headers['content-type'];
    if (contentType === 'application/json') {
      var ret;
      try {
        ret = JSON.parse(data);
        if (ret.errcode) {
          err = new Error(ret.errmsg);
          err.name = 'WeChatAPIError';
        }
      } catch (ex) {
        callback(ex, data, res);
        return;
      }
      callback(err, ret, res);
    } else {
      // 输出Buffer对象
      callback(null, data, res);
    }
  }));
};

/**
 * 删除永久素材
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E5%88%A0%E9%99%A4%E6%B0%B8%E4%B9%85%E7%B4%A0%E6%9D%90>
 * Examples:
 * ```
 * api.delMaterial(agentid, 'media_id', callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的文件Buffer对象
 * - `res`, HTTP响应对象
 *
 * Result:
 * ```
 * {"errcode": "0","errmsg": "deleted"}
 * ```
 * @param {String} agentid 应用的id
 * @param {String} mediaId 媒体文件的ID
 * @param {Function} callback 回调函数
 */
exports.delMaterial = function (agentid, mediaId, callback) {
  this.preRequest(this._delMaterial, arguments);
};

/*!
 * 删除永久素材的未封装版本
 */
exports._delMaterial = function (agentid, mediaId, callback) {
  var url = this.prefix + 'material/del?access_token=' + this.token.accessToken + '&media_id=' + mediaId + '&agentid=' + agentid;
  this.request(url, {}, wrapper(callback));
};

/**
 * 获取素材总数
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E8%8E%B7%E5%8F%96%E7%B4%A0%E6%9D%90%E6%80%BB%E6%95%B0>
 * Examples:
 * ```
 * api.countMaterial(agentid, callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的文件Buffer对象
 * - `res`, HTTP响应对象
 *
 * Result:
 * ```
 * {"errcode": "0","errmsg": "ok", "total_count": 37,"image_count": 12, "voice_count": 10, "video_count": 3,  "file_count": 3, "mpnews_count": 6}
 * ```
 * @param {String} agentid 应用的id
 * @param {String} mediaId 媒体文件的ID
 * @param {Function} callback 回调函数
 */
exports.countMaterial = function (agentid, mediaId, callback) {
  this.preRequest(this._countMaterial, arguments);
};

/*!
 * 获取素材总数的未封装版本
 */
exports._countMaterial = function (agentid, mediaId, callback) {
  var url = this.prefix + 'material/get_count?access_token=' + this.token.accessToken + '&agentid=' + agentid;
  this.request(url, {}, wrapper(callback));
};

/**
 * 获取素材列表
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E8%8E%B7%E5%8F%96%E7%B4%A0%E6%9D%90%E5%88%97%E8%A1%A8>
 * type 可为图片（image）、语音（voice）、视频（video）、普通文件（file）、图文消息（mpnews）
 * Examples:
 * ```
 * api.batchgetMaterial(agentid, type, offset, count, callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的文件Buffer对象
 * - `res`, HTTP响应对象
 *
 * Result:
 * ```
 * {"errcode": "0","errmsg": "ok", "total_count": 37,"image_count": 12, "voice_count": 10, "video_count": 3,  "file_count": 3, "mpnews_count": 6}
 * ```
 * @param {String} agentid 应用的id
 * @param {String} type 媒体类型 可以为图文(mpnews)、图片（image）、音频（voice）、视频（video）、文件（file）
 * @param {String} offset 从该类型素材的该偏移位置开始返回，0表示从第一个素材返回
 * @param {String} count 返回素材的数量，取值在1到50之间
 * @param {Function} callback 回调函数
 */
exports.batchgetMaterial = function (agentid, type, offset, count, callback) {
  this.preRequest(this._batchgetMaterial, arguments);
};

/*!
 * 获取素材列表的未封装版本
 */
exports._batchgetMaterial = function (agentid, type, offset, count, callback) {
  var url = this.prefix + 'material/batchget?access_token=' + this.token.accessToken;
  var post_data = {
    "type": type, 
    "agentid": agentid, 
    "offset": parseInt(offset || 0), 
    "count": parseInt(count || 10)
  }
  this.request(url, postJSON(post_data), wrapper(callback));
};


