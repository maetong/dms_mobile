<template>
  <MPage ref="MPage">
    <view
      class=""
      @click="refreshBtnClick"
      style="height: 100rpx;background-color: #eeeeee;text-align: center;line-height: 100rpx;"
    >
      120rpx 占位元素 点击刷新
    </view>
    <!-- 下面的列表展示 -->
    <!-- 
        注意  
        @listChange="listChange" 
        listChange 一定要写到 methods 里 
        否则H5端无法显示列表  (难受啊，这都是些什么神奇bug！！！)
    -->
    <BaseScroll
      ref="BaseScroll"
      :offsetHeight="120"
      :fetchApi="fetchApi"
      :fetchParams="fetchParams"
      @listChange="listChange"
      :auto="true"
    >
      <template v-slot:scroll>
        <view style="padding: 20rpx;">
          <ScrollCell
            @click="scrollCellClick(data)"
            v-for="(data, i) in dataSource"
            :key="i"
            :cell="data"
          ></ScrollCell>
        </view>
      </template>
    </BaseScroll>
  </MPage>
</template>

<script>
import ScrollCell from "./../components/scroll-cell.vue";
import { AjaxScrollData } from "@/api/test/index.js";

export default {
  components: {
    ScrollCell
  },
  mounted() {
    
  },
  data() {
    return {
      fetchApi: AjaxScrollData,
      fetchParams: {},
      dataSource: []
    };
  },
  methods: {
    refreshBtnClick() {
      // 修改请求参数 就是重新刷新列表
      this.fetchParams = { ...this.fetchParams };
    },
    listChange(arr) {
      this.dataSource = arr;
    },
    async scrollCellClick(data) {
      console.log("点击事件", { ...data });
    }
  }
};
</script>

<style lang="scss"></style>
