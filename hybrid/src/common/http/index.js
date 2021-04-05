import AppConfig from "@/config/index.js";
import axios from "axios";
import { Toast, Dialog, Notify } from "vant";
import * as Util from "@/common/utils/index.js";

axios.defaults.withCredentials = false
class Http {
  constructor(arg) {
    this.debugger = false;
  }
  async sleep(timeLen) {
    return new Promise((resolve) => setTimeout(resolve, timeLen));
  }
  /**
   * 发送请求
   */
  async ajax({ url, method, data = {}, _config = {}, enc = false }) {
    const config = {
      isLoading: false,
      showError: true,
      ..._config,
    };
    let requestUrl = AppConfig.requsetUrl + url;
    if (url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1) {
      requestUrl = url;
    }
    let toast = null;
    if (config.isLoading) {
      toast = Toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
    }
    console.log("http 请求 url: ", url);
    console.log("http 请求 参数: ", data);

    let reauestData = data;

    if (enc) {
      reauestData = { crypto_0: Util.encryptDesEcb(JSON.stringify(data)) };
    }

    const result = await axios({
      method: method,
      url: requestUrl,
      params: method === "GET" ? reauestData : {},
      data: method === "POST" ? reauestData : {},
    });
    toast ? toast.clear() : "";

    if (result.status !== 200) {
      return ["服务器开小差了"];
    }
    let res_data = result.data;
    // debugger;
    if (res_data.crypto_0) {
      res_data.data = JSON.parse(Util.decryptDesEcb(res_data.crypto_0));
    }

    console.log(
      "http 请求 响应 格式化: ",
      JSON.parse(JSON.stringify(res_data))
    );

    if (res_data.resultCode !== 200) {
      return [res_data.msg];
    }
    return [null, result.data];
  }

  async get(url, data, _config) {
    const method = "GET";
    return await this.ajax({
      url,
      method,
      data: { ...data, t: new Date().getTime() },
      _config,
    });
  }

  async post(url, data, _config) {
    const method = "POST";
    return await this.ajax({
      url,
      method,
      data,
      _config,
    });
  }

  async post_enc(url, data, _config) {
    const method = "POST";
    return await this.ajax({
      url,
      method,
      data,
      _config,
      enc: true,
    });
  }
}
export default new Http();
