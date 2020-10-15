<template>
  <el-row class="icon-list">
    <el-col v-for="(item, index) in allIcons" :key="index" class="icon-item" :span="4" @click.native="copyName(item.name)">
      <svg-icon class-name="icon-svg" :icon-class="item.name" />
      <span class="icon-name">{{ item.name }}</span>
    </el-col>
  </el-row>
</template>

<script>
import svgIcons from '@/icons'
import { copyToClipboard } from '@fe/packages/utils'

export default {
  name: 'Icons',
  computed: {
    allIcons() {
      const svg = svgIcons.map(icon => ({ name: icon, type: 'svg' }))
      return [...svg]
    }
  },
  methods: {
    copyName(name) {
      copyToClipboard(name)
    }
  }
}
  
</script>

<style lang="scss" scoped>
.icon-list {
  height: 100%;
  overflow: auto;
  
  .icon-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 160px;
    cursor: pointer;
    color: #303133;
    box-sizing: border-box;
    padding: 20px;
    
    &:hover {
      background-color: #f3f3f3;
    }
  }
  
  .icon-svg {
    font-size: 30px;
    pointer-events: none;
  }
  
  .icon-name {
    display: block;
    font-size: 16px;
    margin-top: 20px;
  }
}
</style>
