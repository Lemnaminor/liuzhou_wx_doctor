/**
 * 
 */
class StoreUtils {

  static setJson(key,json){
    wx.setStorageSync(key, JSON.stringify(json));
  }

  static getJson(key){
    if(!key) {
      return null;
    }
    let val = wx.getStorageSync(key);
    return JSON.parse(val);
  }

  static setValue(key,value){
    wx.setStorageSync(key,value)
  }

  static getValue(){
    return wx.getStorageSync(key);
  }

  static setToken(token){
    return StoreUtils.setJson("token",token);
  }

  static getToken(){
    return StoreUtils.getJson("token");
  }

  static getAccessToken(){
    return StoreUtils.getJson("token").access_token;
  }

  static setUser(user){
    return StoreUtils.setJson("user",user);
  }

  static getUser(){
    return StoreUtils.getJson("user");
  }
  static setChatGroupList(chatList) {
    StoreUtils.getJson("chatGroupList", chatList);
  }

  static getChatGroupList() {
    return StoreUtils.getJson("chatGroupList");
  }
  static setDoctorList(doctorList){
    StoreUtils.getJson("doctorList", doctorList);
  }

  static getDoctorList(){
    return StoreUtils.getJson("doctorList");
  }
  static formatString (str){
    if (typeof (str) != "string") {
      console.log('去除回车换行空格失败！参数不是字符串类型')
      return;
    }
    str = str.replace(/\ +/g, "");//去掉空格
    str = str.replace(/[\r\n]/g, "");//去掉回车换行
    return str;
  }
}

export default StoreUtils;
