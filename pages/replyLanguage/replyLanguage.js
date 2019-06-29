// pages/replyLanguage/replyLanguage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 常用回复语数据
    replyLanguageList: [
      '这样的症状持续几天了？',
      '祝您健康。'
    ],

    // 显示隐藏弹出层数据
    isShowReplyLanguageModel: false,

  },

  /**
   * 自定义事件方法
   */

  // 跳转新建回复语页面
  toBuildReplyLanguage() {
    console.log(`***** 跳转新建回复语页面 *****`);
    wx.navigateTo({
      url: '/pages/buildReplyLanguage/buildReplyLanguage',
    })
  },

  // 跳转新建回复语页面
  toBuildReplyLanguage(e){
    console.log(`***** 跳转新建回复语页面 *****`);
    console.log(e);
    var msgId = e.currentTarget.id;
    console.log(msgId);
    wx.navigateTo({
      url: `/pages/buildReplyLanguage/buildReplyLanguage?msgId=${msgId}`,
    })
  },

  // 删除常用语
  deleteLanguage() {
    console.log(`***** 删除常用语 *****`);
    var that = this;
    that.setData({
      isShowReplyLanguageModel: !that.data.isShowReplyLanguageModel
    })
    wx.showToast({
      title: '删除成功',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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