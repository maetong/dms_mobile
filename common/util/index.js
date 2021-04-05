/**
 * 公共方法
 */
class Util {
  constructor(arg) {

  }
  /**
   * 判断数据类型
   * @param {Object} obj
   */
  typeOf(obj) {
    const toString = Object.prototype.toString;
    const typeMap = {
      '[object String]': 'string',
      '[object Number]': 'number',
      '[object Boolean]': 'boolean',
      '[object Symbol]': 'symbol',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object',
      '[object Array]': 'array',
      '[object Function]': 'function',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Error]': 'error'
    }
    return typeMap[toString.call(obj)];
  }

  /**
   * 显示 loading 提示框, 
   * @param {Object} title
   */
  async showLoading(title) {
    const [err, res] = await uni.showLoading({
      title,
      mask: true
    });
    return [err, res];
  }
  /**
   * 隐藏 loading 提示框。
   */
  async hideLoading() {
    await uni.hideLoading()
  }

  /**
   * 显示模态弹窗，类似于标准 html 的消息框：alert、confirm。
   */
  async showModal({
    title = "提示",
    content,
    showCancel = true,
    cancelText = "取消",
    confirmText = "确定"
  }) {
    const [err, res] = await uni.showModal({
      title,
      content,
      showCancel,
      cancelText,
      confirmText,
    });
    return [err, res];
  }
  /**
   * 显示操作菜单
   */
  async showActionSheet({
    itemList
  }) {
    const [err, res] = await uni.showActionSheet({
      itemList: ['A', 'B', 'C']
    });
    return [err, res]
  }
  /**
   * 打开 H5 链接
   */
  async openLocalWeb({
    url
  }) {
    const [err, res] = await uni.navigateTo({
      url: '/pages/web-view-page/web-view-page?url=' + encodeURIComponent(url)
    });
  }
  // 禁止表情
  inputEmoji(value) {
    const regex = emojiRegex();
    return value.replace(regex, "");
  }

  getSafeAreaBottom() {
    return AppConfig.systemInfo.safeAreaInsets.bottom + "px";
  }

  // px 单位转 rpx
  pxTpRpx(px) {
    px = Number(px);
    const windowWidth = uni.getSystemInfoSync().windowWidth;
    return (px / windowWidth) * 750;
  }
  // rpx 单位转 px
  rpxToPx(rpx) {
    rpx = Number(rpx);
    const windowWidth = uni.getSystemInfoSync().windowWidth;
    return (rpx / 750) * windowWidth;
  }
}

export default new Util();
