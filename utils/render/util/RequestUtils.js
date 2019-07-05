import { ErrorType, imageLoad, MessageInfoType, MessageTargetType } from './ChatUtils.js';
import conf from '../conf/index.js';
import StoreUtils from './StoreUtils.js';
import WebsocketHeartbeatJs from './WebsocketHeartbeatJs.js';
import WxRequestUtil from "./WxRequestUtil.js";

class RequestUtils {
  
  constructor() {
    this.instance = null;
    this.isRefreshing = false;
    this.subscribers = [];
  }

  /**
   * 单例构造方法，构造一个广为人知的接口，供用户对该类进行实例化
   * @returns {RequestUtils}
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new RequestUtils();
    }
    return this.instance;
  }

  /**
   * 带token的请求
   * @param url 请求路径
   * @param options 请求参数
   * @returns {Promise<Response | never>}
   */
  request(url, options) {
    let self = this;
    console.log('StoreUtils.getAccessToken()', StoreUtils.getAccessToken());
    let wxRequestUtil = new WxRequestUtil();
    return wxRequestUtil.doPost(
      url + "?access_token=" + StoreUtils.getAccessToken(),
      options,
      { Accept: 'application/json' }
    ).then(response => {
      return self.checkStatus(response, url, options);
    }).then(json => {
      console.log(json);
      return new Promise(resolve => {
        resolve(json);
      });
    });
  }

  /**
   * 检查token 是否失效，如果失效，刷新token
   * @param response 拦截的请求 response
   * @param url 请求路径
   * @param options 请求参数
   * @returns {Promise<any>|*}
   */
  checkStatus(response, url, options) {
    
    // eslint-disable-next-line no-console
    console.log('checkStatus', response.statusCode);
    let self = this;
    if (response && response.statusCode === 401) {
      // eslint-disable-next-line no-console
      console.log('response.statusCode', response.statusCode);

      // 这个Promise函数很关键
      let p = new Promise((resolve) => {
        self.addSubscriber(() => {
          resolve(self.request(url, options));
        });
      });
      // eslint-disable-next-line no-console
      console.log('isRefreshing', self.isRefreshing);
      // 刷新token的函数,这需要添加一个开关，防止重复请求
      if (!self.isRefreshing) {
        self.isRefreshing = true;
        self.flushToken();
      }
      return p;
    } else {
      return response;
    }
  }

  /**
   * 重新执行token 失效的函数
   */
  onAccessTokenFetched() {
    let self = this;
    // eslint-disable-next-line no-console
    console.log('subscribers', self.subscribers);
    self.subscribers.forEach((callback) => {
      callback();
    });
    self.subscribers = [];
  }

  /**
   * 把请求的token 失效的函数放到 subscribers
   * @param callback 请求的token 失效的函数
   */
  addSubscriber(callback) {
    let self = this;
    // eslint-disable-next-line no-console
    console.log('addSubscriber', callback);
    self.subscribers.push(callback);
    // eslint-disable-next-line no-console
    console.log('this.subscribers', self.subscribers);
  }

  /**
   * 用户登录的方法
   * @param username 用户名
   * @param password 密码
   * @returns {Promise<Response>} 登录状态
   */
  login(username, password,$app) {
    
    let self = this;
    let param = {
      'client_id': 'wim-client',
      'client_secret': 'wim-client-app',
      'grant_type': 'password',
      'scope': 'select',
      'username': username,
      'password': password
    }
    let wxRequestUtil = new WxRequestUtil();
    // 以表单方式像后台发送数据，后台接受为对象
    return wxRequestUtil.doPost(
      conf.getTokenUrl(), 
      param, 
      { 'Content-Type': 'application/x-www-form-urlencoded'}
      ).then(response => {
        if (response.statusCode === 200) {
          /* 
          return new Promise((resolve, reject) => {
            reject(response.data);
          }); 
          */
          return response.data;
        } else if (response.statusCode === 401 || response.statusCode === 400) {
          return new Promise((resolve, reject) => {
            reject('用户名密码错误');
          });
        } else {
          return new Promise((resolve, reject) => {
            reject('服务器错误');
          });
        }
      }).then(json => {
        // sessionStorage.setItem('token', json.access_token);
        StoreUtils.setToken(json);
        $app.globalData.token = json.access_token;
        self.isRefreshing = false;
        console.log('token',json);
        setTimeout(function() {
          self.isRefreshing = true;
          self.flushToken($app);
        }, ((json.expires_in - 10) * 1000));
        return new Promise((resolve) => {
          resolve(json);
        });
      });
  }

  /**
   * 刷新token
   * @returns {Promise<Response | never>}
   */
  flushToken($app) {
    if($app === undefined){
      $app = getApp();
    }

    console.log('刷新token');
    let self = this;
    self.isRefreshing = true;

    let param = {
      'client_id': 'wim-client',
      'client_secret': 'wim-client-app',
      'grant_type': 'refresh_token',
      'scope': 'select',
      'refresh_token': StoreUtils.getToken().refresh_token
    }

    console.log('刷新token param', param);
    let wxRequestUtil = new WxRequestUtil();
    // 以表单方式像后台发送数据，后台接受为对象
    return wxRequestUtil.doPost(
      conf.getTokenUrl(),
      param,
      { 'Content-Type': 'application/x-www-form-urlencoded' }
    ).then(response => {
        // eslint-disable-next-line no-console
      console.log('刷新token response.status', response.statusCode);
      if (response.statusCode === 200) {
        return response.data;
        } else {
          return new Promise((resolve, reject) => {
            reject(ErrorType.FLUSH_TOKEN_ERROR);
          });
        }
      })
      .then(json => {
        StoreUtils.setToken(json);
        self.onAccessTokenFetched();
        self.isRefreshing = false;

        $app.globalData.token = json.access_token;
        
        //清除原先的刷新缓存的定时器
        $app.wxStore.clearFlushTokenTimerId()
        //刷新token 定时器
        let flushTokenTimerId = setTimeout(function() {
          self.flushToken($app);
        }, ((json.expires_in - 10) * 1000));
        $app.wxStore.setFlushTokenTimerId(flushTokenTimerId)
      })
  }

  timeoutFetch(fetchPromise, timeout) {
    let abortFn = null;

    //这是一个可以被reject的promise
    let abortPromise = new Promise(function(resolve, reject) {
      abortFn = function() {
        reject(ErrorType.TIMEOUT_ERROR);
      };
    });

    //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
    let abortAblePromise = Promise.race([fetchPromise, abortPromise]);

    setTimeout(function() {
      abortFn();
    }, timeout);

    return abortAblePromise;
  }

  /**
   * websocket 连接处理
   * @param app
   */
  webSocketOperation(app) {

    let websocketHeartbeatJs = new WebsocketHeartbeatJs({
      url: conf.getWsUrl()
    });

    websocketHeartbeatJs.onopen = function() {
      websocketHeartbeatJs.send('{"code":' + MessageInfoType.MSG_READY + '}');
    };

    websocketHeartbeatJs.onmessage = function(event) {
      let data = event.data;
      let sendInfo = JSON.parse(data);
      // 真正的消息类型
      if (sendInfo.code === MessageInfoType.MSG_MESSAGE) {
        self.winControl.flashIcon();
        let message = sendInfo.message;
        //如果图片不带域名，加上域名
        if (message.avatar && message.avatar.indexOf('http') === -1) {
          message.avatar = conf.getHostUrl() + message.avatar;
        }
        message.timestamp = self.formatDateTime(new Date(message.timestamp));
        // 发送给个人
        if (message.type === MessageTargetType.FRIEND) {
          // 接受人是当前的聊天窗口
          if (String(message.fromid) === String(self.$store.state.currentChat.id)) {
            self.$store.commit('addMessage', message);
          } else {
            self.$store.commit('setUnReadCount', message);
            self.$store.commit('addUnreadMessage', message);
          }
        } else if (message.type === MessageTargetType.CHAT_GROUP) {
          // message.avatar = self.$store.state.chatMap.get(message.id);
          // 接受人是当前的聊天窗口
          if (String(message.id) === String(self.$store.state.currentChat.id)) {
            if (String(message.fromid) !== self.$store.state.user.id) {
              self.$store.commit('addMessage', message);
            }
          } else {
            self.$store.commit('setUnReadCount', message);
            self.$store.commit('addUnreadMessage', message);
          }
        }
        self.winControl.flashFrame();
        self.$store.commit('setLastMessage', message);
        // 每次滚动到最底部
        self.$nextTick(() => {
          imageLoad('message-box');
        });
      }
    };

    websocketHeartbeatJs.onreconnect = function() {
      console.log('reconnecting...');
    };

    let count = 0;
    websocketHeartbeatJs.onerror = function(error) {
      RequestUtils.getInstance().flushToken(self)
        .catch(error => {
          count++;
          if (ErrorType.NET_ERROR === error.toString()) {
            self.$Message.error('网络断开，正在重连...');
          } else if (ErrorType.FLUSH_TOKEN_ERROR === error) {
            count = 25;
          }
        });
      //重连次数大于24 退出登录
      if (count > 24) {
        count = 0;
        logout(self);
      }
    };
    self.$store.commit('setWebsocket', websocketHeartbeatJs);
  }
}

export default RequestUtils;
