export default {
  agentId: 1000034,
<<<<<<< HEAD
  appId: 'wx67a443c87192ff7a',
 /*  host_domain: '10.35.112.201', */
  host_domain: '111.12.86.168',
=======
  appId: 'wx71fc2b09c10a663e',
  /* host_domain: 'ihospital.lzgryy.com', */
  host_domain: '10.35.112.201',
  /* host_domain: '111.12.86.168', */
>>>>>>> 171aa6deeedb46fcc801b5b453a59d41a7ebfbff
  app_name: 'WX-IM',
  /* http_protocol: 'https', */
  http_protocol: 'http',
  http_port: 8082,
  ws_port: 9326,
  init: '/api/user/init',
  his_url: '/api/message/list',
  chat_users_url: '/api/user/chatUserList',
  token_path: '/oauth/token',
  login: '/user/login',
  ws_protocol: 'ws',
  getHostUrl: function() {
    return this.http_protocol + '://' + this.host_domain + ':' + this.http_port;
  },
  getTokenUrl: function() {
    return this.token_path;
  },
  getInitUrl: function() {
    return this.init;
  },
  getLoginUrl: function () {
    return this.login;
  },
  getChatUsersUrl: function() {
    return this.chat_users_url;
  },
  getHisUrl: function() {
    return this.his_url;
  },
  getWsUrl: function() {
    return this.ws_protocol + '://' + this.host_domain + ':' + this.ws_port;
  }
};
