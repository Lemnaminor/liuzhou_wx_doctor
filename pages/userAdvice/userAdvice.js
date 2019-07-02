// pages/advice/advice.js
const app = getApp()
var sliderWidth = 100; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 路由传参
    doctorId: '1', // 患者ID

    // 咨询状态数据
    consulStatus: '2',

    // tab导航数据
    tabs: ["进行中", "已完成"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    // 咨询记录-进行中数据
    beingAdviceList: [],
    pageIndex: 1, // 请求页索引
    pageNum: 10, // 请求数据条数
    pageCount: 0, // 总页数
    amount: 0, // 总条数

    // 咨询记录-已完成数据
    successAdviceList: [],
    pageIndex2: 1, // 请求页索引
    pageNum2: 10, // 请求数据条数
    pageCount2: 0, // 总页数
    amount2: 0, // 总条数

  },

  /**
   * 自定义事件方法
   */
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });

    //tab切换判断内容是否为空请求数据
    var that = this;
    var index = parseInt(e.currentTarget.id);
    switch (index) {
      case 0:
        console.log(`进行中`);
        that.setData({
          consulStatus: '2'
        })
        this.beingAdviceList();
        break;
      case 1:
        console.log(`已完成`);
        that.setData({
          consulStatus: '3'
        })
        this.successAdviceList();
        break;
    }

  },

  // 进行中-数据请求
  beingAdviceList() {
    var that = this;
    var pageIndex = that.data.pageIndex;
    var pageNum = that.data.pageNum;
    console.log(`进行中：当前页：${pageIndex},显示条数：${pageNum}`);
    wx.request({
      url: app.globalData.path + `/hospc/enterprise/consultationRecords`,
      data: {
        doctorId: that.data.doctorId,
        consulStatus: that.data.consulStatus,
        pageIndex: that.data.pageIndex,
        pageNum: that.data.pageNum
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('***** 进行中-数据请求 *****');
        console.log(res);
        if (res.data.code == 0) {
          wx.showLoading({
            title: '数据加载中',
          })
          var tempList = that.data.beingAdviceList
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
            beingAdviceList: tempList
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

      }
    })
  },

  // 已完成-数据请求
  successAdviceList() {
    var that = this;
    var pageIndex = that.data.pageIndex2;
    var pageNum = that.data.pageNum2;
    console.log(`已完成：当前页：${pageIndex},显示条数：${pageNum}`);
    wx.request({
      url: app.globalData.path + `/hospc/enterprise/consultationRecords`,
      data: {
        doctorId: that.data.doctorId,
        consulStatus: that.data.consulStatus,
        pageIndex: that.data.pageIndex2,
        pageNum: that.data.pageNum2
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('***** 已完成-数据请求 *****');
        console.log(res);
        if (res.data.code == 0) {
          wx.showLoading({
            title: '数据加载中',
          })
          var tempList = that.data.successAdviceList
          var tempPageIndex = that.data.pageIndex2;
          if (that.data.pageIndex2 == 1) {
            tempList = res.data.data.list;
            tempPageIndex = 1;
          } else {
            tempList = tempList.concat(res.data.data.list);
            tempPageIndex = tempPageIndex + 1;
          }
          that.setData({
            pageIndex2: tempPageIndex,
            pageNum2: res.data.data.pageSize,
            pageCount2: res.data.data.pages,
            amount2: res.data.data.total,
            successAdviceList: tempList
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

      }
    })
  },

  // 进行中-跳转咨询页面
  toConsult() {
    console.log('***** 进行中-跳转咨询页面 *****');
    wx.navigateTo({
      url: '/pages/consult/consult',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(`***** 进入我的评价页面 *****`);
    console.log(options);
    this.setData({
      // doctorId: options.thePatientId
    })

    wx.showLoading({
      title: '数据加载中',
    })

    this.beingAdviceList(); // 进行中-咨询记录接口

    wx.hideLoading();

    //tab切换
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

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
      title: '数据加载中',
      duration: 1000
    })

    var index = parseInt(this.data.activeIndex);

    switch (index) {
      case 0:
        console.log(`进行中`);
        this.data.pageIndex = 1;
        this.beingAdviceList();
        break;
      case 1:
        console.log(`已完成`);
        this.data.pageIndex2 = 1;
        this.successAdviceList();
        break;
    }

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
    var that = this;
    var index = parseInt(this.data.activeIndex);

    switch (index) {
      case 0:
        console.log(`进行中`);
        if (this.data.pageIndex < this.data.pageCount) {
          this.data.pageIndex++;
          this.beingAdviceList();
          var that = this;
        } else {
          wx.showToast({
            title: '没有更多数据了',
            icon: 'none'
          })
        }
        break;
      case 1:
        console.log(`已完成`);
        if (this.data.pageIndex2 < this.data.pageCount2) {
          this.data.pageIndex2++;
          this.successAdviceList();
          var that = this;
        } else {
          wx.showToast({
            title: '没有更多数据了',
            icon: 'none'
          })
        }
        break;
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})