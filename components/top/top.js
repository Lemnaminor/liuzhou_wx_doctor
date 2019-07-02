// components/top/top.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // top标签显示（默认不显示）
    backTopValue: true  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 监听滚动条坐标
    onPageScroll: function (e) {
      console.log(`滚动事件执行`)
      //console.log(e)
      var that = this
      var scrollTop = e.scrollTop
      var backTopValue = scrollTop > 500 ? true : false
      that.setData({
        backTopValue: backTopValue
      })
    },

    // 滚动到顶部
    backTop: function () {
      // 控制滚动
      wx.pageScrollTo({
        scrollTop: 0
      })
    },
  },
  options: {
    styleIsolation: "apply-shared"
  }

})
