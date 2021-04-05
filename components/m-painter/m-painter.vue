<template>
  <!-- 海报生成工具 -->
  <view class="m-painter">
    <LimePainter
      v-if="board"
      :board="board"
      isRenderImage
      @success="successCallback"
      @fail="failCallback"
      custom-style="position: fixed; left: 200%;"
    ></LimePainter>
  </view>
</template>

<script>
import LimePainter from '@/libs/lime-painter/index.vue';

export default {
  components:{
    LimePainter
  },
  data() {
    return {
      board: null
    };
  },
  methods: {
    createPainter(board) {
      return new Promise(reslove => {
        this.board = { ...board };
        this.confirm = ([err, res]) => {
          reslove([err, res]);
        };
      });
    },
    successCallback(posterUrl) {
      this.board = null;
      this.confirm([null, posterUrl]);
    },
    failCallback(err) {
      this.board = null;
      this.confirm([err]);
    }
  }
};
</script>

<style lang="scss" scoped></style>
