// pages/doctorTask/doctorTask.js
const app = getApp()
var sliderWidth = 100; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // tab导航数据
    tabs: ["全部", "进行中", "未开始"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    // 全部任务列表数据
    allDoctorTaskList: [{
      userId: '000001',
      userIcon: '../../images/head1.jpg',
      name: '张三',
      sex: '男',
      age: '20',
      status: '0',
      endTime: '6',
    }, {
      userId: '000002',
      userIcon: '../../images/head2.jpg',
      name: '李四',
      sex: '男',
      age: '30',
      status: '1',
      endTime: '3',
    }],

    // 进行中-任务列表数据
    beingDoctorTaskList: [{
      userId: '000001',
      userIcon: '../../images/head1.jpg',
      name: '张三',
      sex: '男',
      age: '20',
      status: '0',
      endTime: '6',
    }],

    // 未开始-任务列表数据
    noDoctorTaskList: [{
      userId: '000002',
      userIcon: '../../images/head2.jpg',
      name: '李四',
      sex: '男',
      age: '30',
      status: '1',
      endTime: '3',
    }],    

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

  // 全部-数据请求
  allDoctorTaskList() {
    var that = this;
    wx.request({
      url: app.globalData.path + '/hospc/lgDoctor/doctor/consultationRecords/openId/1/10/1',
      data: {},
      method: 'GET',
      success: function (res) {
        console.log('***** 全部-数据请求 *****');
        console.log(res);
        that.setData({
          allDoctorTaskList: res.data.result.list
        });
      },
      fail: function () {

      }
    })
  },

  // 进行中-数据请求
  beingDoctorTaskList() {
    var that = this;
    wx.request({
      url: app.globalData.path + '/hospc/lgDoctor/doctor/consultationRecords/openId/1/10/1',
      data: {},
      method: 'GET',
      success: function (res) {
        console.log('***** 进行中-数据请求 *****');
        console.log(res);
        that.setData({
          beingDoctorTaskList: res.data.result.list
        });
      },
      fail: function () {

      }
    })
  },

  // 未开始-数据请求
  noDoctorTaskList() {
    var that = this;
    wx.request({
      url: app.globalData.path + '/hospc/lgDoctor/doctor/consultationRecords/openId/1/10/1',
      data: {},
      method: 'GET',
      success: function (res) {
        console.log('***** 未开始-数据请求 *****');
        console.log(res);
        that.setData({
          noDoctorTaskList: res.data.result.list
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