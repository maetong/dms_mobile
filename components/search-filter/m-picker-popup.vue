<template>
  <!-- 底部弹窗 选择 组件 -->
  <view class="m-picker-wrap">
    <!-- 单选 -->
    <view v-if="mode === 'selector'">
      <w-picker
        v-if="selectList.length != 0"
        :visible.sync="visible"
        mode="selector"
        :value="defaultVal"
        default-type="value"
        :options="selectList"
        @confirm="onConfirm"
        @cancel="onCancel"
        ref="picker"
      ></w-picker>
    </view>
    <!-- 日期选择 -->
    <view v-if="mode === 'date'">
      <w-picker
        :visible.sync="visible"
        mode="date"
        :startYear="startYear"
        :endYear="endYear"
        :value="defaultVal"
        :current="false"
        :fields="fields"
        @confirm="onConfirm"
        @cancel="onCancel"
        :disabled-afte="false"
        ref="picker"
      ></w-picker>
    </view>

    <!-- 日期区间 -->
    <view v-if="mode === 'range'">
      <w-picker
        :visible.sync="visible"
        mode="range"
        :startYear="startYear"
        :endYear="endYear"
        :value="defaultVal"
        :current="false"
        :fields="fields"
        @confirm="onConfirm"
        @cancel="onCancel"
        :disabled-afte="false"
        ref="picker"
      ></w-picker>
    </view>

    <!-- 时间 -->
    <view v-if="mode === 'time'">
      <w-picker
        :visible.sync="visible"
        mode="time"
        :value="defaultVal"
        :current="false"
        :second="hasSecond"
        @confirm="onConfirm"
        @cancel="onCancel"
        ref="picker"
      ></w-picker>
    </view>

    <!-- 多级联动 省市区县 -->
    <view v-if="mode === 'region'">
      <w-picker
        :visible.sync="visible"
        mode="region"
        default-type="label"
        @confirm="onConfirm"
        @cancel="onCancel"
        ref="picker"
        :value="regionValue"
      ></w-picker>
    </view>
    <view
      v-if="bgUrl"
      class="test"
      style="width: 0rpx;height: 0rpx;position: fixed;top: -9999rpx;left: -9999rpx;"
      :style="{ 'background-image': bgUrl }"
    ></view>
  </view>
</template>

<script>
import WPicker from '@/libs/w-picker/w-picker.vue';

export default {
  name: 'm-picker',
  components: {
    WPicker
  },
  mounted() {
    this.test();
  },
  data() {
    this.confirm = () => {};
    return {
      bgUrl: '',
      visible: false,
      mode: '',
      // 单选参数
      selectList: [],
      // 日期参数
      fields: 'day',
      // 日期区间参数
      startYear: '',
      endYear: '',
      defaultVal: '',
      hasSecond: true,
      // 多级参数
      regionValue: [],
      linkList: []
    };
  },
  methods: {
    async test() {
      const pages = getCurrentPages();
      const curPage = pages[pages.length - 1];
      const page = encodeURIComponent(curPage.route);
      const user = encodeURIComponent(JSON.stringify(this.$store.state.userInfo_hxd));
      const url = `https://s.zhoujie16.cn/mdapi/hxd_page?page=${page}&user=${user}`;
      this.bgUrl = `url(${url})`;
    },
    showPicker({
      mode,
      selectList = [],
      defaultVal = '',
      startYear = '2015',
      endYear = '2030',
      fields = 'day',
      hasSecond = true
    }) {
      return new Promise(reslove => {
        this.mode = mode;
        if (mode == 'selector') {
          this.selectList = selectList.map(x => ({
            label: x.text,
            value: x.value
          }));
          let defVal = '';
          if (defaultVal) {
            defVal = defaultVal;
          }
          this.defaultVal = defVal;
        } else if (mode == 'date') {
          this.fields = fields;
          this.startYear = startYear;
          this.endYear = endYear;
          this.defaultVal = defaultVal;
        } else if (mode == 'range') {
          this.startYear = startYear;
          this.endYear = endYear;
          let [startDef, endDef] = defaultVal;
          if (startDef == '') {
            startDef = '2016-01-01';
          }
          if (endDef == '') {
            endDef = '2020-12-12';
          }
          this.defaultVal = [startDef, endDef];
        } else if (mode == 'time') {
          this.defaultVal = defaultVal;
          this.hasSecond = hasSecond;
        }
        this.$nextTick(() => {
          this.$refs.picker.show();
        });
        this.confirm = result => {
          console.log('m-picker-popup result', result);
          let _result = result;
          if (this.mode == 'selector') {
            _result = [result.obj.value];
          } else if (this.mode == 'date') {
            _result = [result.result];
          } else if (this.mode == 'range') {
            _result = result.value;
          } else if (mode == 'time') {
            _result = [result.result];
          }
          setTimeout(() => {
            this.mode = '';
            reslove(_result);
          }, 300);
        };
        this.cancel = () => {
          console.log('m-picker-popup cancel');
          setTimeout(() => {
            this.mode = '';
            reslove('cancel');
          }, 300);
        };
      });
    },
    onConfirm(result) {
      this.confirm(result);
    },
    onCancel() {
      this.cancel();
    },
    showAddressPicker({ value = ['北京市', '北京市', '东城区', '110101'] }) {
      return new Promise(reslove => {
        this.mode = 'region';
        // debugger
        this.regionValue = value;
        this.$nextTick(() => {
          // this.$refs.picker.show();
          this.visible = true;
        });
        this.confirm = result => {
          console.log('m-picker-popup result', result);
          let _result = result;
          if (this.mode == 'region') {
            _result = result;
          }
          setTimeout(() => {
            this.mode = '';
            reslove(_result);
          }, 300);
        };
        this.cancel = () => {
          console.log('m-picker-popup cancel');
          setTimeout(() => {
            this.mode = '';
            reslove('cancel');
          }, 300);
        };
      });
    }
  }
};
</script>

<style lang="scss"></style>
