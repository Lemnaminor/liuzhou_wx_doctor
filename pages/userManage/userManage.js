// pages/userManage/userManage.js
const app = getApp()
var sliderWidth = 100; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 路由传参
    doctorId: '1', // 医生ID

    // tab导航数据
    tabs: ["全部患者", "星标患者"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    // 全部患者数据
    allUserManageList: [],

    // 星标患者数据
    starUserManageList: [],

  },

  /**
   * 自定义事件方法
   */
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });

    //tab切换判断内容是否为空请求数据
    var index = parseInt(e.currentTarget.id);
    switch (index) {
      case 0:
        console.log(`全部患者`);
        this.allUserManageList();
        break;
      case 1:
        console.log(`星标患者`);
        this.starUserManageList();
        break;
    }

  },

  // 全部患者-数据请求
  allUserManageList() {
    var that = this;
    var doctorId = that.data.doctorId;
    console.log(doctorId);
    wx.request({
      url: app.globalData.path + `/hospc/enterprise/findPatients?doctorId=${doctorId}`,
      data: {},
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log('***** 全部患者-数据请求 *****');
        console.log(res);
        that.setData({
          allUserManageList: res.data.data.list
        });
      },
      fail: function() {

      }
    })
  },

  // 星标患者-数据请求
  starUserManageList() {
    var that = this;
    var doctorId = that.data.doctorId;
    console.log(doctorId);
    wx.request({
      url: app.globalData.path + `/hospc/enterprise/findPatManById?doctorId=${doctorId}`,
      data: {},
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('***** 星标患者-数据请求 *****');
        console.log(res);
        that.setData({
          starUserManageList: res.data.data.list
        });
      },
      fail: function () {

      }
    })
  },

  // 跳转患者管理详情
  toUserManageDetail(e) {
    console.log('***** 跳转患者管理详情 *****');
    console.log(e);
    var that = this;
    var doctorId = that.data.doctorId;
    var thePatientId = e.currentTarget.id;
    console.log(thePatientId);
    wx.navigateTo({
      url: `/pages/userManageDetail/userManageDetail?doctorId=${doctorId}&thePatientId=${thePatientId}`,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log(`***** 进入患者管理页面 *****`);
    // console.log(options);
    // this.setData({
    //   doctorId: options.doctorId
    // })

    wx.showLoading({
      title: '数据加载中',
    })

    this.allUserManageList(); // 全部患者接口

    wx.hideLoading();


    //tab切换
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
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

    var index = parseInt(this.data.activeIndex);

    switch (index) {
      case 0:
        console.log(`进行中`);
        this.beingAdviceList();
        break;
      case 1:
        console.log(`已完成`);
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
  onReachBottom: function() {

    console.log("上拉触底");
    var index = parseInt(this.data.activeIndex);

    switch (index) {
      case 0:
        console.log(`进行中`);
        this.beingAdviceList();
        break;
      case 1:
        console.log(`已完成`);
        this.successAdviceList();
        break;
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})