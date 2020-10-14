<template>
  <div class="error-container">
    <img src="~@/assets/network.svg" width="202" alt="">
    <h1 class="tit">网络连接不稳定，请稍后再试</h1>
    <div class="btns">
      <van-button round size="large" block type="primary" @click="refreshPage">重新加载</van-button>
    </div>
  </div>
</template>

<script>
import { BASE_DIR } from '@/constants'

export default {
  name: 'Error',
  methods: {
    refreshPage() {
      window.location.href = BASE_DIR
    }
  }
}
</script>

<style lang="scss" scoped>
.error-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .tit {
    font-size: 32px;
    font-weight: normal;
    margin: 40px 0;
    color: #999;
  }
  .btns {
    box-sizing: border-box;
    width: 100%;
    padding: 30px 150px;
  }
}
</style>
