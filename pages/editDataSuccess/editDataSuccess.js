// pages/editDataSuccess/editDataSuccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 自定义函数事件
   */

  // 跳转个人中心
  toPersonCenter() {
    console.log(`***** 跳转个人中心 *****`);
    wx.switchTab({
      url: '/pages/personCenter/personCenter',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var pages = getCurrentPages();
    console.log(`路由数据：${pages.length}`);
    if (pages.length > 2) {
      // 父级页面实例对象 
      var prePage = pages[pages.length - 3];
      // 触发上个界面的方法 
      prePage.doctorDetail() // 调用个人中心医生详情接口方法
    }

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