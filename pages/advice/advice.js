// pages/advice/advice.js
const app = getApp()
var sliderWidth = 100; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 路由传参
    doctorId: '', // 医生ID

    // tab导航数据
    tabs: ["进行中", "已完成"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    // 咨询记录-进行中数据
    beingAdviceList: [{
      doctorIcon: '../../images/head1.jpg',
      doctorName: '张三',
      sex: '男',
      age: '20',
      content: '请问手术大概多少费用？',
      time: '2019-06-06',
    }],

    // 咨询记录-已完成数据
    successAdviceList: [{
      doctorIcon: '../../images/head2.jpg',
      doctorName: '张三',
      sex: '男',
      age: '20',
      content: '请问手术大概多少费用？',
      time: '2019-06-06',
    }, {
      doctorIcon: '../../images/head4.jpg',
      doctorName: '李四',
      sex: '男',
      age: '33',
      content: '医生你好。',
      time: '2019-06-06',
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
        console.log(`进行中`);
        this.beingAdviceList();
        break;
      case 1:
        console.log(`已完成`);
        this.successAdviceList();
        break;
    }

  },

  // 进行中-数据请求
  beingAdviceList() {
    var that = this;
    wx.request({
      url: app.globalData.path + '/hospc/lgDoctor/doctor/consultationRecords/openId/1/10/1',
      data: {},
      method: 'GET',
      success: function(res) {
        console.log('***** 进行中-数据请求 *****');
        console.log(res);
        that.setData({
          beingAdviceList: res.data.result.list
        });
      },
      fail: function() {

      }
    })
  },

  // 已完成-数据请求
  successAdviceList() {
    var that = this;
    wx.request({
      url: '',
      data: {},
      method: 'GET',
      success: function(res) {
        console.log('***** 已完成-数据请求 *****');
        console.log(res);
        that.setData({
          successAdviceList: res.data.result.list
        });
      },
      fail: function() {

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
  onLoad: function(options) {

    console.log(`***** 进入我的评价页面 *****`);
    console.log(options);
    this.setData({
      doctorId: options.doctorId
    })

    wx.showLoading({
      title: '数据加载中',
    })

    this.beingAdviceList(); // 进行中-咨询记录接口

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