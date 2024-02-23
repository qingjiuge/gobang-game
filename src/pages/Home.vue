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
import { roomStore } from '@/Stores/room'
import { IMenuItem } from '@/Types';
import { PieceType, Piece } from '@/Types/piece';
import { Player, PieceMode, PlayerStatus } from '@/Types/player';
import { uuid } from '@/Until/tools';
import { GameRoomResult, GameRoomState } from '@/Types/room';
const menuItem = ref(0);
const store = roomStore();
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
    createPlayer();
    createComputer();
    //生成游戏房间id
    store.setRoomId(uuid());
    store.setGameState(GameRoomState.RUNNING);
    //开始游戏
    queueLoop();
    console.log(currentPlayer)
}
//创建玩家
const createPlayer = () => {
    const player = createGamePlayer(PieceMode.player, store.getPieceTypes);
    store.addRoomPlayer(player);
    readyQueue.push(player);
}
//创建电脑
const createComputer = () => {
    if (!store.isOnlineMode) {
        const player = createGamePlayer(PieceMode.computer, store.getPieceTypes);
        store.addRoomPlayer(player);
        readyQueue.push(player);
    }

}


// 创建玩家
const createGamePlayer = (mode: PieceMode, type: PieceType, id: string = null) => {
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
//获取游戏结果
const getGameResult = (result: GameRoomResult) => {
    console.log("游戏结束", `${result.player}:${result.state}`);
    console.log('当前对局信息:', store.$state)
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
