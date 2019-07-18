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

  // 审核查询
  toPersonCenter() { //查询
    console.log(`***** 审核查询 *****`);
    wx.request({
      url: getApp().globalData.path + `/enterprise/YnAuthorization`,
      data: {
        userId: "789456" //zyqt18089566892 ，访问地址，后台赋值
      },
      method: 'GET',
      success: function (res) {
        console.log('***** 查询用户是否存在，编写审核信息 *****');
        console.log(res);
        if (res.data.code != -1) {
          if (res.data.data.approvalState == 2) {
            console.log("审核通过");
            wx.navigateTo({
              url: '/pages/authorize/authorize',
            })
          }  
        
        }
      },
      fail: function () {

      }
    })
   /*  wx.switchTab({
      url: '/pages/personCenter/personCenter',
    }) */
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