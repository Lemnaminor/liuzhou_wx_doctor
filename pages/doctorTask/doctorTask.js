  // pages/doctorTask/doctorTask.js
import MeLogin from "../../modules/login/me-Login-qy.js";
const app = getApp()
var sliderWidth = 100; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 路由传参
    doctorId: '', // 医生ID

    // 任务状态数据
    consulStatus: '',

    // tab导航数据
    tabs: ["全部", "进行中", "未开始"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    // 全部任务列表数据
    allDoctorTaskList: [],
    pageIndex: 1, // 请求页索引
    pageNum: 5, // 请求数据条数
    pageCount: 0, // 总页数
    amount: 0, // 总条数

    // 进行中-任务列表数据
    beingDoctorTaskList: [],
    pageIndex2: 1, // 请求页索引
    pageNum2: 5, // 请求数据条数
    pageCount2: 0, // 总页数
    amount2: 0, // 总条数

    // 未开始-任务列表数据
    noDoctorTaskList: [],    
    pageIndex3: 1, // 请求页索引
    pageNum3: 5, // 请求数据条数
    pageCount3: 0, // 总页数
    amount3: 0, // 总条数

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
          consulStatus: '2'
        })
        this.beingDoctorTaskList();
        break;
      case 2:
        console.log(`未开始`);
        that.setData({
          consulStatus: '1'
        })
        this.noDoctorTaskList();
        break;
    }

  },

  // 全部-数据请求
  allDoctorTaskList() {
    var that = this;
    var pageIndex = that.data.pageIndex;
    var pageNum = that.data.pageNum;
    console.log(`全部：当前页：${pageIndex},显示条数：${pageNum}`);
    wx.request({
      url: app.globalData.path + `/doctorTask/finddoctorTask`,
      data: {
        doctorId: that.data.doctorId,
        pageIndex: that.data.pageIndex,
        pageNum: that.data.pageNum
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('***** 全部-数据请求 *****');
        console.log(res);
        if (res.data.code == 0) {
          wx.showLoading({
            title: '数据加载中',
          })
          var tempList = that.data.allDoctorTaskList
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
            allDoctorTaskList: tempList
          });
          wx.hideLoading();

        } else {
          if (res.data.code == -1) {

          } else {
            wx.showToast({
              title: '网络请求错误',
              icon: 'none'
            })
          }
        }
      },
      fail: function () {

      }
    })
  },

  // 进行中-数据请求
  beingDoctorTaskList() {
    var that = this;
    var pageIndex = that.data.pageIndex2;
    var pageNum = that.data.pageNum2;
    console.log(`进行中：当前页：${pageIndex},显示条数：${pageNum}`);
    wx.request({
      url: app.globalData.path + `/doctorTask/finddoctorTaskBydoctorId`,
      data: {
        doctorId: that.data.doctorId,
        consulStatus: that.data.consulStatus,
        pageIndex: that.data.pageIndex2,
        pageNum: that.data.pageNum2
      },
      method: 'GET',
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
          var tempList = that.data.beingDoctorTaskList
          var tempPageIndex = that.data.pageIndex2;
          if (that.data.pageIndex2 == 1) {
            tempList = res.data.data.list;
            tempPageIndex = 1;
          } else {
            tempList = tempList.concat(res.data.data.list);
            // tempPageIndex = tempPageIndex + 1;
          }
          that.setData({
            pageIndex2: tempPageIndex,
            pageNum2: res.data.data.pageSize,
            pageCount2: res.data.data.pages,
            amount2: res.data.data.total,
            beingDoctorTaskList: tempList
          });
          wx.hideLoading();

        } else {
          if (res.data.code == -1) {

          } else {
            wx.showToast({
              title: '网络请求错误',
              icon: 'none'
            })
          }
        }
      },
      fail: function () {

      }
    })
  },

  // 未开始-数据请求
  noDoctorTaskList() {
    var that = this;
    var pageIndex = that.data.pageIndex3;
    var pageNum = that.data.pageNum3;
    console.log(`未开始：当前页：${pageIndex},显示条数：${pageNum}`);
    wx.request({
      url: app.globalData.path + `/doctorTask/finddoctorTaskBydoctorId`,
      data: {
        doctorId: that.data.doctorId,
        consulStatus: that.data.consulStatus,
        pageIndex: that.data.pageIndex3,
        pageNum: that.data.pageNum3
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('***** 未开始-数据请求 *****');
        console.log(res);
        if (res.data.code == 0) {
          wx.showLoading({
            title: '数据加载中',
          })
          var tempList = that.data.noDoctorTaskList
          var tempPageIndex = that.data.pageIndex3;
          if (that.data.pageIndex3 == 1) {
            tempList = res.data.data.list;
            tempPageIndex = 1;
          } else {
            tempList = tempList.concat(res.data.data.list);
            // tempPageIndex = tempPageIndex + 1;
          }
          that.setData({
            pageIndex3: tempPageIndex,
            pageNum3: res.data.data.pageSize,
            pageCount3: res.data.data.pages,
            amount3: res.data.data.total,
            noDoctorTaskList: tempList
          });
          wx.hideLoading();

        } else {
          if (res.data.code == -1) {

          } else {
            wx.showToast({
              title: '网络请求错误',
              icon: 'none'
            })
          }
        }
      },
      fail: function () {

      }
    })
  },

  // 跳转聊天页面
  toConsult(e){
    console.log(`***** 跳转聊天页面 *****`);
    console.log(e);
    // var userId = e.currentTarget.id;
    var imUserId = e.currentTarget.dataset.imuserid;
    var id = e.currentTarget.dataset.id;
    var orderid = e.currentTarget.dataset.orderid;
    var orderNo = e.currentTarget.dataset.orderno;
    var imdoctorid=e.currentTarget.dataset.imdoctorid;
    console.log(`imUserId值：${imUserId}id:${id}orderid:${orderid}orderNo:${orderNo}`);
    wx.navigateTo({
      url: `/pages/consult/consult?imUserId=${imUserId}&id=${id}&orderid=${orderid}&orderNo=${orderNo}&imdoctorid=${imdoctorid}`,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log(`***** 进入医生任务页面 *****`);
    let userInfo = getApp().globalData.userInfo;
    if (userInfo == null) {
      let meLogin = new MeLogin(getApp());
      meLogin.wxLogin();
      userInfo = wx.getStorageSync('userInfo');
    }
    this.setData({
      doctorId: userInfo.id
      //doctorId: getApp().globalData.doctorId
    })

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
    console.log('监听页面显示');
    var index = parseInt(this.data.activeIndex);
    console.log(index);
    switch (index) {
      case 0:
        console.log(`全部`);
        this.data.pageIndex = 1;
        this.allDoctorTaskList();
        break;
      case 1:
        console.log(`进行中`);
        this.data.pageIndex2 = 1;
        this.beingDoctorTaskList();
        break;
      case 2:
        console.log(`未开始`);
        this.data.pageIndex3 = 1;
        this.noDoctorTaskList();
        break;
    }
    
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
        this.data.pageIndex = 1;
        this.allDoctorTaskList();
        break;
      case 1:
        console.log(`进行中`);
        this.data.pageIndex2 = 1;
        this.beingDoctorTaskList();
        break;
      case 2:
        console.log(`未开始`);
        this.data.pageIndex3 = 1;
        this.noDoctorTaskList();
        break;
    }

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

    console.log("上拉触底");
    var that = this;
    var index = parseInt(this.data.activeIndex);

    switch (index) {
      case 0:
        console.log(`全部`);
        if (this.data.pageIndex < this.data.pageCount) {
          this.data.pageIndex++;
          this.allDoctorTaskList();
        } else {
          wx.showToast({
            title: '没有更多数据了',
            icon: 'none'
          })
        }
        break;
      case 1:
        console.log(`进行中`);
        if (this.data.pageIndex2 < this.data.pageCount2) {
          this.data.pageIndex2++;
          this.beingDoctorTaskList();
        } else {
          wx.showToast({
            title: '没有更多数据了',
            icon: 'none'
          })
        }
        break;
      case 2:
        console.log(`未开始`);
        if (this.data.pageIndex3 < this.data.pageCount2) {
          this.data.pageIndex3++;
          this.noDoctorTaskList();
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
  onShareAppMessage: function() {

  }
})