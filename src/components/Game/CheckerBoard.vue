<template>
    <div ref="checkBoard"
        :style="{ width: checkBoardConfig.width + 'px', height: checkBoardConfig.height + 'px', backgroundColor: checkBoardConfig.bgColor }"
        class="checker-board">

    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
const checkBoard = ref<HTMLDivElement | null>(null);
const checkBoardConfig = reactive({
    width: 800,
    height: 800,
    bgColor: '#dab490'
})
let canvasEle = ref<HTMLCanvasElement | null>(null);
let canvasCtx: CanvasRenderingContext2D | null = null;
const circles = []
onMounted(() => {
    init()
})
const init = () => {
    // 初始化棋盘
    canvasEle.value = createCanvas();
    drawCheckBoard();

}
//创建canvas 画布
const createCanvas = () => {
    const canvas = document.createElement('canvas');
    canvas.width = checkBoard.value.offsetWidth;
    canvas.height = checkBoard.value.offsetHeight;
    checkBoard.value.append(canvas);
    canvas.addEventListener('click', (e) => { handleClick(e) })
    return canvas;
}
//绘制棋盘
const drawCheckBoard = () => {
    canvasCtx = canvasEle.value.getContext('2d');
    drawCheckerBoardGrid(canvasCtx);
}
//绘制棋盘格子
const drawCheckerBoardGrid = (ctx: CanvasRenderingContext2D) => {
    //画棋盘
    for (let i = 1; i < 16; i++) {
        //初始化棋子记录
        circles[i] = [];
        //把线段的开头表示出来
        //横线
        ctx.moveTo(50, 50 * i);
        ctx.lineTo(750, 50 * i);
        ctx.stroke();
        //纵线
        ctx.moveTo(50 * i, 50);
        ctx.lineTo(50 * i, 750);
        ctx.stroke();
    }
}
//点击事件监听
const handleClick = (e: MouseEvent) => {

}

</script>
<style lang="scss" scoped>
.checker-board {
    display: block;
    margin: 40px auto;
}
</style>