// pages/myEvaluate/myEvaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 路由传参
    doctorId: '000111', // 医生ID

    // 星星数量
    starList: [{
      id: 1
    }, {
      id: 2
    }, {
      id: 3
    }, {
      id: 4
    }, {
      id: 5
    }],
    starActive: 4,

    // 游客评价数据
    evaluateList: [{
        "openId": "324223",
        "thePatientId": "324223",
        "evaluateLabelSeqText": [
          "有帮助",
          "回复及时"
        ],
      "evaluateContent": "回答很及时，回答很详细，很有帮助。回答很及时，回答很详细，很有帮助。",
        "starLevel": 5,
        "wxIcon": "../../images/head1.jpg",
        "patientName": "张**"
      },
      {
        "openId": "324223",
        "thePatientId": "324223",
        "evaluateLabelSeqText": [
          "回复及时",
          "有耐心",
          "回答详细"
        ],
        "evaluateContent": "回答没有太多用处。",
        "starLevel": 4,
        "wxIcon": "../../images/head2.jpg",
        "patientName": "李**"
      },
      {
        "openId": "324223",
        "thePatientId": "324223",
        "evaluateLabelSeqText": [
          "通俗易懂",
          "有耐心",
          "有帮助",
          "回复详细",
          "回复及时"
        ],
        "evaluateContent": "医生经验丰富，不错。",
        "starLevel": 5,
        "wxIcon": "../../images/head3.jpg",
        "patientName": "梁**"
      },
      {
        "openId": "324223",
        "thePatientId": "324223",
        "evaluateLabelSeqText": [
          "通俗易懂",
          "有帮助",
          "回复详细"
        ],
        "evaluateContent": "没有耐心。",
        "starLevel": 3,
        "wxIcon": "../../images/head4.jpg",
        "patientName": "廖**"
      },
      {
        "openId": "324223",
        "thePatientId": "324223",
        "evaluateLabelSeqText": [
          "通俗易懂",
          "有帮助"
        ],
        "evaluateContent": "回复很快。回答很好。",
        "starLevel": 5,
        "wxIcon": "../../images/head5.jpg",
        "patientName": "软**"
      }
    ],

  },

  /**
   * 自定义函数事件
   */
  // 游客评价接口
  evaluateList: function() {
    var that = this;
    wx.request({
      // url: `http://10.35.112.203:8080/hospc/lgDoctor/doctor/evaluateList/${that.data.doctorId}/1/20`,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res) {
        console.log("***** 游客评价接口 *****")
        console.log(res.data);
        that.setData({
          evaluateList: res.data.result.list
        });
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log(`***** 进入我的评价页面 *****`);
    console.log(options);
    this.setData({
      // doctorId: options.doctorId
    })

    wx.showLoading({
      title: '数据加载中',
    })

    this.evaluateList(); // 游客评论接口

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
  onReachBottom: function() {

    console.log("上拉触底");
    var that = this;

    wx.request({
      url: `http://10.35.112.203:8080/hospc/lgDoctor/doctor/evaluateList/${that.data.doctorId}/1/20`,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res) {
        console.log("***** 游客评价接口 *****")
        console.log(res.data);
        that.setData({
          evaluateList: that.data.evaluateList.concat(res.data.result.list)
        });
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })



  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})