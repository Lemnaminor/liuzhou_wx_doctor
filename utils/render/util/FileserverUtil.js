
import { promisify } from '../../promise.util'
// 1. 微信上载文件函数对象
const wxUploadFile = promisify(wx.uploadFile)
// 暴露对外对象
class FileserverUtil {

  constructor(app) {
    this.instance = null;
    this._app = app;
    this.fileServerPath = app.globalData.fileServerPath;
  }

  /**
   * 单例构造方法，构造一个广为人知的接口，供用户对该类进行实例化
   * @returns {RequestUtils}
   */
  static getInstance(app) {
    if (!this.instance) {
      this.instance = new FileserverUtil(app);
    }
    return this.instance;
  }
  /**
   * 上载文件方法
   */
  uploadFile(files){
    // 1. 创建数组对象
    const arr = [];
    let $this = this;
    // 2. 组织上载文件
    for (let path of files) {
      arr.push(wxUploadFile({
        url: $this.fileServerPath,
        filePath: path,
        name: 'file',
        header: {
          'Content-Type': 'multipart/form-data',
          'Authorization': $this._app.globalData.token//如果需要token的话要传
        },
        formData: {
          method: 'POST'   //请求方式
        }
      }))
    }
    // 3. 微信动态加载提示
    wx.showLoading({
      title: '正在跳转咨询页面...',
      mask: true
    })
    // 4. 解析上载文件
   return Promise.all(arr).then(res => {
      console.info(res);
      return res.map(item => item.data)
    }).then(urls => {
      // 关闭加载框
      wx.hideLoading();
      return new Promise((resolve, reject) => {
        resolve(urls);
      });
    }).catch(err => {
      console.log(">>>> upload file error:", err)
    })
  }

  /**
   * 上载文件方法
   * @ files 上载文件
   * @ callback 回调函数，回参是数组
   */
  uploadFile2(files , callback) {

    if (files instanceof Array && files != undefined && files.length > 0) {
      // 实例化文件服务类
      let fileserver = FileserverUtil.getInstance(getApp());
      // 上载文件的动作
      fileserver
        .uploadFile(files)
        .then(urls => {
          callback(urls);
        });

    }else{
      callback([]);
    }
  }
}

export default FileserverUtil;

