<template>
    <div class="game-layout">
        <GameNav @back="backMenu" />
        <div ref="checkBoard" class="checker-board" :style="{
            width: `${checkBoardConfig.width}px`,
            height: `${checkBoardConfig.height}px`,
            backgroundColor: checkBoardConfig.bgColor
        }">
            <GameOption v-if="gameOptionsVisible" @menu-select="menuSelectItem" />
            <GameTimer :minute="minute" :second="second" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Player, PlayerStatus } from '@/Types/player';
import GameNav from './GameNav.vue';
import GameOption from './GameOption.vue';
import GameTimer from './GameTimer.vue';
import { IMenuItem, Options } from '@/Types';
import { roomStore } from '@/Stores/room';
import { GameRoomResultState, GameRoomState } from '@/Types/room';
import { BoardClass } from '@/Class/Board'

const store = roomStore();
const props = defineProps({
    player: Player,
})
const checkBoard = ref<HTMLDivElement | null>(null);
const checkBoardConfig = reactive(new BoardClass())
const gameOptionsVisible = ref(false);
const circles = [];
const minute = ref(0);
const second = ref(0);
let canvasEle = ref<HTMLCanvasElement | null>(null);
let canvasCtx: CanvasRenderingContext2D | null = null;
let isBlack = true;
let endGame = false;
let clickEvent: MouseEvent | null = null;
let timer = null;
/**
 * 初始化
 */
const init = () => {
    // 初始化棋盘
    canvasEle.value = createCanvas();

    //画棋盘
    drawCheckBoard();
    //计时器
    resetTimer();
}
//初始化配置项
const initConfig = () => {
    const { pieceType } = props.player;
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
    canvas.addEventListener('click', (e) => {
        handleClick(e)
    })
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
    for (let i = 0; i < 15; i++) {
        //初始化棋子记录
        circles[i] = Array(15).fill(null);
        const lineNum = i + 1;
        //把线段的开头表示出来
        //横线
        ctx.moveTo(50, 50 * lineNum);
        ctx.lineTo(750, 50 * lineNum);
        ctx.stroke();
        //纵线
        ctx.moveTo(50 * lineNum, 50);
        ctx.lineTo(50 * lineNum, 750);
        ctx.stroke();
    }
}
//操作选择
const menuSelectItem = (item: IMenuItem) => {
    const { value } = item;
    if (Options[value]) {
        handleCircleClick(clickEvent);
        //如果是轮流下棋才重置  游戏结束不执行该代码 因为click事件先执行
        if (timer) {
            resetTimer();
        }
    } else {
        console.log('点击了取消')
    }
    gameOptionsVisible.value = false;
}
/**
 * 重置计时器
 */
const resetTimer = () => {
    clearInterval(timer);
    timer = null;
    countdown(store.$state.stepTime);
}

/**
 * 点击事件监听
 * @param e
 */
const handleClick = (e: MouseEvent) => {
    //初始化配置项
    initConfig();
    if (store.getGameState !== GameRoomState.RUNNING) return;
    clickEvent = e;
    gameOptionsVisible.value = true;
    // timer=null;
}
//棋子事件
const handleCircleClick = (e: MouseEvent) => {

    const { offsetX, offsetY } = e;
    if (judgeCircleBorder(offsetX, offsetY)) return;
    if (endGame) {
        return;
    }
    //格子所在的位置
    let i = Math.floor((offsetX + 25) / 50) - 1;
    let j = Math.floor((offsetY + 25) / 50) - 1;
    console.log('当前棋子位置', [i, j]);
    //判断棋子是否重复
    if (hasCircle(i, j)) {
        console.log('该地方已经存在棋子!')
        return;
    }
    drawCircle(i, j);
    endGame = checkCircleLine(i, j);
    if (endGame) {
        clearInterval(timer);
        timer = null;
        getGameResult()
        return;
    }
    // isBlack = !isBlack;
    //将当前玩家的状态置为完成
    props.player.updateStatus(PlayerStatus.over);
    //记录玩家的棋子位置

    backPlayer(props.player)
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
    const x = (i + 1) * 50;
    const y = (j + 1) * 50;
    canvasCtx.beginPath();
    canvasCtx.arc(x, y, 20, 0, Math.PI * 2);
    //把对应的棋子存到我们的二维数组中
    circles[i][j] = isBlack ? 'black' : 'white';

    //根据当前是哪种棋子，判断棋子的颜色
    let tx = isBlack ? x - 10 : x + 10;
    let ty = isBlack ? y - 10 : y + 10;
    let g = canvasCtx.createRadialGradient(tx, ty, 0, tx, ty, 30);
    g.addColorStop(0, '#ccc');
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
    return !!circles[i][j]
}

/**
 * 检测棋子的连线情况
 * @param i
 * @param j
 */
const checkCircleLine = (i: number, j: number) => {
    console.log('棋子位置', circles)
    return checkVertical(i, j) || checkHorizontal(i, j) || checkNW2SE(i, j) || checkNE2SW(i, j);
}

/**
 * 纵向查找是否有五个连续的相同的棋子
 * @param row
 * @param col
 */
const checkVertical = (row: number, col: number) => {
    let target = circles[row][col];
    // 垂直方向的检测 只需要检查row +-
    let up = 0;
    let down = 0;
    let single = [];
    for (let i = 0; i < 5; i++) {
        if (!single.includes('up') && row - up >= 0 && circles[row - up][col] == target) {
            up++;
        } else {
            single.push('up');
        }
        // 严重建议加一个全局变量 用于控制棋盘大小
        if (!single.includes('down') && row + down <= 14 && circles[row + down][col] == target) {
            down++;
        } else {
            single.push('down');
        }
    }
    return up + down >= 6;
}

/**
 * 横向查找是否有五个连续的相同的棋子
 * @param row
 * @param col
 */
const checkHorizontal = (row: number, col: number) => {
    let target = circles[row][col];
    // 水平方向的检测 只需要检查col +-
    let left = 0;
    let right = 0;
    let single = [];
    for (let i = 0; i < 5; i++) {
        if (!single.includes('left') && row - left >= 0 && circles[row][col - left] == target) {
            left++;
        } else {
            single.push('left');
        }
        // 严重建议加一个全局变量 用于控制棋盘大小
        if (!single.includes('right') && row + right <= 14 && circles[row][col + right] == target) {
            right++;
        } else {
            single.push('right');
        }
    }
    return left + right >= 6;
}

/**
 * 从左上到右下连续
 * @param row
 * @param col
 */
const checkNW2SE = (row: number, col: number) => {
    let target = circles[row][col];
    let nw = 0; // 左上
    let se = 0; // 右下
    let single = [];
    for (let i = 0; i < 5; i++) {
        if (!single.includes('nw') && (row - nw >= 0 && col - nw >= 0) && circles[row - nw][col - nw] == target) {
            nw++;
        } else {
            single.push('nw');
        }
        // 严重建议加一个全局变量 用于控制棋盘大小
        if (!single.includes('se') && (row + se <= 14 && col + se <= 14) && circles[row + se][col + se] == target) {
            se++;
        } else {
            single.push('se');
        }
    }
    return nw + se >= 6;
}

/**
 * 从左下到右上
 * @param row
 * @param col
 */
const checkNE2SW = (row: number, col: number) => {
    let target = circles[row][col];
    let ne = 0;//右上
    let sw = 0;//左下
    let single = [];
    for (let i = 0; i < 5; i++) {
        if (!single.includes('ne') && (row - ne >= 0 && col + ne <= 14) && circles[row - ne][col + ne] == target) {
            ne++;
        } else {
            single.push('ne');
        }
        // 严重建议加一个全局变量 用于控制棋盘大小
        if (!single.includes('sw') && (row + sw <= 14 && col - sw >= 0) && circles[row + sw][col - sw] == target) {
            sw++;
        } else {
            single.push('sw');
        }
    }
    return ne + sw >= 6;
}


const emit = defineEmits(["backMenu", 'backPlayer', 'getGameResult'])

const backMenu = () => emit("backMenu")
const backPlayer = (player: Player) => emit('backPlayer', player);
//获取游戏结果
const getGameResult = () => {
    store.setLocation(circles);
    updateResult(GameRoomResultState.WIN);
    emit('getGameResult', store.$state.result)
}
//倒计时函数
const countdown = (time: number) => {
    let remainingTime = time;

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
            updateResult(GameRoomResultState.LOSE);
        }
    }

    // 每秒更新一次剩余时间
    timer = setInterval(updateRemainingTime, 1000);

}
// 更新游戏结果
const updateResult = (state: GameRoomResultState) => {
    store.setGameState(GameRoomState.END);
    store.setResult(props.player, state);
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
