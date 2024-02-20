<template>
    <div class="game-menu">
        <div class="game-menu-item" v-for=" (item, i) in menuList" :key="item.id" @click="menuSelectItem(item)">
            {{ item.label }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { IMenuItem } from '@/Types'

/**
 * 菜单
 */
const menuList: IMenuItem[] = [
    { id: 1, label: '游戏开始', value: 'start' },
    { id: 2, label: '联机模式', value: 'online' },
    { id: 3, label: '游戏设置', value: 'setting' },
    { id: 4, label: '游戏说明', value: 'explain' },
    { id: 5, label: '开发人员', value: 'developer' }
];

const emits = defineEmits(["menuSelect"])

/**
 * 获取菜单选择内容
 * @param item 
 */
const menuSelectItem = (item) => {
    emits("menuSelect", item)
}
</script>

<style lang="scss" scoped>
.game-menu {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;


    .game-menu-item {
        width: 80%;
        padding: 15px 10px;
        font-size: 32px;
        text-align: center;

        &:hover {
            cursor: pointer;
            background-color: #eee;
            border-radius: 15px;
        }

    }
}
</style>
