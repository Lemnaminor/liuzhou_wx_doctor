// pages/buildReplyLanguage/buildReplyLanguage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 路由传参
    doctorId: '', // 医生ID

    // 判断是 新建or修改 入口
    isChangeRouter: '',

    // 描述信息
    placeholder: "您可以在这里书写详细评价。",
    textMaxLength: 500,
    writeLength: 0,
    isShowMask: true,
    content: '',

    replieID: '', // 列表回复语ID值
    

  },

  /**
   * 自定义函数事件
   */

  // 新建-表单提交保存
  addReplyLanguage(e) {
    console.log(`***** 新建-表单提交保存 *****`);
    console.log(e);
    var that = this;
    var addReplyLanguage = e.detail.value;
    var doctorId = that.data.doctorId;
    wx.request({
      url: getApp().globalData.path + `/hospc/enterprise/addReplie?doctorId=${doctorId}`,
      data: {
        addReplyLanguage
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log("***** 新建-表单提交保存 *****")
        console.log(res);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  // 修改-表单提交保存
  changeReplyLanguage(e) {
    console.log(`***** 修改-表单提交保存 *****`);
    console.log(e);
    var that = this;
    var changeReplyLanguage = e.detail.value;
    var doctorId = that.data.doctorId;
    wx.request({
      url: getApp().globalData.path + `/hospc/enterprise/editReplie?doctorId=${doctorId}`,
      data: {
        changeReplyLanguage
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("***** 修改-表单提交保存 *****")
        console.log(res);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  // 删除-表单提交保存
  deleteReplyLanguage(e) {
    console.log(`***** 删除-表单提交保存 *****`);
    console.log(e);
    var that = this;
    var replieID = that.data.replieID;
    var doctorId = that.data.doctorId;
    wx.request({
      url: getApp().globalData.path + `/hospc/enterprise/deleteReplie?doctorId=${doctorId}&replieID=${replieID}`,
      data: {
        deleteReplyLanguage
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("***** 删除-表单提交保存 *****")
        console.log(res);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        that.setData({
          isShowReplyLanguageModel: !that.data.isShowReplyLanguageModel
        })
        wx.showToast({
          title: '删除成功',
        })
      }
    })
  },

  // 表单重置
  resetForm(){
    console.log(`***** 表单重置 *****`);
    var that = this;
    that.setData({
      content: ''
    })
  },

  // 字数输入
  bindText(e) {
    console.log('***** 字数输入 *****')
    var that = this;
    var len = e.detail.value.length;
    var cont = e.detail.value;
    that.setData({
      writeLength: len,
      content: cont
    })
  },

  // 显示、隐藏常用回复语弹出层
  showHideReplyLanguageModel() {
    console.log(`***** 显示、隐藏常用回复语弹出层 *****`);
    var that = this;
    that.setData({
      isShowReplyLanguageModel: !that.data.isShowReplyLanguageModel
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log(`***** 进入新建常用语回复页面 *****`);
    console.log(options);
    this.setData({
      doctorId: options.doctorId
    })

    // 判断是 新建or修改 入口
    if (options.replieID) {
      this.setData({
        isChangeRouter: true,
        content: options.repliecoment,
        replieID: options.replieID
      })
    } else {
      this.setData({
        isChangeRouter: false
      })
    }
    console.log(this.data.isChangeRouter);

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