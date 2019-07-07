import conf from '../../render/conf/index.js';
// 解决地狱回调问题
class WxRequestUtil {

  constructor() {
    this.instance = null;
    this.path = conf.getHostUrl();
  }
  /**
   * 单例构造方法，构造一个广为人知的接口，供用户对该类进行实例化
   * @returns {WxRequestUtil}
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new WxRequestUtil();
    }
    return this.instance;
  }
  doPost(url, data , header) {
    url = this.path + url;
    return new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        data: data,
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: header, // 设置请求的 header
        success: function (res) {
          resolve(res);
        },
        fail: function (res) {
          reject(res);
        }
      });
    })
  }
  doGet (url, data) {
    url = this.path + url;
    return new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        data: data,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          resolve(res);
        },
        fail: function (res) {
          reject(res);
        }
      });
    })
  }
  doDelete(url, data) {
    url = this.path + url;
    return new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        data: data,
        method: 'DELETE', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          resolve(res);
        },
        fail: function (res) {
          reject(res);
        }
      });
    })
  }
}
export default WxRequestUtil;