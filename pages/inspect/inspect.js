// pages/inspect/inspect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 患者ID
    PatientId: '0000676543',

    // 检验报告列表数据
    inspectList: [{
      "createDate": "2019-06-27 08:36:55",
      "reportNo": "6758081",     //编号
      "itemClass": "甲功5",   //项目类
      "itemSubClass": "血清",  //项目子类
      "reportDate": "2019-06-27 09:42:04",  //报告时间
      "reportStatus": "report"
    },
      {
        "createDate": "2019-06-26 17:42:27",
        "reportNo": "6756239",
        "itemClass": "(J)肾4,(J)糖,(J)心4,(J)电4,(J)肝10",
        "itemSubClass": "血清",
        "reportDate": "2019-06-26 18:11:20",
        "reportStatus": "report"
      }, {
        "createDate": "2019-06-27 08:36:55",
        "reportNo": "6758081",     //编号
        "itemClass": "甲功5",   //项目类
        "itemSubClass": "血清",  //项目子类
        "reportDate": "2019-06-27 09:42:04",  //报告时间
        "reportStatus": "report"
      },
      {
        "createDate": "2019-06-26 17:42:27",
        "reportNo": "6756239",
        "itemClass": "(J)肾4,(J)糖,(J)心4,(J)电4,(J)肝10",
        "itemSubClass": "血清",
        "reportDate": "2019-06-26 18:11:20",
        "reportStatus": "report"
      }, {
        "createDate": "2019-06-27 08:36:55",
        "reportNo": "6758081",     //编号
        "itemClass": "甲功5",   //项目类
        "itemSubClass": "血清",  //项目子类
        "reportDate": "2019-06-27 09:42:04",  //报告时间
        "reportStatus": "report"
      },
      {
        "createDate": "2019-06-26 17:42:27",
        "reportNo": "6756239",
        "itemClass": "(J)肾4,(J)糖,(J)心4,(J)电4,(J)肝10",
        "itemSubClass": "血清",
        "reportDate": "2019-06-26 18:11:20",
        "reportStatus": "report"
      }],
    pageIndex: 1, // 请求页索引
    pageNum: 5, // 请求数据条数
    pageCount: 0, // 总页数
    amount: 0, // 总条数

  },

  /**
   * 自定义函数事件
   */
  // 检验报告列表接口
  inspectList(){
    var that = this;
    console.log(`请求检验报告接口：当前页：${that.data.pageIndex},总页数：${that.data.pageCount},显示条数：${that.data.pageNum}`);
    wx.request({
      url: getApp().globalData.path + `/enterprise/inspectTestList`,
      data: {
        PatientId: that.data.PatientId
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("***** 检验报告接口成功 *****")
        console.log(res);
        if (res.data.code == 0) {
          wx.showLoading({
            title: '数据加载中',
          })
          var tempList = that.data.inspectList
          var tempPageIndex = that.data.pageIndex;
          if (that.data.pageIndex == 1) {
            tempList = res.data.data.list;
            tempPageIndex = 1;
          } else {
            tempList = tempList.concat(res.data.data.list);
          }
          that.setData({
            pageIndex: tempPageIndex,
            pageNum: res.data.data.pageSize,
            pageCount: res.data.data.pages,
            amount: res.data.data.total,
            inspectList: tempList
          });
          wx.hideLoading();

        } else {
          wx.showToast({
            title: '网络请求错误',
            icon: 'none'
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

  // 跳转检验报告详情
  toInspectDetail(){
    console.log(`***** 跳转检验报告详情 *****`);
    var that = this;
    wx.navigateTo({
      url: `/pages/inspectDetail/inspectDetail?PatientId=${that.data.PatientId}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(`***** 进入检验报告页面 *****`);

    wx.showLoading({
      title: '数据加载中',
    })

    // this.inspectList();

    wx.hideLoading();

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

    console.log('下拉刷新');
    wx.showLoading({
      title: '数据加载中'
    })
    this.data.pageIndex = 1;
    this.inspectList(); // 游客评价接口
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
  onReachBottom: function () {

    console.log("上拉触底");

    console.log(`页数：${this.data.pageIndex}，总页数：${this.data.pageCount}`);
    if (this.data.pageIndex < this.data.pageCount) {
      this.data.pageIndex += 1;
      console.log(`当前页数：${this.data.pageIndex}`);
      this.inspectList();
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
  onShareAppMessage: function () {

  }
})