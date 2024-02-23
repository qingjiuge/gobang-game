<template>
    <div class="game-timer">
        <div class="container">
            <div class="label">倒计时:</div>
            <div class="game-timer-item">
                <span>{{ numToString(minute) }}</span>
            </div>
            <div class="segmentation">
                <span>:</span>
            </div>
            <div class="game-timer-item">
                <span>{{ numToString(second) }}</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>

import { ONE_MINUTE } from '@/Types';
import { reactive, ref, onMounted } from 'vue'
const emit = defineEmits(["backTime"]);
const props = defineProps({
    minute:{
        type:Number,
        default:0
    },
    second:{
        type:Number,
        default:0
    }
})
/**
 * 
 * @param num 显示的数字
 */
const numToString = (num: number) => {
    const numStr = num.toString();
    if (numStr.length < 2) {
        return '0' + numStr;
    } else {
        return numStr;
    }
}
</script>
<style lang="scss" scoped>
.game-timer {
    // width: 240px;
    height: 48px;
    // border: 1px solid;
    position: absolute;
    top: -54px;
    left: calc(50% - 120px);
    display: flex;
    justify-content: center;
    align-items: center;

    .container {
        display: flex;
        align-items: center;

        .label {
            font-size: 24px;
        }

        .game-timer-item {
            font-size: 28px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 16px;
        }

        .segmentation {
            font-size: 28px;
        }
    }


}
</style>