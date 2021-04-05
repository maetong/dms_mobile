<template>
  <MPage ref="MPage">
    <view class="m-break-space">基础用法</view>
    <MLicense v-model="value_cph_1"></MLicense>
  </MPage>
</template>

<script>
export default {
  data() {
    return {
      value_cph_1: '',
      value_cph_2: '',
      value_cph_3: '沪ADC520'
    };
  }
};
</script>
