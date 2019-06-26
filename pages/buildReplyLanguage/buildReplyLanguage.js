// pages/buildReplyLanguage/buildReplyLanguage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 描述信息
    placeholder: "您可以在这里书写详细评价。",
    textMaxLength: 500,
    writeLength: 0,
    isShowMask: true,
    content: '',

  },

  /**
   * 自定义函数事件
   */

  // 提交保存
  formSubmit(){
    console.log(`***** 提交保存 *****`);
  },

  // 字数输入
  bindText(e) {
    console.log('***** 字数输入 *****')
    var that = this;
    var len = e.detail.value.length;
    var cont = e.detail.value;
    that.setData({
      writeLength: len,
      content: cont
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})