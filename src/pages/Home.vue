<template>
    <div class="home">
        <div class="container">
            <CheckerBoard v-if="menuItem === 1"></CheckerBoard>
            <GameMenu v-if="menuItem === 0" @menu-select="getMenuItem"></GameMenu>
        </div>
    </div>
</template>
<script lang="ts" setup>
import CheckerBoard from '@/components/Game/CheckerBoard.vue';
import GameMenu, { IMenuItem } from '@/components/Game/Menu.vue';
import { ref } from 'vue';
const menuItem = ref(0)
const getMenuItem = (item:IMenuItem) => {
    menuItem.value = item.id
}
</script>
<style lang="scss" scoped>
.home {
    width: 100%;
    height: 100%;
    display: flex;

    .container {
        justify-content: center;
        flex: 1;
        padding: 20px;
    }
}
</style>