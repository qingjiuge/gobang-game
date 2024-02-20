<template>
    <div class="home">
        <div class="container">
            <CheckerBoard v-if="menuItem === 1"></CheckerBoard>
            <GameMenu v-if="menuItem === 0" @menu-select="getMenuItem"></GameMenu>
        </div>
    </div>
</template>

<script lang="ts" setup>
import GameMenu from '@/components/GameMenu.vue';
import CheckerBoard from '@/components/CheckerBoard.vue';
import type { IMenuItem } from '@/Types';

const menuItem = ref(0)
const getMenuItem = (item: IMenuItem) => {
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
