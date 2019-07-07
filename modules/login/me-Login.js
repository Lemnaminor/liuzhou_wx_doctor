
import RequestUtils from "../../utils/render/util/RequestUtils";
import conf from "../../utils/render/conf/index.js";
import WxRequestUtil from "../../utils/render/util/WxRequestUtil";
import { ErrorType } from '../../utils/render/util/ChatUtils';

const api = {

  cpLogin: "/wx/cp/doctor/" + conf.appId + "/cpLogin",
  cpInfo: "/wx/cp/doctor/" + conf.appId + "/cpInfo",
  /**
   * @param username 企业微信用户的 userId
   * @param password 企业微信用户的 userId 
   */
  login: function (username, password) {
    let self = getApp(); 
    // 实例化封装的请求API
    let requestApi = RequestUtils.getInstance();
    // 1. 请求 登录
    requestApi
      .login(username, password, self)
      .then(token => {
        console.log('token', token);
        // 获取当前登录的用户，存入store
        return requestApi.request(conf.getInitUrl() , {}, self);
      })
      .then(response => {
        console.info("响应的数据：" + response.data);
        return response.data;
      })
      .then(json => {
        console.log('json', json);
        // 个人信息
        wx.setStorageSync('user', json.me);
        // 咨询纪录患者
        wx.setStorageSync('patientList', json.concerns);
      })
      .catch(function (error) {
        console.log(error);
        self.showErr = true;
        if (ErrorType.NET_ERROR === error.toString()) {
          self.err = '服务通讯失败，请检查服务设置';
        } else {
          self.err = error.toString();
        }
      });
  }
}
// 企业用户登录
export default class MeLogin {
  constructor(app) {
    this._app = app;
  }
  wxLogin() {
    let self = this;
    //登录的信息创建
    wx.login({
      success: function (e) {
        // 定义 WxRequest 的封装对象
        let wxRequestUtil = new WxRequestUtil();
        // Get 请求后台
        wxRequestUtil.doGet(
          api.cpLogin,
          {code: e.code})
          .then(response => {
            console.info("响应的数据：" + response.data);
            return response.data;
          }).then(data => {
            //获取用户的信息
            wx.getUserInfo({
              success: function (res) {
                wxRequestUtil.doGet(api.cpInfo, {
                  sessionKey: data.sessionKey,
                  signature: res.signature,
                  rawData: res.rawData,
                  encryptedData: res.encryptedData,
                  iv: res.iv
                }).then(response => {
                  debugger
                  var result = response.data.result;
                  if (result !=null && result !=undefined){
                    console.info("响应的用户结果数据：" + result);
                    // 1. 先将基本信息存放到本地
                    let userInfo = res.userInfo;
                    let wxUser = {
                      userName: userInfo.nickName,
                      userHeaderUrl: userInfo.avatarUrl,
                      openId: result.userId,
                      id: result.id,
                      unionId: result.unionId
                    }
                    self._app.globalData.userInfo = wxUser;
                    // 2. 获取微信用户信息，开始通信登录
                    api.login(result.userId, result.userId);
                  }
                })
              }
            })
          }).catch(function (err) {
            console.info("失败信息：" + err.errMsg);
          });
        wx.setStorage({
          key: "key",
          data: e.errMsg
        })
      }
    })
  }
}