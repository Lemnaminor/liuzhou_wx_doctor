//app.js
import MeLogin from "./modules/login/me-Login";
import ImChat from "./modules/chat/Im-Chat";
import RequestUtils from "./utils/render/util/RequestUtils";
App({
  $store: null,
  $requestApi: null,
  $imChat: null,
  onLaunch: function () {

    // 初始化 实例对象
    //this.$requestApi = new RequestUtils();
    this.$imChat = new ImChat(this);

    let meLogin = new MeLogin(this);
    meLogin.wxLogin();
    console.log(`***** 进入app.js文件 *****`);

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now()) 
    wx.setStorageSync('logs', logs)
    /* 
    var that = this;
    wx.request({
      url: that.globalData.path + `/enterprise/findPersCenterUserId?userId=1`,
      data: {},
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('***** 请求doctorId接口 *****');
        console.log(res);
        var doctorId = res.data.data.id;
        that.globalData.doctorId = doctorId;
        console.log(`公共doctorId值：${that.globalData.doctorId}`)
      },
      fail: function () {

      }
    })
   */
  },
  globalData: {
    token: null,
    userInfo: null,
    // 应用ID: 医生在线询诊 
    agentId: 1000034,
    doctorId: '',
    // path : `http://10.35.112.203:8080`
    // path: `http://172.28.17.11:8080`
    path: `http://111.12.86.168:8081`
  },
  wxStore: {
    //刷新token 定时器
    flushTokenTimerId: null,
    //设置刷新 Token 定时器
    setFlushTokenTimerId: function (flushTokenTimerId) {
      this.flushTokenTimerId = flushTokenTimerId;
    },
    //清除刷新 Token 定时器
    clearFlushTokenTimerId: function () {
      clearTimeout(this.flushTokenTimerId);
    }
  }
})