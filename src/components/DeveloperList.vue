<template>
  <div class="developer-layout">
    <div class="developer-list">
      <a v-for="item in developerList" :key="item.id" :href="item.github" target="_blank">
        <div class="list-item">
          {{ item.name }}
        </div>
      </a>

      <BackButton @back="back" />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { IDeveloper } from '@/Types';
import BackButton from './BackButton.vue';

const developerList: IDeveloper[] = [
  {
    id: 1,
    name: 'qingjiuge',
    github: 'https://github.com/qingjiuge'
  },
  {
    id: 2,
    name: 'SmallTeddy',
    github: 'https://github.com/SmallTeddy'
  },
  {
    id: 3,
    name: 'EternalHeart',
    github: 'https://github.com/wh131462'
  }
]
const handleClick = (item: number) => {
  location.href
}

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
  a{
    text-decoration:none;
    color: #000;
    &:hover{
     color:#4007a2 ;
    }
  }

  .list-item {
    text-align: center;
    padding: 10px 0;
    cursor: pointer;
  }

}
</style>
