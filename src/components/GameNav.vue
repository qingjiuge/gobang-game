<template>
  <div class="nav">
    <div>五子棋</div>
    <div>
      <BackButton @back="back" />
    </div>
  </div>
</template>

<script lang='ts' setup>
import BackButton from './BackButton.vue';

const emit = defineEmits(["back"])

const back = () => emit("back")
</script>

<style scoped lang='scss'>
.nav {
  font-size: 18px;
  color: #333;
  height: 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  border-bottom: 1px solid #ccc;
}
</style>
