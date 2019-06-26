// pages/consult/consult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 获取用户信息
    userList: {
      userName: "未获取",
      userHeaderUrl: ""
    },

    // 填写消息数据
    userWriteMsg: {
      classify: 1,
      content: ''
    },

    // 游客、医生回复数据
    msgList: [{
        classify: 0,
        content: '免费治疗。',
      },
      {
        classify: 1,
        content: '免费的不放心。',
      },
      {
        classify: 1,
        content: '有没有收费的手术。',
      },
      {
        classify: 0,
        content: '单独发微信红包给我。',
      }
    ],


    // 评价标签数据
    tagList: ['回复及时', '有耐心', '有帮助', '通俗易懂', '回复详细'],

    // 页面滚动数据
    toView: '', // scrollView 滚动描点
    scrollHeight: 0, // 聊天室高度
    footHeight: 0, // 底部输入框高度

    // 底部选择图片、关闭按钮弹出层显示隐藏
    isShowFootModel: false,

    // 结束咨询显示、隐藏
    isShowEndConsult: false,

    // 患者是否结束咨询
    isUserEndConsult: false,

    // 医生是否结束咨询
    isDoctorEndConsult: false,

    // scroll-view滚动高度控制
    scrollTop: 0,

  },

  /**
   * 自定义事件方法
   */
  // 游客发送信息
  userSendMsg() {
    console.log('***** 游客发送信息 *****');

    var that = this;
    console.log(that.data.userWriteMsg);
    if (that.data.userWriteMsg.content == '') {
      wx.showToast({
        title: '数据不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    var newMsg = {
      classify: 1,
      content: that.data.userWriteMsg.content
    };
    var msgList = that.data.msgList.concat(newMsg);
    console.log(msgList);
    that.setData({
      msgList: msgList,
      userWriteMsg: {
        classify: 1,
        content: ''
      },
    })

    // 信息添加后页面滚动
    console.log(`***** 信息添加后页面滚动 *****`);
    console.log(that.data.msgList.length - 1);
    that.setData({
      toView: 'msg-' + (that.data.msgList.length - 1),
    })

  },

  // 游客文本输入
  bindText(e) {
    console.log('***** 游客文本输入 *****');
    var that = this;
    var cont = e.detail.value;

    that.setData({
      userWriteMsg: {
        classify: 1,
        content: cont
      }
    })
  },

  // 页面滚动底部
  pageScrollToBottom: function() {
    wx.createSelectorQuery().select('.consult-box').boundingClientRect(function(rect) {
      wx.pageScrollTo({
        scrollTop: rect.bottom
      })
    }).exec()
  },

  // 跳转游客评价页面
  toUserEvaluate() {
    console.log('***** 跳转游客评价页面 *****')
    wx.navigateTo({
      url: '/pages/userEvaluate/userEvaluate',
    })
  },

  // 跳转医生详情页面
  toDoctorDetail(){
    console.log('***** 跳转医生详情页面 *****')
    wx.navigateTo({
      url: '/pages/doctorDetail/doctorDetail',
    })
  },

  // 是否显示底部关闭按钮弹出层
  isShowHideFootModel() {
    var that = this;
    that.setData({
      isShowFootModel: !that.data.isShowFootModel,
    })
  },

  // 显示隐藏结束咨询弹出层
  showHideEndConsultModel() {
    var that = this;
    that.setData({
      isShowEndConsult: !that.data.isShowEndConsult
    })
  },

  // 结束咨询
  endConsult() {
    console.log(`***** 结束咨询 *****`);
    var that = this;
    that.setData({
      isShowEndConsult: !that.data.isShowEndConsult,
      isShowFootModel: !that.data.isShowFootModel,
      isUserEndConsult: true,
      isDoctorEndConsult: true,
      scrollTop: 10000,
    })
    wx.showToast({
      title: '已结束',
      icon: 'success',
      duration: 1500
    })

  },

  /**
   * websocket 函数方法
   */
  // 建立socket连接
  buildLink(){
    wx.connectSocket({
      url: 'wss://example.qq.com',
      header: {
        'content-type': 'application/json'
      },
      protocols: ['protocol1'],
      method: "GET",
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  // 监听 WebSocket 连接打开事件
  isOpenLink(){
    wx.onSocketOpen(function(res){
      console.log('***** webSocket链接已打开 *****');
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 动态设置聊天内容高度适配。
    // 获取底部元素高度
    var query = wx.createSelectorQuery();
    var that = this;
    query.select('.foot').boundingClientRect(function(rect) {
      console.log(`footer`)
      console.log(rect.height)
      that.setData({
        footHeight: rect.height
      })
    }).exec(function() {
      // 动态计算高度
      var scrollHeight = wx.getSystemInfoSync().windowHeight - that.data.footHeight;
      that.setData({
        scrollHeight: scrollHeight
      })
    });

    //获取用户的信息
    wx.getUserInfo({
      success: function(res) {
        console.log(res);
        let userInfo = res.userInfo
        let nickName = userInfo.nickName
        let avatarUrl = userInfo.avatarUrl
        //先将信息存放到本地
        wx.setStorageSync('nickName', nickName);
        wx.setStorageSync('avatarUrl', avatarUrl);

        let user = [{
          userName: nickName,
          userHeaderUrl: avatarUrl,
        }]
        that.setData({
          userList: user,
        })
      }
    })


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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})