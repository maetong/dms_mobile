---
pageClass: demo-page
---

# m-picker

### 选择

### Props

| 参数      | 类型    | 说明                          |
| --------- | ----------------- | ----------------------------- |
| label | String | 标题 |
| mode | String  | 组件类型 可选  selector/address |
| itemList | Array | 选择数据源 [{ text: '是', value: '1' }, { text: '否', value: '2' }] |
| isLink | Boolean | 是否显示箭头 |
| placeholder | String | 提示语 |
| required | Boolean | 是否必填 |

### Events

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
|        |      | 无       |

### JS调用

```js
    async showPicker_1() {
      const res = await this.SHOW_PICKER({
        single: true,
        itemList: [
          { text: '选项1', value: '1' },
          { text: '选项2', value: '2' },
          { text: '选项3', value: '3' },
          { text: '选项4', value: '4' },
          { text: '选项5', value: '5' }
        ],
        value: ['3']
      });
      console.log('SHOW_PICKER', res);
    },
```



### 代码

```vue
<!-- 表单demo -->
<template>
  <MPage ref="MPage">
    <view class="m-break-space">单选</view>
    <!-- 单选 弹窗 -->
    <MPicker
      label="单选 弹窗"
      mode="selector"
      v-model="formData.value_11"
      :itemList="itemList_1"
      isLink
      placeholder="请选择"
    ></MPicker>

    <MCheckbox
      label="单选 行内"
      type="inner"
      single
      v-model="formData.value_11"
      :itemList="itemList_1"
    ></MCheckbox>

    <!-- 地址选择 -->
    <MPicker
      label="地区"
      placeholder="选择省 / 市 / 区"
      mode="address"
      v-model="formData.addr_value"
      isLink
    ></MPicker>

    <view class="m-break-space">多选</view>
    <!-- 多选 单行 -->
    <MCheckbox
      label="多选 行内"
      type="inner"
      v-model="formData.value_2"
      :itemList="itemList_3"
    ></MCheckbox>

    <view class="m-break-space"></view>

    <!-- 多选 可折叠 -->
    <MCheckboxPanel
      label="多选 可折叠"
      type="inner"
      v-model="formData.value_3"
      :itemList="itemList_2"
    ></MCheckboxPanel>

    <view class="m-break-space"></view>

    <!-- 多选 不可折叠   -->
    <MCheckboxPanel
      label="多选 不可折叠"
      type="inner"
      :isFold="false"
      v-model="formData.value_3"
      :itemList="itemList_2"
    ></MCheckboxPanel>

    <view class="m-break-space">多选 无标题的</view>

    <!-- 多选 无标题的   -->
    <MCheckboxPanel
      label=""
      type="inner"
      :isFold="false"
      v-model="formData.value_3"
      :itemList="itemList_2"
    ></MCheckboxPanel>

    <view class="m-break-space">js调用</view>
    <view style="padding: 20rpx;">
      <m-button class="demo-btn" block @click.native="showPicker_1">单选</m-button>
      <!-- <m-button class="demo-btn" block @click.native="showPicker_2">多选</m-button> -->
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
        addr_value: ['', '', '', ''],
        //
        value_1: [],
        value_11: [],
        value_111: ['2'],
        value_2: [],
        value_3: []
      },
      itemList_1: [{ text: '是', value: '1' }, { text: '否', value: '2' }],
      itemList_2: [
        { text: '顾问1', value: '1' },
        { text: '顾问2', value: '2' },
        { text: '顾问3', value: '3' },
        { text: '顾问4', value: '4' },
        { text: '顾问5', value: '5' },
        { text: '顾问6', value: '6' },
        { text: '顾问7', value: '7' },
        { text: '顾问8', value: '8' },
        { text: '顾问9', value: '9' },
        { text: '顾问10', value: '10' }
      ],
      itemList_3: [
        { text: '王', value: '1' },
        { text: '大', value: '2' },
        { text: '锤', value: '3' }
      ]
    };
  },
  methods: {
    /**
     * 单选弹出
     * 入参:
     * single: Boolean 单选
     * itemList  数据选项数组text,value值需为字符串 [{ text: '1', value: '1' }]
     * 出参:
     * [value]
     */
    async showPicker_1() {
      const res = await this.SHOW_PICKER({
        single: true,
        itemList: [
          { text: '选项1', value: '1' },
          { text: '选项2', value: '2' },
          { text: '选项3', value: '3' },
          { text: '选项4', value: '4' },
          { text: '选项5', value: '5' }
        ],
        value: ['3']
      });
      console.log('SHOW_PICKER', res);
      this.SHOW_TOAST(JSON.stringify(res));
    },
    /**
     * 多选弹出，参数同上单选
     */
    async showPicker_2() {
      this.SHOW_TOAST('还没写好');
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





<DemoFrame src="/m-picker"></DemoFrame>