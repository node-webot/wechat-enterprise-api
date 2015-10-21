var util = require('./util');
var postJSON = util.postJSON;
var wrapper = util.wrapper;

/**
 * 创建标签
 *
 * 详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=管理标签
 * Examples:
 * ```
 * api.createTag(name, callback);
 * api.createTag(name, tagid, callback);
 * api.createTag(name, { tagid: theId }, callback);
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
 *  "errmsg": "created",
 *  "tagid": "1"
 * }
 * ```
 * @param {String} name 标签名字
 * @param {String|Number|Object} opts 标签的额外参数(目前就tagid)
 * @param {Function} callback 回调函数
 */
exports.createTag = function (name, opts, callback) {
  this.preRequest(this._createTag, arguments);
};

/*!
 * 创建标签的未封装版本
 */
exports._createTag = function (name, opts, callback) {
  // https://qyapi.weixin.qq.com/cgi-bin/tag/create?access_token=ACCESS_TOKEN
  var url = this.prefix + 'tag/create?access_token=' + this.token.accessToken;
  var data = {
    tagname: name
  };
  if (typeof opts === 'function') {
    callback = opts;
  } else {
    if (typeof opts === 'object') {
      var id = opts.tagid || opts.id;
      if (id) {
        data.tagid = Number(id);
      }
    } else {
      data.tagid = Number(opts);
    }
  }
  this.request(url, postJSON(data), wrapper(callback));
};

/**
 * 更新标签名字
 *
 * Examples:
 * ```
 * api.updateTagName(id, name, callback);
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
 *   "errmsg": "updated"
 * }
 * ```
 * @param {String} id 标签ID
 * @param {String} name 标签名称。最长64个字符
 * @param {Function} callback 回调函数
 */
exports.updateTagName = function (id, name, callback) {
  this.preRequest(this._updateTagName, arguments);
};

/*!
 * 更新标签名字的未封装版本
 */
exports._updateTagName = function (id, name, callback) {
  // https://qyapi.weixin.qq.com/cgi-bin/tag/update?access_token=ACCESS_TOKEN
  var url = this.prefix + 'tag/update?access_token=' + this.token.accessToken;
  var data = {
    tagid: id,
    tagname: name
  };
  this.request(url, postJSON(data), wrapper(callback));
};

/**
 * 删除标签
 *
 * Examples:
 * ```
 * api.deleteTag(id, callback);
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
 *  "errmsg": "deleted"
 * }
 * ```
 * @param {Number} id 标签ID
 * @param {Function} callback 回调函数
 */
exports.deleteTag = function (id, callback) {
  this.preRequest(this._deleteTag, arguments);
};

/*!
 * 删除标签的未封装版本
 */
exports._deleteTag = function (id, callback) {
  // https://qyapi.weixin.qq.com/cgi-bin/tag/delete?access_token=ACCESS_TOKEN&tagid=1
  var url = this.prefix + 'tag/delete?access_token=' + this.token.accessToken;
  var opts = {
    dataType: 'json',
    data: {
      tagid: id
    }
  };
  this.request(url, opts, wrapper(callback));
};

/**
 * 获取标签列表
 *
 * Examples:
 * ```
 * api.listTags(callback);
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
 *  "errmsg": "deleted"
 * }
 * ```
 * @param {Function} callback 回调函数
 */
exports.listTags = function (callback) {
  this.preRequest(this._listTags, arguments);
};

/*!
 * 获取标签列表的未封装版本
 */
exports._listTags = function (callback) {
  var url = this.prefix + 'tag/list?access_token=' + this.token.accessToken;
  var opts = {
    dataType: 'json',
    data: {}
  };
  this.request(url, opts, wrapper(callback));
};
/**
 * 获取标签成员
 *
 * Examples:
 * ```
 * api.getTagUsers(id, callback);
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
 *   "userlist": [
 *     {
 *         "userid": "zhangsan",
 *         "name": "李四"
 *     }
 *   ]
 * }
 * ```
 * @param {Number} id 标签ID
 * @param {Function} callback 回调函数
 */
exports.getTagUsers = function (id, callback) {
  this.preRequest(this._getTagUsers, arguments);
};

/*!
 * 获取标签成员的未封装版本
 */
exports._getTagUsers = function (id, callback) {
  // https://qyapi.weixin.qq.com/cgi-bin/tag/get?access_token=ACCESS_TOKEN&tagid=1
  var url = this.prefix + 'tag/get?access_token=' + this.token.accessToken;
  var opts = {
    dataType: 'json',
    data: {
      tagid: id
    }
  };
  this.request(url, opts, wrapper(callback));
};

/**
 * 增加标签成员
 *
 * Examples:
 * ```
 * var userIdList = ['id1', 'id2'];
 * api.addTagUsers(id, userIdList, callback);
 * ```
 *
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * a)正确时返回
 * ```
 * {
 *   "errcode": 0,
 *   "errmsg": "deleted"
 * }
 * ```
 * b)若部分userid非法，则返回
 * ```
 * {
 *   "errcode": 0,
 *   "errmsg": "invalid userlist failed"
 *   "invalidlist"："usr1|usr2|usr"
 * }
 * ```
 * c)当包含的userid全部非法时返回
 * ```
 * {
 *   "errcode": 40031,
 *   "errmsg": "all list invalid"
 * }
 * ```
 * @param {Number} id 标签ID
 * @param {Array} userIdList 用户ID列表
 * @param {Function} callback 回调函数
 */
exports.addTagUsers = function (id, userIdList, callback) {
  this.preRequest(this._addTagUsers, arguments);
};

/*!
 * 增加标签成员的未封装版本
 */
exports._addTagUsers = function (id, userIdList, callback) {
  // https://qyapi.weixin.qq.com/cgi-bin/tag/addtagusers?access_token=ACCESS_TOKEN
  var url = this.prefix + 'tag/addtagusers?access_token=' + this.token.accessToken;
  var data = {
    tagid: id,
    userlist: userIdList
  };
  this.request(url, postJSON(data), wrapper(callback));
};

/**
 * 删除标签成员
 *
 * Examples:
 * ```
 * var userIdList = ['id1', 'id2'];
 * api.deleteTagUsers(id, userIdList, callback);
 * ```
 *
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * a)正确时返回
 * ```
 * {
 *   "errcode": 0,
 *   "errmsg": "deleted"
 * }
 * ```
 * b)若部分userid非法，则返回
 * ```
 * {
 *   "errcode": 0,
 *   "errmsg": "invalid userlist failed"
 *   "invalidlist"："usr1|usr2|usr"
 * }
 * ```
 * c)当包含的userid全部非法时返回
 * ```
 * {
 *   "errcode": 40031,
 *   "errmsg": "all list invalid"
 * }
 * ```
 * @param {Number} id 标签ID
 * @param {Array} userIdList 用户ID数组
 * @param {Function} callback 回调函数
 */
exports.deleteTagUsers = function (id, userIdList, callback) {
  this.preRequest(this._deleteTagUsers, arguments);
};

/*!
 * 删除标签成员的未封装版本
 */
exports._deleteTagUsers = function (id, userIdList, callback) {
  // https://qyapi.weixin.qq.com/cgi-bin/tag/deltagusers?access_token=ACCESS_TOKEN
  var url = this.prefix + 'tag/deltagusers?access_token=' + this.token.accessToken;
  var data = {
    tagid: id,
    userlist: userIdList
  };
  this.request(url, postJSON(data), wrapper(callback));
};
