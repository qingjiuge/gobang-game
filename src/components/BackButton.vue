<template>
  <div class="back-btn" @click="back">返回</div>
</template>

<script lang='ts' setup>
const emit = defineEmits(["back"])

const back = () => emit("back")
</script>

<style scoped lang='scss'>
.back-btn {
  cursor: pointer;
  text-align: center;
  padding: 4px 8px;
  border-radius: 4px;

  &:hover {
    color: #fff;
    background: #666;
  }
}
</style>
