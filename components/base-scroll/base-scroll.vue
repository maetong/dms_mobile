<template>
  <view class="base-scroll-wrap">
    <MescrollUni
      class="mescroll-uni"
      :height="_scrollHeight"
      @init="scrollInit"
      :down="downOption"
      @down="downCallback"
      :up="upOption"
      @up="upCallback"
      :top="_top"
      :fixed="fixed"
      @scroll="scroll"
      bottombar
      safearea
    >
      <slot name="scroll"></slot>
    </MescrollUni>
  </view>
</template>

<script>
/**
 * @Author: zhoujie
 * @Date: 2020-08-25
 * @Last Modified: 2020-06-30 zhoujie
 **/

import MescrollUni from "@/libs/mescroll-uni/mescroll-uni.vue";
import MescrollMixin from "@/libs/mescroll-uni/mescroll-mixins.js";

const reqConf = {
  pageNumKey: "pageNum",
  pageSizeKey: "limit"
};

// 请求结果字段配置
const resConf = {
  listKey: ["records", "rows"], // records rows
  totalKey: ["total", "toast"]
};

export default {
  mixins: [MescrollMixin], // 使用mixin
  components: { MescrollUni },
  props: {
    auto: {
      type: Boolean,
      default: true
    },
    dataSource: {
      type: Array
    },
    fetchApi: {
      type: Function
    },
    fetchParams: {
      type: Object
    },
    // 下拉刷新区域往下偏移的距离
    // 当:fixed="true", 此时top为fixed的top (已自动加上window-top的值)
    // 当:fixed="false"则为padding-top
    // 支持"100rpx", "100px", "100%"格式的值
    top: {
      type: Number,
      default: 0
    },
    // 是否通过fixed定位来固定 mescroll-uni 的高度,默认true;
    // 当配置:fixed="false"时,则 mescroll-uni 高度跟随父元素  此时父元素必须有固定的高度,否则列表滚动异常
    fixed: {
      type: Boolean,
      default: true
    },
    // 设置的高度, 此项有值,则不使用fixed
    // 支持100, "100rpx", "100px", "100%"格式的值
    // 其中纯数字则默认单位rpx, 百分比则相对于windowHeight
    height: {
      type: String
    },
    // 高度差(只支持纯数字  单位rpx) offsetHeight的值就是当前窗口高度需要减去的值  scroll高度 = 当前窗口高度 - offsetHeight。
    offsetHeight: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  computed: {
    _top() {
      return this.top + "rpx";
    },
    _scrollHeight() {
      if (this.height) {
        return this.height;
      } else {
        console.log(this.offsetHeight, "offsetHeight");
        console.log(
          uni.getSystemInfoSync().windowHeight -
            this.$util.rpxToPx(this.offsetHeight) +
            "px",
          "滚动条高度"
        );
        return (
          uni.getSystemInfoSync().windowHeight -
          this.$util.rpxToPx(this.offsetHeight) +
          "px"
        );
      }
    }
  },
  watch: {
    fetchParams: {
      deep: true,
      handler() {
        console.log("watch fetchParams");
        if (!this.auto) return;
        if (this.mescroll && !this.isLoading) {
          this.mescroll.scrollTo(0);
          this.mescroll.triggerDownScroll();
        }
      }
    }
  },
  data() {
    this.mescroll = null;
    return {
      isLoading: false,
      // 列表数据
      dataList: [],
      // 下拉刷新的常用配置
      downOption: {
        use: true, // 是否启用下拉刷新; 默认true
        auto: false // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
      },
      // 上拉加载的常用配置
      upOption: {
        use: true, // 是否启用上拉加载; 默认true
        auto: this.auto, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: this.pageSize // 每页数据的数量,默认10
        },
        noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
        empty: {
          icon: "/static/image/404-1.png",
          tip: "暂无记录"
        },
        onScroll: true
      }
    };
  },
  methods: {
    triggerDownScroll() {
      this.mescroll.scrollTo(0);
      this.mescroll.triggerDownScroll();
    },
    scrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    setDataList(arr) {
      this.dataList = arr; //追加新数据
      console.log("listChange", arr);
      this.$emit("listChange", arr);
    },
    sleep(timeLen) {
      return new Promise(resolve => setTimeout(resolve, timeLen));
    },
    /** 下拉刷新的回调 */
    async downCallback(mescroll) {
      console.log("下拉刷新");
      mescroll.resetUpScroll();
    },
    /** 上拉加载的回调 */
    async upCallback(mescroll) {
      this.isLoading = true;
      let num = mescroll.num; // 页码, 默认从1开始
      let size = mescroll.size; // 页长, 默认每页10条
      console.log("上拉加载", {
        num,
        size
      });
      if (mescroll.num == 1) {
        //如果是第一页需手动置空列表
        this.dataList = [];
        // this.setDataList([]);
      }
      await this.sleep(300);
      const [err, res] = await this.fetchData(num, size);
      if (err) {
        // 失败 重置数据
        this.isLoading = false;
        mescroll.endErr();
        return;
      }
      const { curPageData, totalSize } = res;
      this.setDataList([...this.dataList, ...curPageData]);
      this.isLoading = false;
      mescroll.endBySize(curPageData.length, totalSize);
    },
    // 请求数据
    async fetchData(num, size) {
      await this.sleep(300);
      const params = {
        ...this.fetchParams,
        [reqConf.pageNumKey]: num,
        [reqConf.pageSizeKey]: size
      };
      console.log("baseScroll 请求参数", params);
      const [err, res] = await this.fetchApi(params);
      if (err) {
        console.log("baseScroll  请求数据失败");
        return [err, res];
      }
      console.log("baseScroll 请求的数据", res);
      const _res = this.getResData(res);
      if (_res === false) {
        return ["数据解析出错"];
      }
      return [err, _res];
    },
    getResData(res) {
      let curPageData = null;
      let totalSize = null;
      for (let key of resConf.listKey) {
        if (res.data[key] !== undefined) {
          curPageData = res.data[key];
          break;
        }
      }

      for (let key of resConf.totalKey) {
        if (res.data[key] !== undefined) {
          totalSize = res.data[key];
          break;
        }
      }
      if (curPageData == null || totalSize == null) {
        return false;
      }
      return { curPageData, totalSize };
    },
    scroll(mescroll) {
      // console.log('scroll', mescroll);
    }
  }
};
</script>

<style lang="scss"></style>
