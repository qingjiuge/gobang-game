<template>
    <div class="game-layout">
        <GameNav @back="backMenu" />
        <div ref="checkBoard" class="checker-board" :style="{
            width: `${checkBoardConfig.width}px`,
            height: `${checkBoardConfig.height}px`,
            backgroundColor: checkBoardConfig.bgColor
        }">
            <GameOption v-if="gameOptionsVisibale" @menu-select="menuSelectItem" />
            <GameTimer @back-time="backTime" :set-time="times" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Player, PlayerStatus } from '@/Types/player';
import GameNav from './GameNav.vue';
import GameOption from './GameOption.vue';
import GameTimer from './GameTimer.vue';
import { IMenuItem, ONE_MINUTE, Options } from '@/Types';
const props = defineProps({
    player: Player,
    gameStatus: {
        type: Number
    },
})
const checkBoard = ref<HTMLDivElement | null>(null);
const checkBoardConfig = reactive({
    width: 800,
    height: 800,
    bgColor: '#dab490'
});
const times = ref<number>(ONE_MINUTE * 2);
const gameOptionsVisibale = ref(false);
const circles = [];
let canvasEle = ref<HTMLCanvasElement | null>(null);
let canvasCtx: CanvasRenderingContext2D | null = null;
let isBlack = true;
let endGame = false;
let currentPlayer = () => { return props.player };
let clickEvent: MouseEvent | null = null;

/**
 * 初始化
 */
const init = () => {
    // 初始化棋盘
    canvasEle.value = createCanvas();

    //画棋盘
    drawCheckBoard();

}
//初始化配置项
const initConfig = () => {
    const { pieceType } = currentPlayer();
    isBlack = Boolean(pieceType.type);
}

/**
 * 创建canvas 画布
 */
const createCanvas = () => {
    const canvas = document.createElement('canvas');
    canvas.width = checkBoard.value.offsetWidth;
    canvas.height = checkBoard.value.offsetHeight;
    checkBoard.value.append(canvas);
    canvas.addEventListener('click', (e) => { handleClick(e) })
    return canvas;
}

/**
 * 绘制棋盘
 */
const drawCheckBoard = () => {
    canvasCtx = canvasEle.value.getContext('2d');
    drawCheckerBoardGrid(canvasCtx);
}

/**
 * 绘制棋盘格子
 * @param ctx
 */
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
//操作选择
const menuSelectItem = (item: IMenuItem) => {
    const { value } = item;
    if (Options[value]) {
        handleCircleClick(clickEvent);
        times.value = ONE_MINUTE * 2;
    } else {
        console.log('点击了取消')
    }
    gameOptionsVisibale.value = false;
}

/**
 * 点击事件监听
 * @param e
 */
const handleClick = (e: MouseEvent) => {
    if (props.gameStatus === 2) return;
    //初始化配置项
    initConfig();
    if (currentPlayer().status !== PlayerStatus.ready) return;
    clickEvent = e;
    gameOptionsVisibale.value = true;
}
//棋子事件
const handleCircleClick = (e: MouseEvent) => {

    const { offsetX, offsetY } = e;
    if (judgeCircleBorder(offsetX, offsetY)) return;
    if (endGame) {
        return;
    }
    //格子所在的位置
    let i = Math.floor((offsetX + 25) / 50);
    let j = Math.floor((offsetY + 25) / 50);
    //判断棋子是否重复
    if (hasCircle(i, j)) {
        console.log('该地方已经存在棋子!')
        return;
    }
    drawCircle(i, j);
    endGame = checkCircleLine(i, j);
    if (endGame) {
        getGameResult(currentPlayer())
        return;
    }
    // isBlack = !isBlack;
    //将当前玩家的状态置为完成
    currentPlayer().updateStatus(PlayerStatus.over);
    //记录玩家的棋子位置

    backPlayer(currentPlayer())
}

/**
 * 判断棋子边界条件
 * @param x
 * @param y
 */
const judgeCircleBorder = (x: number, y: number) => {
    return x < 25 || y < 25 || x > 775 || y > 775
}

/**
 * 绘制棋子
 * @param i
 * @param j
 */
const drawCircle = (i: number, j: number) => {
    const x = i * 50;
    const y = j * 50;
    canvasCtx.beginPath();
    canvasCtx.arc(x, y, 20, 0, Math.PI * 2);
    //把对应的棋子存到我们的二维数组中
    circles[i][j] = isBlack ? 'black' : 'white';

    //根据当前是哪种棋子，判断棋子的颜色
    let tx = isBlack ? x - 10 : x + 10;
    let ty = isBlack ? y - 10 : y + 10;
    let g = canvasCtx.createRadialGradient(tx, ty, 0, tx, ty, 30);
    g.addColorStop(0, isBlack ? "#ccc" : '#666');
    g.addColorStop(1, isBlack ? '#000' : '#fff');
    canvasCtx.fillStyle = g;
    //设置阴影美化棋子
    canvasCtx.shadowBlur = 4;
    canvasCtx.shadowColor = '#333';
    canvasCtx.shadowOffsetX = 4;
    canvasCtx.shadowOffsetY = 4;
    canvasCtx.fill();
    canvasCtx.closePath();
}

/**
 * 判断当前位置是否存在棋子
 * @param i
 * @param j
 */
const hasCircle = (i: number, j: number) => {
    return circles[i][j]
}

/**
 * 检测棋子的连线情况
 * @param i
 * @param j
 */
const checkCircleLine = (i: number, j: number) => {
    return checkVertical(i, j) || checkHorizontal(i, j) || checkNW2SE(i, j) || checkNE2SW(i, j);
}

/**
 * 纵向查找是否有五个连续的相同的棋子
 * @param row
 * @param col
 */
const checkVertical = (row: number, col: number) => {
    //定义一个变量定义向上的次数
    let up = 0;
    //定义一个变量定义向下的次数
    let down = 0;
    let times = 0;
    //当前总共有几个连在一起
    let count = 1;//初始值为1 本身算一个
    let target = isBlack ? 'black' : 'white';
    //为了避免死循环，给一个循环上限
    while (times < 10000) {
        times++;
        //以row和col为起点在二维数组上向上和向下查找
        //向上查找
        up++;
        if (circles[row][col - up] && circles[row][col - up] === target) {
            count++;
        }

        //向下查找
        down++;
        if (circles[row][col + down] && circles[row][col + down] === target) {
            count++
        }
        //如果棋子大于指定次数 或者棋子不是连续的
        if (count >= 5 || (circles[row][col - up]) !== target && circles[row][col + down] !== target) break;
    }
    return count >= 5;
}

/**
 * 横向查找是否有五个连续的相同的棋子
 * @param row
 * @param col
 */
const checkHorizontal = (row: number, col: number) => {
    //定义一个变量定义向左的次数
    let left = 0;
    //定义一个变量定义向右的次数
    let right = 0;
    let times = 0;
    //当前总共有几个连在一起
    let count = 1;//初始值为1 本身算一个
    let target = isBlack ? 'black' : 'white';
    //为了避免死循环，给一个循环上限
    while (times < 10000) {
        times++;


        //以row和col为起点在二维数组上向左和向右查找
        //向左查找
        left++;
        if (circles[row - left][col] && circles[row - left][col] === target) {
            count++;
        }

        //向右查找
        right++;
        if (circles[row + right][col] && circles[row + right][col] === target) {
            count++
        }
        //如果棋子大于指定次数 或者棋子不是连续的
        if (count >= 5 || (circles[row - left][col]) !== target && circles[row + right][col] !== target) break;
    }
    return count >= 5;
}

/**
 * 从左上到右下连续
 * @param row
 * @param col
 */
const checkNW2SE = (row: number, col: number) => {
    let times = 0;
    let lt = 0;
    let rb = 0;
    let count = 1;
    let target = isBlack ? 'black' : 'white';
    while (times < 10000) {
        times++;
        lt++;
        if (circles[row - lt][col - lt] && circles[row - lt][col - lt] === target) {
            count++;
        }
        rb++
        if (circles[row + rb][col + rb] && circles[row + rb][col + rb] === target) {
            count++;
        }

        if (count >= 5 || (circles[row - lt][col - lt] !== target && circles[row + rb][col + rb] !== target)) break;
    }
    return count >= 5;
}

/**
 * 从右下到左上
 * @param row
 * @param col
 */
const checkNE2SW = (row: number, col: number) => {
    let times = 0;
    let rt = 0;
    let lb = 0;
    let count = 1;
    let target = isBlack ? 'black' : 'white';
    while (times < 10000) {
        times++;
        rt++;
        if (circles[row + rt][col - rt] && circles[row + rt][col - rt] === target) {
            count++;
        }
        lb++
        if (circles[row - lb][col + lb] && circles[row - lb][col + lb] === target) {
            count++;
        }

        if (count >= 5 || (circles[row + rt][col - rt] !== target && circles[row - lb][col + lb] !== target)) break;
    }
    return count >= 5;
}

const emit = defineEmits(["backMenu", 'backPlayer', 'getGameResult'])

const backMenu = () => emit("backMenu")
const backPlayer = (player: Player) => emit('backPlayer', player);
//获取游戏结果
const getGameResult = (player: Player) => {
    emit('getGameResult', player)
}
//超时处理
const backTime = () => {
    //将玩家状态标记为超时
    currentPlayer().updateStatus(PlayerStatus.timeout);
    //记录玩家的棋子位置
    backPlayer(currentPlayer())
}
onMounted(() => {
    init()
})
</script>

<style lang="scss" scoped>
.game-layout {
    width: 100%;
    height: 100%;



    .checker-board {
        display: block;
        margin: 0 auto;
        margin-top: 56px;
        position: relative;
    }
}
</style>
