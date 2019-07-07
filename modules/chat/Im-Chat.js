/**
 * Chat
 * 
 */
import conf from '../../utils/render/conf/index';
import { ErrorType, MessageInfoType, MessageTargetType, formatDateTime } from '../../utils/render/util/ChatUtils.js';

export default class ImChat {

  constructor(app) {
    this.connectStatus = 0;      // websocket 连接状态 0：未连接，1：已连接
    this.heartListen = null;     // 心跳
    this.consultDoctors = [];    // 问诊的医生列表
    this.app = app;              // 方便在Chat内部操作app
  }

  /* 初始化连接 */
  connectSocket() {
    // 1. 获取 微信用户唯一 token
    const token = this.app.globalData.token
    // 2. webSocket 服务器地址
    let url = conf.getWsUrl();
    url = url + "?token=" + token;
    console.log('开始连接');
    // 3. websocket连接
    wx.connectSocket({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      method: 'post',
      success: res => {
        console.log('连接成功', res)
        // 设置连接状态
        this.connectStatus = 1
        // 心跳
        clearInterval(this.heartListen)
        this.heartListen = setInterval(() => {
          if (this.connectStatus === 0) {
            console.log('监听到没心跳了，抢救一下')
            clearInterval(this.heartListen)
            this.reconnect()
          } else {
            console.log('我还活着')
          }
        }, 3000)
      },
      fail: err => {
        console.error('连接失败')
      }
    })
    // 监听webSocket错误
    wx.onSocketError(res => {
      console.log('监听到 WebSocket 打开错误，请检查！')
      // 修改连接状态
      this.connectStatus = 0
    })
    // 监听WebSocket关闭
    wx.onSocketClose(res => {
      console.log('监听到 WebSocket 已关闭！')
      this.connectStatus = 0
    })
    // websocket打开
    wx.onSocketOpen(res => {
      console.log('监听到 WebSocket 连接已打开！')
    })
    // 收到websocket消息
    wx.onSocketMessage(res => {
      
      this.getSocketMsg(JSON.parse(res.data))  // 收到的消息为字符串，需处理一下
    })
  }
  /* 重连 */
  reconnect() {
    console.log('尝试重连');
    wx.closeSocket();     // 重连之前手动关闭一次
    this.connectSocket();
  }

  /* 关闭websocket */
  closeSocket(removeChat) {
    wx.closeSocket({
      success: res => {
        console.log('结束咨询：'+res);
        clearInterval(this.heartListen);
        // code
      }
    })
  }
  /* 收到消息 */
  getSocketMsg(data) {
    console.log('收到消息', data)
    return data;
  }

  /* 发送消息 */
  setSocketMsg(msg) {
    if (this.connectStatus === 1) {
      wx.sendSocketMessage({
        data: JSON.stringify(msg)
      })
    } 
  }
}