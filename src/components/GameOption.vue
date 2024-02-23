<template>
    <div class="game-option">
        <div class="game-option-item" v-for="item in optionList" :key="item.id" @click="getSelectItem(item)">
            <span>{{ item.label }}</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { IMenuItem } from '@/Types';
import { reactive, ref, onMounted } from 'vue'
const emits = defineEmits(["menuSelect"])
const optionList: IMenuItem[] = [
    {
        label: '确定',
        value: 'ok',
        id: 1
    },
    {
        label: '取消',
        value: 'cancel',
        id: 0
    }
]
//获取当前选中的菜单值
const getSelectItem = (item: IMenuItem) => {
    emits('menuSelect', item)
}
</script>
<style lang="scss" scoped>
.game-option {
    position: absolute;
    width: 320px;
    height: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    background-color: #fff;
    display: flex;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .game-option-item {
        flex: 1;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 28px;

        &:hover {
            cursor: pointer;
            background-color: #eee;
        }
    }
}
</style>
