// pages/editData/editData.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 路由传参
    doctorId: '', // 医生ID

    //设置用户信息
    userList: [{
      userName: "未获取",
      userHeaderUrl: ""
    }],

    // 职称列表数据
    selectWorkList: [],
    selectWorkListIndex: null,

    // 科室列表数据
    selectDepartmentList: [],
    selectDepartmentListIndex: null,


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

    // 医生详情数据
    doctorDetail: '',

  },

  /**
   * 自定义函数事件
   */
  // 医生详情接口
  doctorDetail: function() {
    var that = this;
    var doctorId = that.data.doctorId;
    wx.request({
      url: getApp().globalData.path + `/enterprise/edictDoctor?doctorId=${doctorId}`,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res) {
        console.log('***** 医生详情接口调用 *****');
        console.log(res);
        that.setData({
          doctorDetail: res.data.data,
          selectWorkListIndex: res.data.data.doctorLevel,
          selectDepartmentListIndex: res.data.data.dept_Id,
          content: res.data.data.doctorIntroduction,
          content2: res.data.data.doctorSkill
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

  // 获取职称列表数据
  getWorkList() {
    var that = this;
    wx.request({
      url: getApp().globalData.path + `/enterprise/titlelist`,
      data: {},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: function (res) {
        console.log('***** 获取职称列表数据 *****');
        console.log(res);
        that.setData({
          selectWorkList: res.data.data
        })
      },
      fail: function () {

      }
    })
  },

  // 选择职称
  selectWorkList: function(e) {
    console.log(e);
    console.log('选择职称改变，携带值为', e.detail.value);
    this.setData({
      selectWorkListIndex: e.detail.value
    })
  },

  // 获取科室列表数据
  // getDepartmentList() {
  //   var that = this;
  //   wx.request({
  //     url: getApp().globalData.path + `/enterprise/departmentlist`,
  //     data: {},
  //     header: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },
  //     method: 'GET',
  //     success: function(res) {
  //       console.log('***** 获取科室列表数据 *****');
  //       console.log(res);
  //       that.setData({
  //         selectDepartmentList: res.data.data
  //       })
  //     },
  //     fail: function() {

  //     }
  //   })
  // },

  // 选择科室
  // selectDepartmentList: function(e) {
  //   console.log('选择科室改变，携带值为', e.detail.value);
  //   this.setData({
  //     selectDepartmentListIndex: e.detail.value
  //   })
  // },

  // 提交保存
  editDataFormSubmit(e) {
    console.log(`***** 提交保存 *****`);
    var that = this;
    var editDataFormList = e.detail.value;
    var doctorId = that.data.doctorId;

    wx.request({
      url: getApp().globalData.path + `/enterprise/submitEdictDoctor`,
      data: {
        'id': e.detail.value.id,
        'telPhone': e.detail.value.telPhone,
        'doctorLevel': e.detail.value.doctorLevel,
        'doctorLevelDict': e.detail.value.doctorLevelDict,
        'dept_Id': e.detail.value.dept_Id,
        // 'deptName': e.detail.value.deptName,
        'workerNumber': e.detail.value.workerNumber,
        'doctorIntroduction': e.detail.value.doctorIntroduction,
        'doctorSkill': e.detail.value.doctorSkill
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log('***** 编辑资料表单提交成功 *****');
        console.log(res);
        if(res.data.code == 0){
          wx.showToast({
            title: '保存成功',
            icon: 'success'
          })
          wx.navigateTo({
            url: '/pages/editDataSuccess/editDataSuccess',
          })
        }else{
          wx.showToast({
            title: '保存失败',
            icon: 'none'
          })
        }
      },
      fail: function() {

      }
    })

    // wx.navigateTo({
    //   url: '/pages/editDataSuccess/editDataSuccess',
    // })
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
  onLoad: function(options) {

    console.log(`***** 进入编辑资料页面 *****`);
    this.setData({
      doctorId: getApp().globalData.doctorId
    })
    this.doctorDetail(); // 调用医生详情接口
    // this.getDepartmentList(); // 调用科室列表接口
    this.getWorkList(); // 调用职称列表接口

    let that = this;
    //登录的信息创建
    wx.login({
      success: function(e) {
        wx.setStorage({
          key: "key",
          data: e.errMsg
        })
      }
    })
    //获取用户的信息
    wx.getUserInfo({
      success: function(res) {
        console.log(`获取用户的信息`);
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
      },
      fail: function(res) {
        console.log(res);
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