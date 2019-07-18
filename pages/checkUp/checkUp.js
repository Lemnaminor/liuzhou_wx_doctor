// pages/checkUp/checkUp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 公众号url
    toCheckUpUrl: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    var thePatientId = options.thePatientId; //获取到小程序其他页面传来的电话号码；
    var url = `http://jklz.eimageglobal.com/cloudfilm/hosReportList?sickId=0000757622&hospitalId=07720022`;
    this.setData({
      toCheckUpUrl: url
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