// pages/myMoney/myMoney.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 总收入数据
    todayMoney: '110.00',
    monthMoney: '220.00',

    // 今天收入数据列表
    todayMoneyList: [{
        name: '张三',
        time: '16:00',
        money: '100.00'
      },
      {
        name: '张三',
        time: '17:00',
        money: '50.00'
      }
    ],

    // 昨天收入数据列表
    yesterdayMoneyList: [{
        name: '张三',
        time: '16:30',
        money: '10.00'
      },
      {
        name: '张三',
        time: '09:00',
        money: '30.00'
      },
      {
        name: '张三',
        time: '14:00',
        money: '30.00'
      }
    ]

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