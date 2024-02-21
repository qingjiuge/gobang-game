<template>
    <div class="home">
        <div class="container">
            <GameMenu v-if="menuItem === 0" @menu-select="getMenuItem" />
            <CheckerBoard v-else-if="menuItem === 1" @back-menu="menuItem = 0" @back-player="getCurrentPlayer"
                @get-game-result="getGameResult" :player="currentPlayer" />
            <DeveloperList v-else-if="menuItem === 5" @back-menu="menuItem = 0" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import CheckerBoard from '@/Components/CheckerBoard.vue';
import GameMenu from '@/Components/GameMenu.vue';
import DeveloperList from '@/Components/DeveloperList.vue';

import { IMenuItem } from '@/Types';
import { PieceType, Piece } from '@/Types/piece';
import { Player, PieceMode, PlayerStatus } from '@/Types/player';

const menuItem = ref(0);

const gameConfig = {
    //玩家队列
    playerQueue: [],
    // 玩家1信息
    player1: {},
    // 玩家2信息
    player2: {},
    // 游戏的状态 0未开始 1进行中 2结束
    status: 0,
    // 计时器时间
    timer: 1000 * 60 * 3,
    // 游戏结果 获胜玩家id
    winPlayer: []
}

// 当前游戏玩家信息
const currentPlayer = ref<Player>();
//玩家准备队列
const readyQueue: Player[] = [];
const getMenuItem = (item: IMenuItem) => {
    if (item.id === 1) {
        readyGame();
    }
    menuItem.value = item.id;
}

// 准备游戏工作
const readyGame = () => {
    const player1 = createPlayer(PieceMode.player, PieceType.black);
    const player2 = createPlayer(PieceMode.computer, PieceType.white);
    gameConfig.playerQueue.push(player1);
    gameConfig.playerQueue.push(player2)
    gameConfig.player1 = player1;
    gameConfig.player2 = player2;
    if (readyQueue.length === 0) {
        readyQueue.push(player1);
        readyQueue.push(player2);
    }
    queueLoop();
    gameConfig.status = 1
}

// 创建玩家
const createPlayer = (mode: PieceMode, type: PieceType, id: string = null) => {
    const player = new Player();
    player.updateMode(mode);
    player.updateUid(id);
    player.updateStatus(PlayerStatus.waiting);
    player.updatePieceType(createPiece(type))
    return player;
}

// 创建棋子
const createPiece = (type: PieceType) => {
    const piece = new Piece(type);
    return piece;
}

// 更新当前游戏玩家
const updateCurrentPlayer = (player: Player) => {
    currentPlayer.value = player;

}
// 监听玩家状态
const getCurrentPlayer = (player: Player) => {
    if (player.status !== PlayerStatus.timeout) {
        readyQueue.push(player);
        queueLoop();
    } else {
        // 玩家超时处理
        const winPlayer = gameConfig.playerQueue.filter((item) => item.id !== player.uid)[0] ? gameConfig.playerQueue.filter((item) => item.id !== player.uid)[0] : null;
        if (winPlayer.uid) {
            addWinners(winPlayer.uid);
            gameConfig.status = 2;
            console.log("玩家超时,游戏结束", `${winPlayer.nickName}获得胜利！`)
        }

    }

}
//队列循环
const queueLoop = () => {
    if (readyQueue.length > 0) {
        const readPlayer = readyQueue.shift();
        readPlayer?.updateStatus(PlayerStatus.ready);
        updateCurrentPlayer(readPlayer);
    }
}
//添加获胜名单
const addWinners = (playerId: string) => {
    gameConfig.winPlayer.push(playerId);
}
//获取游戏结果
const getGameResult = (player: Player) => {
    gameConfig.status = 2;
    console.log("游戏结束", `${player.nickName}获得胜利`);
}

// 监听游戏状态
const watchGameStatus = () => {
    watch(() => gameConfig.status, (newValue, oldValue) => {
        if (newValue === 1) {
            readyGame();
        }
    })
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
    }
}
</style>
