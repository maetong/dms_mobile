<template>
  <MPage ref="MPage">
    <view class="page-inner">
      <m-button
        block
        v-for="item in btnList"
        :key="item.title"
        @click.native="btnHandleClick(item)"
        class="demo-btn"
      >
        {{ item.title }}
      </m-button>
    </view>
  </MPage>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      btnList: [
        {
          title: 'm-page 基础页面',
          clickFn: async () => {
            const [err, res] = await uni.navigateTo({
              url: '/pages/demo/ui-demo/m-page'
            });
          }
        },
        {
          title: 'm-button 按钮',
          clickFn: async () => {
            const [err, res] = await uni.navigateTo({
              url: '/pages/demo/ui-demo/m-button'
            });
          }
        },
        //m-license
        {
          title: 'm-license 车牌输入',
          clickFn: async () => {
            const [err, res] = await uni.navigateTo({
              url: '/pages/demo/ui-demo/m-license'
            });
          }
        },
        // search-filter
        {
          title: 'search-filter 筛选',
          clickFn: async () => {
            const [err, res] = await uni.navigateTo({
              url: '/pages/demo/ui-demo/search-filter'
            });
          }
        },
        {
          title: 'base-scroll 下拉刷新下拉加载',
          clickFn: async () => {
            const [err, res] = await uni.navigateTo({
              url: '/pages/demo/ui-demo/base-scroll-demo'
            });
          }
        },
        // m-label
        {
          title: 'm-label 单元格',
          clickFn: async () => {
            const [err, res] = await uni.navigateTo({
              url: '/pages/demo/ui-demo/m-label'
            });
          }
        },
        // m-textarea
        {
          title: 'm-textarea 文本域',
          clickFn: async () => {
            const [err, res] = await uni.navigateTo({
              url: '/pages/demo/ui-demo/m-textarea'
            });
          }
        },
        // m-checkbox
        {
          title: 'm-picker 选择',
          clickFn: async () => {
            const [err, res] = await uni.navigateTo({
              url: '/pages/demo/ui-demo/m-picker'
            });
          }
        },
        {
          title: 'm-picker 时间选择',
          clickFn: async () => {
            const [err, res] = await uni.navigateTo({
              url: '/pages/demo/ui-demo/date-time-select'
            });
          }
        },
        {
          title: 'validator 表单校验',
          clickFn: async () => {
            const [err, res] = await uni.navigateTo({
              url: '/pages/demo/ui-demo/validator'
            });
          }
        },
        // m-swipe-cell
        {
          title: 'm-swipe-cell 滑动单元格',
          clickFn: async () => {
            const [err, res] = await uni.navigateTo({
              url: '/pages/demo/ui-demo/m-swipe-cell'
            });
          }
        },
        // m-dialog
        {
          title: 'm-dialog 弹窗',
          clickFn: async () => {
            const [err, res] = await uni.navigateTo({
              url: '/pages/demo/ui-demo/m-dialog'
            });
          }
        },
        // swiper-tab
        {
          title: 'swiper-tab 标签页',
          clickFn: async () => {
            const [err, res] = await uni.navigateTo({
              url: '/pages/demo/ui-demo/swiper-tab'
            });
          }
        },
        // m-vehicle-check-cell
        {
          title: 'm-vehicle-check-cell 车辆检查单元格',
          clickFn: async () => {
            const [err, res] = await uni.navigateTo({
              url: '/pages/demo/ui-demo/m-vehicle-check-cell'
            });
          }
        },
        // doc-reader
        {
          title: 'doc-reader 文档阅读',
          clickFn: async () => {
            const [err, res] = await uni.navigateTo({
              url: '/pages/demo/ui-demo/doc-reader'
            });
          }
        },
        {
          title: 'dict 字典',
          clickFn: async () => {
            const [err, res] = await uni.navigateTo({
              url: '/pages/demo/ui-demo/dict'
            });
          }
        },
        // {
        //   title: '语音识别',
        //   clickFn: async () => {
        //     const [err, res] = await uni.navigateTo({
        //       url: '/pages/demo/ui-demo/speech'
        //     });
        //   }
        // },
        {
          title: '原生导航-固定配置',
          clickFn: async () => {
            const [err, res] = await uni.navigateTo({
              url: '/pages/demo/ui-demo/navbar1'
            });
          }
        },
        {
          title: '原生导航-动态配置',
          clickFn: async () => {
            const [err, res] = await uni.navigateTo({
              url: '/pages/demo/ui-demo/navbar2'
            });
          }
        },
        {
          title: 'e-charts-H5',
          clickFn: async () => {
            this.$util.openLocalWeb({
              url: '/hybrid/html/index.html#/e-charts-demo'
            });
          }
        },
        {
          title: 'e-charts-renderjs',
          clickFn: async () => {
            uni.navigateTo({
              url: '/pages/demo/ui-demo/e-charts-demo'
            });
          }
        },
        {
          title: '打开本地网页',
          clickFn: async () => {
            this.$util.openLocalWeb({
              url: '/hybrid/html/index.html#/about'
            });
          }
        },
        {
          title: '文件上传',
          clickFn: async () => {
            const [err, res] = await uni.navigateTo({
              url: '/pages/demo/ui-demo/upload-file'
            });
          }
        }
      ]
    };
  },
  methods: {
    async btnHandleClick(item) {
      item.clickFn();
    }
  }
};
</script>

<style lang="scss">
.page-inner {
  padding: 20rpx;
}
.demo-btn {
  margin-bottom: 20rpx;
}
</style>
