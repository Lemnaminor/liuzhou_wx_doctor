// pages/replyLanguage/replyLanguage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 路由传参
    doctorId: '', // 医生ID

    // 常用回复语数据
    replyLanguageList: [],

    // 显示隐藏弹出层数据
    isShowReplyLanguageModel: false,

  },

  /**
   * 自定义事件方法
   */

  // 常用回复语接口
  replyLanguageList: function () {
    var that = this;
    var doctorId = that.data.doctorId;
    wx.request({
      url: getApp().globalData.path + `/hospc/enterprise/commonReplies?doctorId=${doctorId}`,
      data: {},
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("***** 常用回复语接口 *****")
        console.log(res);
        that.setData({
          replyLanguageList: res.data.data.list
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  // 列表跳转新建回复语页面
  listToBuildReplyLanguage(e){
    console.log(`***** 列表跳转新建回复语页面 *****`);
    console.log(e);
    var that = this;
    var doctorId = that.data.doctorId;
    var replieID = e.currentTarget.dataset.replieid;
    var repliecoment = e.currentTarget.dataset.repliecoment;
    console.log(`replieID值：${replieID},repliecoment值：${repliecoment}`);
    wx.navigateTo({
      url: `/pages/buildReplyLanguage/buildReplyLanguage?doctorId=${doctorId}&replieID=${replieID}&repliecoment=${repliecoment}`,
    })
  },

  // 跳转新建回复语页面
  toBuildReplyLanguage(e) {
    console.log(`***** 跳转新建回复语页面 *****`);
    console.log(e);
    var that = this;
    var doctorId = that.data.doctorId;
    console.log(doctorId);
    wx.navigateTo({
      url: `/pages/buildReplyLanguage/buildReplyLanguage?doctorId=${doctorId}`,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log(`***** 进入常用语回复页面 *****`);
    console.log(options);
    this.setData({
      doctorId: options.doctorId
    })

    wx.showLoading({
      title: '数据加载中',
    })

    this.replyLanguageList(); // 游客评论接口

    wx.hideLoading();

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