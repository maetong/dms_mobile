<template>
  <view style="position: fixed;left: -4000rpx;">
    <tki-qrcode
      ref="qrcode"
      :val="val"
      :icon="logo"
      :iconSize="20"
      @result="qrR"
      background="#fff"
    />
  </view>
</template>

<script>
import TkiQrcode from './tki-qrcode/tki-qrcode.vue';

export default {
  components: {
    TkiQrcode
  },
  data() {
    return {
      val: '',
      logo: ''
    };
  },
  mounted() {
    this.initLogo();
  },
  methods: {
    async initLogo() {
      const [err_d, res_d] = await uni.downloadFile({
        url: 'https://xcx.haoxued.com/hxd/imgs/logo_qr.png'
      });
      console.log([err_d, res_d]);
      if (res_d.statusCode != 200) {
        return;
      }
      const logo = res_d.tempFilePath;
      console.log('二维码logo', logo);
      this.logo = logo;
    },
    makeCode(str) {
      return new Promise(async reslove => {
        await this.initLogo();
        this.val = str;
        this.callback = qrcodeSrc => {
          reslove(qrcodeSrc);
        };
        this.$nextTick(() => {
          this.$refs.qrcode._makeCode();
        });
      });
    },
    qrR(qrcodeSrc) {
      console.log('生成的二维码图片', qrcodeSrc);
      this.callback(qrcodeSrc);
    }
  }
};
</script>

<style></style>
