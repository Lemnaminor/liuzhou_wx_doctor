// pages/doctorTask/doctorTask.js
const app = getApp()
var sliderWidth = 100; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 路由传参
    doctorId: '1', // 医生ID

    // 任务状态数据
    consulStatus: '',

    // tab导航数据
    tabs: ["全部", "进行中", "未开始"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    // 全部任务列表数据
    allDoctorTaskList: [],

    // 进行中-任务列表数据
    beingDoctorTaskList: [],

    // 未开始-任务列表数据
    noDoctorTaskList: [],    

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
    var that = this;
    var index = parseInt(e.currentTarget.id);
    switch (index) {
      case 0:
        console.log(`全部`);
        this.allDoctorTaskList();
        break;
      case 1:
        console.log(`进行中`);
        that.setData({
          consulStatus: '1'
        })
        this.beingDoctorTaskList();
        break;
      case 2:
        console.log(`未开始`);
        that.setData({
          consulStatus: '2'
        })
        this.noDoctorTaskList();
        break;
    }

  },

  // 全部-数据请求
  allDoctorTaskList() {
    var that = this;
    var doctorId = that.data.doctorId;
    wx.request({
      url: app.globalData.path + `/hospc/doctorTask/finddoctorTask?doctorId=${doctorId}`,
      data: {},
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('***** 全部-数据请求 *****');
        console.log(res);
        that.setData({
          allDoctorTaskList: res.data.data.list
        });
      },
      fail: function () {

      }
    })
  },

  // 进行中-数据请求
  beingDoctorTaskList() {
    var that = this;
    var doctorId = that.data.doctorId;
    var consulStatus = that.data.consulStatus;
    wx.request({
      url: app.globalData.path + `/hospc/doctorTask/finddoctorTaskBydoctorId?doctorId=${doctorId}&consulStatus=${consulStatus}`,
      data: {},
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('***** 进行中-数据请求 *****');
        console.log(res);
        that.setData({
          beingDoctorTaskList: res.data.data.list
        });
      },
      fail: function () {

      }
    })
  },

  // 未开始-数据请求
  noDoctorTaskList() {
    var that = this;
    var doctorId = that.data.doctorId;
    var consulStatus = that.data.consulStatus;
    wx.request({
      url: app.globalData.path + `/hospc/doctorTask/finddoctorTaskBydoctorId?doctorId=${doctorId}&consulStatus=${consulStatus}`,
      data: {},
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('***** 未开始-数据请求 *****');
        console.log(res);
        that.setData({
          noDoctorTaskList: res.data.data.list
        });
      },
      fail: function () {

      }
    })
  },

  // 跳转聊天页面
  toConsult(e){
    console.log(`***** 跳转聊天页面 *****`);
    console.log(e);
    var userId = e.currentTarget.id;
    console.log(userId);
    wx.navigateTo({
      url: `/pages/consult/consult?userId=${userId}`,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

    this.allDoctorTaskList();

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

    var index = parseInt(this.data.activeIndex);

    switch (index) {
      case 0:
        console.log(`全部`);
        this.allDoctorTaskList();
        break;
      case 1:
        console.log(`进行中`);
        this.beingDoctorTaskList();
        break;
      case 2:
        console.log(`未开始`);
        this.noDoctorTaskList();
        break;
    }

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

    console.log("上拉触底");
    var index = parseInt(this.data.activeIndex);

    switch (index) {
      case 0:
        console.log(`全部`);
        this.allDoctorTaskList();
        break;
      case 1:
        console.log(`进行中`);
        this.beingDoctorTaskList();
        break;
      case 2:
        console.log(`未开始`);
        this.noDoctorTaskList();
        break;
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})