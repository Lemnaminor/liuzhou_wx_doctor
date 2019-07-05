// pages/main/index.js
var QR = require("../../utils/qrcode.js");
Page({
  data: {

    // 获取路由ID
    personId: '',

    // 二维码数据
    canvasHidden: false,
    maskHidden: true,
    imagePath: '',
    placeholder: '',//默认二维码生成文本
    canvasObj: {
      width: 600,
      height: 600
    },

    // 医生详情数据
    doctorDetail: '',

  },

  /**
   * 自定义事件函数
   */
  // 医生详情接口
  doctorDetail: function () {
    var that = this;
    var personId = that.data.personId;
    wx.request({
      url: getApp().globalData.path + `/lgDoctor/doctor/detail/1/openId`,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log('***** 医生详情接口调用 *****');
        console.log(res);
        if(res.data.code == 0){
          that.setData({
            doctorDetail: res.data.result,
            placeholder: res.data.result.qrCodeImg
          });
          console.log(`二维码地址：${res.data.result.qrCodeImg}`);
          // 页面初始化 options为页面跳转所带来的参数
          var size = that.setCanvasSize();//动态设置画布大小
          var initUrl = that.data.placeholder;
          that.createQrCode(initUrl, "mycanvas", size.w, size.h);
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

  onLoad: function (options) {

    // 获取路由参数ID
    var that = this;
    console.log(options);
    console.log(options.orderId);
    var personId = options.orderId;
    that.setData({
      personId: personId
    })

    wx.showLoading({
      title: '数据加载中',
    })

    this.doctorDetail(); // 医生详情接口



    wx.hideLoading();

  },
  onReady: function () {

  },
  onShow: function () {

    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },

  onUnload: function () {
    // 页面关闭

  },
  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var that = this;
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / that.data.canvasObj.width;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    setTimeout(() => { this.canvasToTempImage(); }, 1000);

  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        console.log(res);
        console.log(tempFilePath);
        that.setData({
          imagePath: tempFilePath,
          // canvasHidden:true
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    var img = this.data.imagePath;
    console.log(img);
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
  // formSubmit: function (e) {
  //   var that = this;
  //   var url = e.detail.value.url;
  //   that.setData({
  //     maskHidden: false,
  //   });
  //   wx.showToast({
  //     title: '生成中...',
  //     icon: 'loading',
  //     duration: 2000
  //   });
  //   var st = setTimeout(function () {
  //     wx.hideToast()
  //     var size = that.setCanvasSize();
  //     //绘制二维码
  //     that.createQrCode(url, "mycanvas", size.w, size.h);
  //     that.setData({
  //       maskHidden: true
  //     });
  //     clearTimeout(st);
  //   }, 2000)

  // }

})