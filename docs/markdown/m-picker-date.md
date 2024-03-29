---
pageClass: demo-page

---

# m-picker

### 选择

### Props

| 参数        | 类型    | 说明                                          |
| ----------- | ------- | --------------------------------------------- |
| label       | String  | 标题                                          |
| mode        | String  | 可选 date/time/range                          |
| fields      | String  | 颗粒度:year、day、month、hour、minute、second |
| isLink      | Boolean | 是否显示箭头                                  |
| placeholder | String  | 提示语                                        |
| required    | Boolean | 是否必填                                      |

### Events

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
|        |      | 无       |

### JS调用

```js
// 见代码
```



### 代码

```vue
<!-- 表单demo -->
<template>
  <MPage ref="MPage">
    <view class="m-break-space">日期选择</view>
    <!-- 日期选择 -->
    <MPicker label="日期选择" mode="date" v-model="formData.value_date_nomal"></MPicker>
    <MPicker
      label="日期选择 必填"
      mode="date"
      required
      v-model="formData.value_date_required"
    ></MPicker>
    <MPicker
      label="日期选择 只读"
      mode="date"
      readonly
      v-model="formData.value_date_readonly"
    ></MPicker>

    <view class="m-break-space">日期范围选择</view>
    <!-- 日期范围选择 -->
    <MPicker label="日期范围选择" mode="range" v-model="formData.value_date_range"></MPicker>

    <view class="m-break-space">js调用</view>
    <view style="padding: 20rpx;">
      <m-button class="demo-btn" block @click.native="showPicker_date">选择日期</m-button>
      <m-button class="demo-btn" block @click.native="showPicker_yearMonth">选择年月</m-button>
      <m-button class="demo-btn" block @click.native="showPicker_dateTime">选择日期时间</m-button>
      <m-button class="demo-btn" block @click.native="showPicker_time">选择时间</m-button>
      <m-button class="demo-btn" block @click.native="showPicker_range">选择日期范围</m-button>
    </view>
  </MPage>
</template>

<script>
export default {
  mounted() {
    // #ifdef H5
    window.app = this;
    // #endif
  },
  data() {
    return {
      formData: {
        value_date_nomal: ['2020-01-06'],
        value_date_required: ['2020-01-06'],
        value_date_readonly: ['2020-01-06'],
        value_date_range: ['2018-01-06', '2020-01-06']
      }
    };
  },
  methods: {
    /**
     * 日期选择
     * 入参:
     * mode: 'date'
     * fields 'day' 颗粒度:year、day、month、hour、minute、second
     * startYear  开始年份 默认2015
     * endYear  结束年份 默认2030
     * defaultVal  默认值
     * 出参:
     *   eg: ['2020-02-02']
     */
    async showPicker_date() {
      const res = await this.SHOW_TIME_PICKER({
        mode: 'date',
        fields: 'day',
        startYear: '2015',
        endYear: '2021',
        defaultVal: '2020-02-02'
      });
      console.log(res);
      this.SHOW_TOAST(JSON.stringify(res));
    },
    /**
     * 年月选择
     */
    async showPicker_yearMonth() {
      const res = await this.SHOW_TIME_PICKER({
        mode: 'date',
        fields: 'month',
        startYear: '2015',
        endYear: '2021',
        defaultVal: '2020-01'
      });
      console.log(res);
      this.SHOW_TOAST(JSON.stringify(res));
    },

    /**
     * 日期和时间
     */
    async showPicker_dateTime() {
      const res = await this.SHOW_TIME_PICKER({
        mode: 'date',
        fields: 'second',
        startYear: '2015',
        endYear: '2021',
        defaultVal: '2020-02-02 02:02:02'
      });
      console.log(res);
      this.SHOW_TOAST(JSON.stringify(res));
    },
    /**
     * 时间范围选择
     * 入参:
     * mode: 'range'
     * startYear
     * endYear
     * defaultVal  ['2018-02-02', '2020-02-02']
     * 出参:
     *    ['2018-02-02', '2020-02-02']
     */
    async showPicker_range() {
      const res = await this.SHOW_TIME_PICKER({
        mode: 'range',
        startYear: '2015',
        endYear: '2021',
        defaultVal: ['2018-02-02', '2020-02-02']
      });
      console.log(res);
      this.SHOW_TOAST(JSON.stringify(res));
    },
    /**
     * 时间选择
     * 入参:
     * mode: 'time'
     * hasSecond 是否显示秒 默认true
     * 出参:
     *   [12:12:12]
     */
    async showPicker_time() {
      const res = await this.SHOW_TIME_PICKER({
        mode: 'time',
        defaultVal: '12:12:12',
        hasSecond: true
      });
      console.log(res);
      this.SHOW_TOAST(JSON.stringify(res));
    }
  }
};
</script>

<style lang="scss">
.demo-btn {
  margin-bottom: 20rpx;
}
</style>

```





<DemoFrame src="/date-time-select"></DemoFrame>