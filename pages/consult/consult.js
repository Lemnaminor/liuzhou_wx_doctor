// pages/consult/consult.js
// pages/consult/consult.js
const app = getApp();
// const requestApi = app.$requestApi;
const imChat = app.$imChat;

var SocketTask;
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
    // 后台发送数据 start

    let user = app.globalData.userInfo;
    //let patient = that.data.patientInfo[0];

    var sendInfo = {
      // code: {0:"心跳",1:"链接就绪",2:"消息"}
      code: 2,
      message: {
        //消息来源用户名
        username: user.userName,
        // 发送者头像
        avatar: user.userHeaderUrl,
        // 接受的消息用户ID
        toid: '1d4910e1a0a40f4b20b68431a35fe998',
        // 消息类型:{1: 患者对医生 , 2:医生对患者}
        chatType: 2,
        // 消息内容 
        content: that.data.userWriteMsg.content,
        // 内容类型: {1: 文字内容, 2: 语音内容, 3: 文件内容, 4: 视频内容, 5: 图片}
        contentType: 1,
        //是否被人发送
        mine: false,
        //发送消息的企业用户userId
        fromid: user.id,
        timestamp: new Date().getTime
      }
    }
    // 发送消息
    imChat.setSocketMsg(sendInfo);
    // 后台发送数据 end




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
    /* 
    console.log(`***** 信息添加后页面滚动 *****`);
    console.log(that.data.msgList.length - 1);
    that.setData({
      toView: 'msg-' + (that.data.msgList.length - 1),
    })
   */
  },

  // 医生文本输入
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
  toDoctorDetail() {
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
  // 创建websocket
  webSocket_open: function () {
    var that = this;
    console.log('开始创建')
    // 创建Socket
    // 1. 获取 微信用户唯一 token
    const token = app.globalData.token
    SocketTask = wx.connectSocket({
      url: 'ws://10.35.112.201:9326?token=' + token,
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log('WebSocket连接创建', res)
      },
      fail: function (err) {
        wx.showToast({
          title: '网络异常！',
        })
        console.log(err)
      },
    })
    that.initSocket(); // 监听事件
  },

  // socket监听事件
  initSocket: function () {

    var that = this;
    console.log("进入监听事件", SocketTask);

    // socket链接打开事件
    SocketTask.onOpen(res => {
      console.log('监听 WebSocket 连接打开事件。', res);
    })

    // socket链接关闭事件
    SocketTask.onClose(onClose => {
      console.log('监听 WebSocket 连接关闭事件。', onClose)
    })

    // socket链接错误事件
    SocketTask.onError(onError => {
      console.log('监听 WebSocket 错误错误事件', onError)
    })

    // socket链接接受到服务器的消息事件
    SocketTask.onMessage(onMessage => {
      console.log('监听 WebSocket 接受到服务器的消息事件', onMessage)
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log(`***** 进入聊天室页面 *****`);
    console.log(`获取token值：${getApp().globalData.token}`);

     //this.webSocket_open(); // 建立socket链接
    // 开始通信 start
    var that = this;
    imChat.connectSocket();


    // 开始通信 end


 

    // 动态设置聊天内容高度适配。
    // 获取底部元素高度
    var query = wx.createSelectorQuery();
    var that = this;
    query.select('.foot').boundingClientRect(function(rect) {
      // console.log(`footer`)
      // console.log(rect.height)
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
    // socket链接接受到服务器的消息事件 
    SocketTask.onMessage(onMessage => {
      
      console.info(JSON.parse(res.data))  // 收到的消息为字符串，需处理一下
    })
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