<template>
    <div class="loadding">
        <div class="tip">{{ tip }}</div>
        <div class="container">
            <div class="bar" :style="{ width: getWidth(progress) }"></div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
let timer = null;
const time = ref(1000 * 10);
const progress = ref(0);
const tip = ref('游戏加载中...')
onMounted(() => {
    countTime();
})
const countTime = () => {
    let count = 0;
    timer = setInterval(() => {
        count++;
        if (progress.value < 100) {
            progress.value = getProgress(count);
            emit('onProgress', progress.value)
        } else {
            progress.value = 100
        }
        if (count === time.value / 1000) {
            clearInterval(timer);
            setTimeout(() => {
                tip.value = '游戏加载完成'
                emit('backProgress', true)
            }, 1000)
        }
    }, 100)
}
const getProgress = (num: number) => {
    return num * 10;
}
const getWidth = (num: number) => {
    return num + '%'
}
const emit = defineEmits(['backProgress', 'onProgress'])
</script>
<style lang="scss" scoped>
.loadding {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgba($color: #000000, $alpha: 0.3);
    top: 0;
    left: 0;

    .tip {
        padding: 10px 0;
        font-size: 32px;
    }

    .container {
        width: 100%;
        height: 30px;
        border: 1px solid;

        .bar {
            height: 100%;
            transition: width 1s;
            background-color: aqua;
        }
    }
}
</style>
