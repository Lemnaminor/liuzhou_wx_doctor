// pages/userManageDetail/userManageDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 路由传参
    userId: '', // 患者ID

    // 收藏
    isCollection: '0', // 备注：是否收藏，0-已收藏，1-收藏
    collectionIcon: 'favor',
    collectionName: '加星',

    // 患者详情数据
    userDetailList: {
      id: '000001',
      userIcon: '../../images/head1.jpg',
      name: '张三',
      sex: '男',
      age: '20',
      hospitalCard: '211936546522',
    },

    // 禁止点击样式
    isDisabled: true,

  },

  /**
   * 事件处理
   */
  // 患者详情接口
  userDetail: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.path + `/hospc/lgDoctor/doctor/detail/${that.data.doctorId}/openId`,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log('***** 医生详情接口调用 *****');
        console.log(res);
        that.setData({
          userDetailList: res.data.result
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  // 收藏接口
  isCollection: function () {
    console.log("***** 收藏接口 *****")
    var that = this;

    if (that.data.doctorDetail.isCollection == '0') {
      that.setData({
        collectionIcon: 'favorfill',
        collectionName: '已加星',
        isCollection: '1',
      })
    } else {
      that.setData({
        collectionIcon: 'favor',
        collectionName: '加星',
        isCollection: '0',
      })
    }
  },

  // 改变收藏状态
  changeCollection: function () {
    console.log("***** 改变收藏状态 *****")
    var that = this;
    if (that.data.isCollection == '0') {
      that.setData({
        collectionIcon: 'favorfill',
        collectionName: '已加星',
        isCollection: '1',
      })
      wx.showToast({
        title: '已加星',
        icon: 'none',
        duration: 1500
      })
    } else {
      that.setData({
        collectionIcon: 'favor',
        collectionName: '加星',
        isCollection: '0',
      })
      wx.showToast({
        title: '已取消',
        icon: 'none',
        duration: 1500
      })
    }
  },

  // 跳转咨询记录页面
  toConsult(e){
    console.log(`***** 跳转咨询记录页面 *****`);
    console.log(e);
    var userId = e.currentTarget.id;
    wx.navigateTo({
      url: `/pages/consult/consult?userId=${userId}`,
    })
  },

  // 跳转已开处方页面
  toOpenList(e) {
    console.log(`***** 跳转已开处方页面 *****`);
    console.log(e);
    var userId = e.currentTarget.id;
    wx.navigateTo({
      url: `/pages/openList/openList?userId=${userId}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(`***** 进入医生详情页面 *****`);
    console.log(options);
    var userId = options.userId;
    this.setData({
      userId: userId
    })
    console.log(`获取患者ID值：${that.data.userId}`);

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
    this.evaluateList(); // 游客评价接口
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
    that.setData({ isLoading: true });
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    wx.request({
      url: `http://10.35.112.203:8080/hospc/lgDoctor/doctor/evaluateList/${that.data.doctorId}/1/20`,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log("***** 游客评价接口 *****")
        console.log(res.data);
        that.setData({
          evaluateList: that.data.evaluateList.concat(res.data.result.list)
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
    that.setData({ isLoading: false });
    wx.hideNavigationBarLoading();


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})