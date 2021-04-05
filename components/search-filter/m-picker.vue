<template>
  <view class="">
    <MLabel :label="label" :required="required" :isLink="isLink">
      <view class="m-picker-inner m-flex m-justify-end" @click="showPopupClick">
        <view :class="{ 'm-picker--active': hasValue }">{{ tipInfo }}</view>
      </view>
    </MLabel>
  </view>
</template>

<script>

export default {
  name: 'm-picker',
  props: {
    mode: {
      type: String,
      default: 'date'
    },
    // 默认day	颗粒度:year、day、month、hour、minute、second
    fields:{
      type: String,
      default: 'day'
    },
    label: {
      type: String,
      default: '选择'
    },
    value: {
      type: Array
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    itemList: {
      type: Array
    },
    required: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    isLink: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    hasValue() {
      const tips = [this.placeholder];
      return !tips.find(x => x === this.tipInfo);
    },
    tipInfo() {
      if (this.mode == 'date') {
        if (!this.value) {
          return this.placeholder;
        }
        const str = this.value[0];
        return str;
        return this.placeholder;
      } else if (this.mode == 'range') {
        if (!this.value) {
          return '请选择';
        }
        let [start, end] = this.value;
        if (start) {
          start = this.$moment(start).format('YYYY年MM月DD日');
        } else {
          start = '请选择';
        }
        if (end) {
          end = this.$moment(end).format('YYYY年MM月DD日');
        } else {
          end = '请选择';
        }
        const str = start + ' 至 ' + end;
        return str;
      } else if (this.mode == 'address') {
        if (this.value[0] == '') {
          return this.placeholder;
        }
        return this.value[0] + this.value[1] + this.value[2];
      } else if (this.mode == 'selector') {
        if (!this.value) {
          return this.placeholder;
        }
        const item = this.itemList.find(x => x.value === this.value[0]);
        if (item) {
          return item.text;
        }
        return this.placeholder;
      } else {
        return 'null';
      }
    }
  },
  methods: {
    emitInput(value) {
      console.log('m-picker input', this.$util.typeOf(value), value);
      if (value === 'cancel') {
        return;
      }
      this.$emit('input', value);
    },
    showPopupClick() {
      if (this.readonly) {
        return;
      }
      const mode = this.mode;
      if (mode == 'date') {
        this.showPopupDate();
      } else if (mode == 'range') {
        this.showPopupRange();
      } else if (mode == 'address') {
        this.showPopupAddress();
      } else if (mode == 'selector') {
        this.showPopupSelector();
      }
    },
    // 单选
    async showPopupSelector() {
      const params = {
        mode: 'selector',
        selectList: this.itemList,
        defaultVal: this.value[0]
      };
      const res = await this.$root.$refs.MPage.MPickerPopup.showPicker(params);
      this.emitInput(res);
    },
    // 单独日期选择 date
    async showPopupDate() {
      const params = {
        mode: 'date',
        startYear: '2016',
        endYear: '2025',
        defaultVal: this.value[0],
        fields: this.fields
      };
      const res = await this.$root.$refs.MPage.MPickerPopup.showPicker(params);
      this.emitInput(res);
    },
    // 单独日期范围选择 range
    async showPopupRange() {
      let [startDef, endDef] = this.value;
      if (startDef == '') {
        startDef = '2016-01-01';
      }
      if (endDef == '') {
        endDef = '2020-12-12';
      }
      const params = {
        mode: 'range',
        startYear: '2016',
        endYear: '2020',
        defaultVal: [startDef, endDef]
      };
      const res = await this.$root.$refs.MPage.MPickerPopup.showPicker(params);
      this.emitInput(res);
    },
    async showPopupAddress() {
      const value = this.value;
      const res = await this.$root.$refs.MPage.MPickerPopup.showAddressPicker({
        value
      });
      if (res === 'cancel') return;
      const val = [
        res.obj.province.label,
        res.obj.city.label,
        res.obj.area.label,
        res.obj.area.value
      ];
      this.emitInput(val);
    }
  }
};
</script>

<style lang="scss">
.m-picker-inner {
  width: 100%;
  color: #999999;
  .m-picker--active {
    color: #333;
  }
}
</style>
