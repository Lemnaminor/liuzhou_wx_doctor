// pages/editData/editData.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 职称列表数据
    selectWorkList: [
      '医师',
      '主治医师',
      '副主任医师',
      '主任医师'
    ],
    selectWorkListIndex: 0,

    // 科室列表数据
    selectDepartmentList: [
      '妇科',
      '外科',
      '内科',
      '皮肤科',
      '内分泌科'
    ],
    selectDepartmentListIndex: 0,

    // 医生简介-描述信息
    placeholder: "请填写医生简介描述信息...",
    textMaxLength: 1000,
    writeLength: 0,
    isShowMask: true,
    content: '',

    // 医生擅长-描述信息
    placeholder2: "请填写医生擅长描述信息...",
    textMaxLength2: 1000,
    writeLength2: 0,
    isShowMask2: true,
    content2: '',    

  },

  /**
   * 自定义函数事件
   */
  // 选择职称
  selectWorkList: function (e) {
    console.log('选择职称改变，携带值为', e.detail.value);
    this.setData({
      selectWorkListIndex: e.detail.value
    })
  },

  // 选择科室
  selectDepartmentList: function (e) {
    console.log('选择科室改变，携带值为', e.detail.value);
    this.setData({
      selectDepartmentListIndex: e.detail.value
    })
  },

  // 提交保存
  formSubmit() {
    console.log(`***** 提交保存 *****`);
    wx.navigateTo({
      url: '/pages/editDataSuccess/editDataSuccess',
    })
  },

  // 医生简介-字数输入
  bindText(e) {
    console.log('***** 医生简介-字数输入 *****')
    var that = this;
    var len = e.detail.value.length;
    var cont = e.detail.value;
    that.setData({
      writeLength: len,
      content: cont
    })
  },

  // 医生擅长-字数输入
  bindText2(e) {
    console.log('***** 医生擅长-字数输入 *****')
    var that = this;
    var len = e.detail.value.length;
    var cont = e.detail.value;
    that.setData({
      writeLength2: len,
      content2: cont
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})