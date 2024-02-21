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
const minute = ref(0);
const second = ref(0);
const emit = defineEmits(["backTime"]);
const props = defineProps({
    setTime: {
        type: Number,
        default: ()=>{
            return ONE_MINUTE * 1
        }
    }
})
const numToString = (num: number) => {
    const numStr = num.toString();
    if (numStr.length < 2) {
        return '0' + numStr;
    } else {
        return numStr;
    }
}
//计时器对象
let timer = null;
onMounted(() => {
    countdown();
})
//倒计时函数
const countdown = () => {
    let remainingTime = props.setTime;

    // 更新剩余时间
    function updateRemainingTime() {
        remainingTime -= 1000; // 每秒减少1000毫秒
        const minutes = Math.floor(remainingTime / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);

        // 在这里更新你的倒计时显示，例如在页面上显示剩余时间
        minute.value = minutes;
        second.value = seconds;
        // 如果倒计时结束，清除计时器并执行结束操作
        if (remainingTime <= 0) {
            clearInterval(timer);
            console.log('倒计时结束');
            // 这里可以添加倒计时结束时的代码
            backTime()
        }
    }

    // 每秒更新一次剩余时间
    timer = setInterval(updateRemainingTime, 1000);

}
//倒计时结束回调函数
const backTime = () => {
    emit('backTime')
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