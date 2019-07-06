
import RequestUtils from "../../utils/render/util/RequestUtils";
import conf from "../../utils/render/conf/index.js";
import WxRequestUtil from "../../utils/render/util/WxRequestUtil";
import { ErrorType } from '../../utils/render/util/ChatUtils';

const api = {
  cpInfoUrl: "/wx/cp/doctor/" + conf.agentId + "/cpInfo",
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

        return response.data;
      })
      .then(json => {
        console.log('json', json);

        //把群组封装到map中
        let chatMap = new Map();
        json.groups.forEach(group => {
          chatMap.set(group.id, group);
        });
        // 个人信息
        wx.setStorageSync('user', json.me);
        // 关注用户
        wx.setStorageSync('concernList', json.concerns);
        // 聊天组
        wx.setStorageSync('groupList', json.groups);
        wx.setStorageSync('chatMap', chatMap);
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
// 用户登录
export default class MeLogin {
  constructor(app) {
    this._app = app;
  }
  wxLogin(){
    let self = this;
    //登录的信息创建
    wx.login({
      success: function (e) {
        // 定义 WxRequest 的封装对象
        let wxRequestUtil = new WxRequestUtil();
        // Get 请求后台
        wxRequestUtil.doGet(
          api.cpInfoUrl,
          { code: e.code })
          .then(response => {
            debugger 
            console.info("响应的数据：" + response.data);
            return response.data;
          }).then(data => {
            //获取用户的信息
            var result = data.result;
            console.info("响应的用户结果数据：" + result);
            //api.login(result.openId, result.openId);
          }).catch(function (err) {
            console.info("失败信息：" + err.errMsg);
          });
      }
    })
  }
}