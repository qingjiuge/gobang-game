<template>
    <div class="game-menu">
        <div class="container">
            <div class="game-menu-item" v-for=" (item, i) in menuList" @click="menuSelectItem(item)" :key="item.id">
                <span>{{ item.label }}</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
export interface IMenuItem {
    // 菜单项
    // 属性：
    // label: 菜单项显示的文字
    label: string,
    // value: 菜单项的值，用于区分
    value: string,
    // id: 菜单项的唯一标识
    id: number
}
const menuList: IMenuItem[] = [{
    label: '游戏开始',
    value: 'start',
    id: 1
}, {
    label: '联机模式',
    value: 'online',
    id: 21
}, {
    label: '游戏设置',
    value: 'setting',
    id: 3
}, {
    label: '游戏说明',
    value: 'explain',
    id: 4
}, {
    label: '开发人员',
    value: 'developer',
    id: 5
}
];
const emits = defineEmits(["menuSelect"])

//获取菜单选择内容
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

    .container {
        width: 80%;
    }

    .game-menu-item {
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
