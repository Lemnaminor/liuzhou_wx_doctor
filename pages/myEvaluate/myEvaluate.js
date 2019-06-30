// pages/myEvaluate/myEvaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 路由传参
    doctorId: '', // 医生ID

    // 星星数量
    starList: [{
      id: 1
    }, {
      id: 2
    }, {
      id: 3
    }, {
      id: 4
    }, {
      id: 5
    }],
    starActive: 4,

    // 评价总条数
    evaluateCount: 0,

    // 游客评价数据
    evaluateList:[],

  },

  /**
   * 自定义函数事件
   */
  // 游客评价接口
  evaluateList: function() {
    var that = this;
    var doctorId = that.data.doctorId;
    wx.request({
      url: getApp().globalData.path + `/hospc/enterprise/myEvaluateNum?doctorId=${doctorId}`,
      data: {},
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log("***** 游客评价接口 *****")
        console.log(res);
        that.setData({
          evaluateList: res.data.data,
          evaluateCount: res.data.data.length
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log(`***** 进入我的评价页面 *****`);
    console.log(options);
    this.setData({
      doctorId: options.doctorId
    })

    wx.showLoading({
      title: '数据加载中',
    })

    this.evaluateList(); // 游客评论接口

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

    console.log('下拉刷新');
    wx.showLoading({
      title: '数据加载中',
      duration: 1000
    })
    this.evaluateList(); // 游客评价接口
    wx.showToast({
      title: '数据已刷新',
      icon: 'success',
      duration: 1500
    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

    console.log("上拉触底");




  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})