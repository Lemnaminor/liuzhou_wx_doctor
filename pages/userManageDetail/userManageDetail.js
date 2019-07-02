// pages/userManageDetail/userManageDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 路由传参
    doctorId: '', // 医生ID
    thePatientId: '', // 患者ID
    // isy: '0', // 标星 0-取消 1-标记

    // 收藏
    isCollection: '0', // 标星 0-取消 1-标记
    collectionIcon: 'favor',
    collectionName: '加星',

    // 患者详情数据
    userDetailList: {},

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
      url: getApp().globalData.path + `/hospc/enterprise/getPatientInfo`,
      data: {
        doctorId: that.data.doctorId,
        thePatientId: that.data.thePatientId
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('***** 患者详情接口调用 *****');
        console.log(res);
        that.setData({
          userDetailList: res.data.data
        });
        if(res.data.data.isStar == 1){
          that.setData({
            isCollection: res.data.data.isStar,
            collectionIcon: 'favorfill',
            collectionName: '已加星',
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

  // 星标接口
  changeCollection: function () {
    console.log("***** 星标接口 *****");
    var that = this;
    var isy = '';
    if (that.data.isCollection == 0){
      isy = 1;
    }else{
      isy = 0;
    }

    console.log(`doctorId值:${that.data.doctorId},thePatientId值：${that.data.thePatientId}，isy值：${isy}`);

    wx.request({
      url: getApp().globalData.path + `/hospc/enterprise/savePatMan?doctorID=${that.data.doctorId}&thePatientId=${that.data.thePatientId}&isy=${isy}`,
      data: {},
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('***** 星标接口调用成功 *****');
        console.log(res);
        if(res.data.code == 0){
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
        }else{
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

  // 跳转检查页面
  toCheckUp(e) {
    console.log(`***** 跳转检查页面 *****`);
    console.log(e);
    var thePatientId = e.currentTarget.id;
    console.log(`患者ID值：${thePatientId}`);
    wx.navigateTo({
      url: `/pages/checkUp/checkUp?thePatientId=${thePatientId}`,
    })
  },

  // 跳转检验页面
  toInspect(e) {
    console.log(`***** 跳转检验页面 *****`);
    console.log(e);
    var thePatientId = e.currentTarget.id;
    wx.navigateTo({
      url: `/pages/inspect/inspect?userId=${thePatientId}`,
    })
  },

  // 跳转咨询记录页面
  toConsult(e){
    console.log(`***** 跳转咨询记录页面 *****`);
    console.log(e);
    var thePatientId = e.currentTarget.id;
    wx.navigateTo({
      url: `/pages/userAdvice/userAdvice?thePatientId=${thePatientId}`,
    })
  },

  // 跳转已开处方页面
  toOpenList(e) {
    console.log(`***** 跳转已开处方页面 *****`);
    console.log(e);
    var thePatientId = e.currentTarget.id;
    wx.navigateTo({
      url: `/pages/openList/openList?userId=${thePatientId}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(`***** 进入患者详情页面 *****`);
    console.log(options);
    var that = this;
    this.setData({
      doctorId: options.doctorId,
      thePatientId: options.thePatientId
    })
    console.log(`获取医生ID值：${that.data.doctorId}，获取患者ID值：${that.data.thePatientId}`);

    wx.showLoading({
      title: '数据加载中',
    })

    this.userDetail(); // 患者详情接口

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