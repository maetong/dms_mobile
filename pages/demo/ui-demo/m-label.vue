<template>
  <!-- Cell 单元格 -->
  <MPage ref="MPage">
    <!-- 基础用法 -->
    <view class="m-break-space">基础用法</view>

    <MLabel label="单元格">内容</MLabel>

    <!-- 单位显示 -->
    <view class="m-break-space">单位显示</view>

    <MLabel label="单元格" unit="cm">内容</MLabel>

    <!-- 展示箭头 -->
    <view class="m-break-space">展示箭头</view>

    <MLabel label="单元格" is-link>内容</MLabel>

    <!-- 展示图标 -->
    <view class="m-break-space">展示图标</view>

    <MLabel label="单元格" icon="/static/image/dianhua2.svg">内容</MLabel>

    <MLabel
      label="单元格"
      icon="/static/image/dianhua2.svg"
      right-icon="/static/image/dianhua2.svg"
      @rightIconClick="rightIconClick"
    >
      内容
    </MLabel>
    <!-- 自定义插槽 -->
    <view class="m-break-space">自定义插槽</view>
    <MLabel label="商品租金" labelWidth="400rpx">
      <template v-slot:sublabel>
        <view style="color: #ff7b25;font-size: 20rpx;">（副标题）</view>
      </template>
      <template v-slot:default>
        <view style="color: #ff7b25;">自定义内容</view>
      </template>
    </MLabel>
  </MPage>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    rightIconClick() {
      console.log('点击了按钮');
    }
  }
};
</script>
