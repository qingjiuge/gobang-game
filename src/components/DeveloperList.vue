<template>
  <div class="developer-layout">
    <div class="developer-list">
      <div class="list-item" v-for="name in nameList" :key="name">
        {{ name }}
      </div>
      <BackButton @back="back" />
    </div>
  </div>
</template>

<script lang='ts' setup>
import BackButton from './BackButton.vue';

const nameList = [
  'qingjiuge',
  'SmallTeddy'
]

const emit = defineEmits(["backMenu"])

const back = () => emit("backMenu")
</script>

<style scoped lang='scss'>
.developer-layout {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.developer-list {
  width: 800px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 24px;

  .list-item {
    text-align: center;
    padding: 10px 0;
    cursor: pointer;
  }

}
</style>
