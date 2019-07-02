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

    pageIndex: 1, // 请求页索引
    pageNum: 15, // 请求数据条数
    pageCount: 0, // 总页数
    amount: 0, // 总条数

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
    var pageIndex = that.data.pageIndex;
    var pageNum = that.data.pageNum;
    console.log(`常用回复语接口：当前页：${pageIndex},显示条数：${pageNum}`);
    wx.request({
      url: getApp().globalData.path + `/hospc/enterprise/commonReplies`,
      data: {
        doctorId: doctorId,
        pageIndex: that.data.pageIndex,
        pageNum: that.data.pageNum
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("***** 常用回复语接口 *****")
        console.log(res);
        if (res.data.code == 0) {
          wx.showLoading({
            title: '数据加载中',
          })
          var tempList = that.data.replyLanguageList
          var tempPageIndex = that.data.pageIndex;
          if (that.data.pageIndex == 1) {
            tempList = res.data.data.list;
            tempPageIndex = 1;
          } else {
            tempList = tempList.concat(res.data.data.list);
            // tempPageIndex = tempPageIndex + 1;
          }
          that.setData({
            pageIndex: tempPageIndex,
            pageNum: res.data.data.pageSize,
            pageCount: res.data.data.pages,
            amount: res.data.data.total,
            replyLanguageList: tempList
          });
          wx.hideLoading();

        } else {
          wx.showToast({
            title: '网络请求错误',
          })
        }
  
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

    console.log('下拉刷新');
    wx.showLoading({
      title: '数据加载中',
    })
    this.data.pageIndex = 1;
    this.replyLanguageList(); 
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
    var that = this;
    if (this.data.pageIndex < this.data.pageCount) {
  
      this.data.pageIndex += 1;
      this.replyLanguageList();
      var that = this;

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