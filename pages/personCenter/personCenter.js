// pages/personCenter/personCenter.j
import MeLogin from "../../modules/login/me-Login-qy.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 路由传参
    doctorId: '', // 医生ID

    //设置用户信息
    userList: [{
      userName: "未获取",
      userHeaderUrl: ""
    }],

    // 医生详情数据
    doctorDetail: '',

    // 是否设置在线
    isOnline: '',

    // 禁止点击样式
    isDisabled: true,

  },

  /**
   * 自定义函数事件
   */
  // 医生详情接口
  doctorDetail: function() {
    var that = this;
    var doctorId = that.data.doctorId;
    wx.request({
      url: getApp().globalData.path + `/enterprise/mycenter?doctorId=${doctorId}`,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res) {
        console.log('***** 医生详情接口调用 *****');
        console.log(res);
        that.setData({
          doctorDetail: res.data.data
        });
        if (res.data.data.onlineState == 0){ // 0-离线
          that.setData({
            isOnline: false
          })
        }else{
          that.setData({// 1-在线
            isOnline: true
          })
        }
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  // 设置是否上线
  setOnline(e){
    console.log(`***** 设置是否上线 *****`);
    console.log(e)
    var that = this;
    var isOnline = e.currentTarget.id;
    var doctorId = that.data.doctorId;
    var consulStatus;
    if (isOnline == 'true'){
      consulStatus = 0
    }else{
      consulStatus = 1
    }
    console.log(`在线状态：${consulStatus}`);
    wx.request({
      url: getApp().globalData.path + `/enterprise/exitonlinestate`,
      data: {
        doctorId: that.data.doctorId,
        consulStatus: consulStatus
      },
      method: 'POST', 
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('***** 改变上线、离线状态成功 *****');
        console.log(res);
        console.log(res.data.code);
        if(res.data.code == 0){
          wx.showToast({
            title: '设置成功',
            icon: 'none'
          })
          that.setData({
            isOnline: !that.data.isOnline
          })
        }else{
          wx.showToast({
            title: '设置失败',
            icon: 'none'
          })
          isOnline: isOnline
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })

    console.log(that.data.isOnline)
  },

  // 跳转我的名片二维码
  toQrcode(e) {
    console.log('***** 跳转我的名片二维码 *****');
    console.log(e.currentTarget.id);
    var personId = e.currentTarget.id; // 设置二维码页面路由ID
    wx.navigateTo({
      url: `/pages/qrcode/qrcode?orderId=${personId}`,
    })
  },

  // 跳转编辑资料页面
  toEditData(e) {
    console.log('***** 跳转编辑资料页面 *****');
    console.log(e.currentTarget.id);
    var doctorId = e.currentTarget.id;
    wx.navigateTo({
      url: `/pages/editData/editData?doctorId=${doctorId}`,
    })
  },

  // 跳转我的评价页面
  toMyEvaluate(e) {
    console.log('***** 跳转我的评价页面 *****');
    console.log(e.currentTarget.id);
    var doctorId = e.currentTarget.id;
    wx.navigateTo({
      url: `/pages/myEvaluate/myEvaluate?doctorId=${doctorId}`,
    })
  },

  // 跳转我的收入页面
  toMyMoney(e) {
    console.log('***** 跳转我的收入页面 *****');
    console.log(e.currentTarget.id);
    var personId = e.currentTarget.id; // 设置二维码页面路由ID
    wx.navigateTo({
      url: `/pages/myMoney/myMoney`,
    })
  },

  // 跳转常用回复页面
  toReplyLanguage(e) {
    console.log('***** 跳转常用回复页面 *****');
    console.log(e.currentTarget.id);
    var doctorId = e.currentTarget.id;
    wx.navigateTo({
      url: `/pages/replyLanguage/replyLanguage?doctorId=${doctorId}`,
    })
  },

  // 跳转咨询记录页面
  toAdvice(e) {
    console.log('***** 跳转咨询记录页面 *****');
    console.log(e.currentTarget.id);
    var doctorId = e.currentTarget.id;
    wx.navigateTo({
      url: `/pages/advice/advice?doctorId=${doctorId}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log(`***** 进入医生个人中心页面 *****`);
    let userInfo = getApp().globalData.userInfo;

    if (userInfo == null) {
      let meLogin = new MeLogin(getApp());
      meLogin.wxLogin();
      userInfo = wx.getStorageSync('userInfo');
    }

    this.setData({
      doctorId: userInfo.id
    })
    this.doctorDetail(); // 医生详情接口
    let that = this;
    //获取用户的信息
    let user = [{
      userName: userInfo.userName,
      userHeaderUrl: userInfo.userHeaderUrl,
    }]
    that.setData({
      userList: user,
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})