<template>
  <view class="m-checkbox">
    <MLabel :label="label" :required="required" :border="border" :isLink="type == 'popup'">
      <!-- 内联选择用 -->
      <view class="m-checkbox__inner" v-if="type == 'inner'">
        <MCheckboxInner
          v-if="type == 'inner'"
          :value="value"
          :itemList="itemList"
          :single="single"
          :singleLine="true"
          :readonly="readonly"
          @input="input"
        ></MCheckboxInner>
      </view>
      <!-- 弹窗选择用 -->
      <view class="m-checkbox__inner" v-if="type == 'popup'">
        <view @click="showPopupClick" class="m-checkbox__value">
          {{ tipInfo }}
        </view>
      </view>
    </MLabel>
  </view>
</template>

<script>
import MCheckboxInner from './m-checkbox-inner.vue';

export default {
  name: 'm-input',
  components: { MCheckboxInner },
  props: {
    type: {
      type: String,
      default: 'inner'
    },
    label: {
      type: String,
      default: '选择'
    },
    value: {
      type: Array
    },
    itemList: {
      type: Array,
      default() {
        return [];
      }
    },
    single: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    required: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    console.log('m-checkbox mounted', this.$util.typeOf(this.value), this.value);
  },
  data() {
    return {};
  },
  computed: {
    tipInfo() {
      if (this.value.length == 0) {
        return '请选择';
      } else {
        const texts = this.value.map(val => this.itemList.find(x => x.value === val).text);
        return texts.join(',');
      }
    }
  },
  methods: {
    input(value) {
      console.log('选择的结果', this.$util.typeOf(value), value);
      this.$emit('input', value);
    },
    async showPopupClick() {
      if (this.readonly) {
        return;
      }
      const res = await this.SHOW_PICKER({
        single: true,
        itemList: this.itemList,
        value: this.value
      });
      if (res !== 'cancel') {
        this.input(res);
      }
    },
    showPopupClick3ee() {
      this.$root.$refs.MPage.MCheckboxPopup.showPicker({
        single: this.single,
        itemList: this.itemList,
        value: []
      }).then(value => {
        this.input(value);
      });
    }
  }
};
</script>

<style lang="scss">
.m-checkbox {
}
.m-checkbox__inner {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  .m-checkbox__value {
  }
}
</style>
