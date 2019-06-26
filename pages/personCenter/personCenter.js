// pages/personCenter/personCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 路由传参
    doctorId: '000111', // 医生ID

    //设置用户信息
    userList: [{
      userName: "未获取",
      userHeaderUrl: ""
    }],

    // 医生详情数据
    doctorDetail: '',

    // 是否设置在线
    isOnline: true,

  },

  /**
   * 自定义函数事件
   */
  // 医生详情接口
  doctorDetail: function() {
    var that = this;
    wx.request({
      // url: getApp().globalData.path + `/hospc/lgDoctor/doctor/detail/${that.data.doctorId}/openId`,
      url: 'https://www.easy-mock.com/mock/5d09a09ce9fb5077ed6eb899/api/doctor/detail',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res) {
        console.log('***** 医生详情接口调用 *****');
        console.log(res);
        that.setData({
          // doctorDetail: res.data.result
          doctorDetail: res.data
        });
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
    that.setData({
      isOnline: !that.data.isOnline
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
    var personId = e.currentTarget.id; // 设置二维码页面路由ID
    wx.navigateTo({
      url: `/pages/editData/editData`,
    })
  },

  // 跳转我的评价页面
  toMyEvaluate(e) {
    console.log('***** 跳转我的评价页面 *****');
    console.log(e.currentTarget.id);
    var personId = e.currentTarget.id; // 设置二维码页面路由ID
    wx.navigateTo({
      url: `/pages/myEvaluate/myEvaluate`,
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
    var personId = e.currentTarget.id; // 设置二维码页面路由ID
    wx.navigateTo({
      url: `/pages/replyLanguage/replyLanguage`,
    })
  },

  // 跳转咨询记录页面
  toAdvice(e) {
    console.log('***** 跳转咨询记录页面 *****');
    console.log(e.currentTarget.id);
    var personId = e.currentTarget.id; // 设置二维码页面路由ID
    wx.navigateTo({
      url: `/pages/advice/advice`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log(`***** 进入医生详情页面 *****`);
    console.log(options);
    this.setData({
      // doctorId: options.doctorId
    })

    this.doctorDetail(); // 医生详情接口

    let that = this;
    //登录的信息创建
    wx.login({
      success: function(e) {
        wx.setStorage({
          key: "key",
          data: e.errMsg
        })
      }
    })
    //获取用户的信息
    wx.getUserInfo({
      success: function(res) {
        console.log(`获取用户的信息`);
        console.log(res);
        let userInfo = res.userInfo
        let nickName = userInfo.nickName
        let avatarUrl = userInfo.avatarUrl
        //先将信息存放到本地
        wx.setStorageSync('nickName', nickName);
        wx.setStorageSync('avatarUrl', avatarUrl);

        let user = [{
          userName: nickName,
          userHeaderUrl: avatarUrl,
        }]
        that.setData({
          userList: user,
        })
      },
      fail: function(res) {
        console.log(res);
      }
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