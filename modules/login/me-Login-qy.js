
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
        return requestApi.request(conf.getInitUrl(), {}, self);
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
    // 1. 检查登录是否过期
    wx.qy.checkSession({
      success: function () {
        //session_key 未过期，并且在本生命周期一直有效
        //session_key 未过期，并且在本生命周期一直有效
        console.info("用户的在线数据：" + self._app.globalData.userInfo);
        let userInfo = wx.getStorageSync('userInfo');
        self._app.globalData.userInfo = userInfo;
        console.info("用户的在线数据：" + userInfo);
        api.login(userInfo.userId, userInfo.userId);
        //console.info("用户的在线数据：" + self._app.globalData.userInfo);
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
        //重新登录
        wx.login({
          success: function (res) {
            if (res.code) {
              // 定义 WxRequest 的封装对象
              let wxRequest = WxRequestUtil.getInstance();
              wxRequest.doGet(
                api.cpLogin,
                {
                  agentId: conf.agentId,
                  code: res.code
                }
              ).then(response=> {
                let result = response.data.result;
                console.info("响应的用户结果数据：" + result);
                // 1. 先将基本信息存放到本地
                let wxUser = {
                  userName: result.doctorName,
                  userHeaderUrl: result.doctorIcon,
                  userId: result.userId,
                  id: result.id,
                  deptId: result.deptId
                }
                wx.setStorageSync('userInfo', wxUser);
                self._app.globalData.userInfo = wxUser;
                self._app.globalData.doctorId = result.id;
                // 2. 获取微信用户信息，开始通信登录
                api.login(result.userId, result.userId);


              }).catch(err=>{
                console.log('失败信息:' + err.errMsg);
              });
            } else {
              console.log('登录失败！' + res.errMsg);
            }
          }
        });
      }
    });
  }
}
/* 
wx.qy.login({
  success: function (res) {
    if (res.code) {
      // 定义 WxRequest 的封装对象
      let wxRequest = WxRequestUtil.getInstance();
      //发起网络请求

      wxRequest.doGet(api.cpInfo, {
        agentId: conf.agentId,
        code: res.code
      }).then(response => {
        result = response.data.result;
        console.info("响应的用户结果数据：" + result);
        // 1. 先将基本信息存放到本地
        let userInfo = res.userInfo;
        let wxUser = {
          userName: userInfo.nickName,
          userHeaderUrl: userInfo.avatarUrl,
          userId: result.userId,
          id: result.id,
          deptId: result.deptId
        }

        self._app.globalData.userInfo = wxUser;
        // 2. 获取微信用户信息，开始通信登录
        var result = response.data.result;
        api.login(result.userId, result.userId);
      });

    } else {
      console.log('登录失败！' + res.errMsg)
    }
  }
}); 

wx.qy.login({
  success: function (res) {
    if (res.code) {

      wx.getUserInfo({
        success: function (res) {
          // 定义 WxRequest 的封装对象
          let wxRequest = WxRequestUtil.getInstance();

          wxRequest.doGet(api.cpInfo, {
            signature: res.signature,
            rawData: res.rawData,
            encryptedData: res.encryptedData,
            iv: res.iv
          })
        }
      });
    } else {
      console.log('登录失败！' + res.errMsg)
    }
  }
});

*/