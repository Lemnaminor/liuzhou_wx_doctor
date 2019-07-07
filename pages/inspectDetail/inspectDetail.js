// pages/inspectDetail/inspectDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 患者ID
    PatientId: '',

    // 检验报告详情数据
    inspectDetailList: [{
        "referenceValue": "-", //参考值
        "unit": "cells/uL", //单位
        "qualitativeResult": "正常", //定性结果
        "quantitativeResult": "-", //定量结果
        "chineseName": "*白细胞" //中文名称
      },
      {
        "referenceValue": "-",
        "unit": null,
        "qualitativeResult": "正常",
        "quantitativeResult": "-",
        "chineseName": "*潜血"
      }
    ],

  },
  /**
   * 自定义函数事件
   */
  // 检验报告详情接口
  inspectDetailList() {
    var that = this;

    wx.request({
      url: getApp().globalData.path + `/enterprise/inspectTestXMLdetails`,
      data: {
        ReportId: that.data.PatientId
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log("***** 检验报告详情接口成功 *****")
        console.log(res);
        if (res.data.code == 0) {
          wx.showLoading({
            title: '数据加载中',
          })

          that.setData({
            inspectDetailList: res.data.result.list
          });
          wx.hideLoading();

        } else {
          wx.showToast({
            title: '网络请求错误',
            icon: 'none'
          })
        }
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

    console.log(`***** 进入检验报告详情 *****`);
    console.log(options);
    var that = this;
    that.setData({
      PatientId: options.PatientId
    })

    wx.showLoading({
      title: '数据加载中',
    })

    // this.inspectDetailList();

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