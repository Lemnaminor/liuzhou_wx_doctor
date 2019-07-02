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

    pageIndex: 1, // 请求页索引
    pageSize: 10, // 请求数据条数
    pageCount: 0, // 总页数
    amount: 0, // 总条数

  },

  /**
   * 自定义函数事件
   */
  // 游客评价接口
  evaluateList: function() {
    var that = this;
    var pageIndex = that.data.pageIndex;
    var pageSize = that.data.pageSize;
    console.log(`游客评价接口：当前页：${pageIndex},显示条数：${pageSize}`);
    wx.request({
      url: getApp().globalData.path + `/hospc/enterprise/myEvaluateNum`,
      data: {
        doctorId: that.data.doctorId,
        pageIndex: that.data.pageIndex,
        pageSize: that.data.pageSize
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log("***** 游客评价接口 *****")
        console.log(res);
        if (res.data.code == 0) {
          wx.showLoading({
            title: '数据加载中',
          })
          var tempList = that.data.evaluateList
          var tempPageIndex = that.data.pageIndex;
          if (that.data.pageIndex == 1) {
            tempList = res.data.data.list;
            tempPageIndex = 1;
          } else {
            tempList = tempList.concat(res.data.data.list);
            tempPageIndex = tempPageIndex + 1;
          }
          that.setData({
            pageIndex: tempPageIndex,
            pageNum: res.data.data.pageSize,
            pageCount: res.data.data.pages,
            amount: res.data.data.total,
            evaluateList: tempList
          });
          wx.hideLoading();

        } else {
          wx.showToast({
            title: '网络请求错误',
            icon: 'none'
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
      title: '数据加载中'
    })
    this.data.pageIndex = 1;
    this.evaluateList(); // 游客评价接口
    wx.hideLoading();
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

    if (this.data.pageIndex < this.data.pageCount) {
      this.data.pageIndex++;
      this.evaluateList();
    } else {
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none'
      })
    }


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})