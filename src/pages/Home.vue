<template>
    <div class="home">
        <div class="container">
            <GameMenu v-if="menuItem === 0 && !isLoading" @menu-select="getMenuItem" />
            <CheckerBoard v-else-if="menuItem === 1" @back-menu="menuItem = 0" @back-player="getCurrentPlayer"
                @get-game-result="getGameResult" :player="currentPlayer" />
            <DeveloperList v-else-if="menuItem === 5" @back-menu="menuItem = 0" />
            <ResultMenu :visibel="isShowResult()" :player="currentPlayer" />
            <Loadding v-if="isLoading" @on-progress="getCurrentProgress" @back-progress="overProgress" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import CheckerBoard from '@/Components/CheckerBoard.vue';
import GameMenu from '@/Components/GameMenu.vue';
import DeveloperList from '@/Components/DeveloperList.vue';
import ResultMenu from '@/Components/ResultMenu.vue';
import Loadding from '@/Components/Loadding.vue';
import { roomStore } from '@/Stores/room'
import { IMenuItem } from '@/Types';
import { PieceType, Piece } from '@/Types/piece';
import { Player, PieceMode, PlayerStatus } from '@/Types/player';
import { uuid } from '@/Until/tools';
import { GameRoomMode, GameRoomResult, GameRoomState } from '@/Types/room';
import EventBus from '@/Until/event-bus';
const menuItem = ref(0);
const store = roomStore();
// 当前游戏玩家信息
const currentPlayer = ref<Player>();
//玩家准备队列
const readyQueue: Player[] = [];
// 加载中控制
const isLoading = ref(false);
const getMenuItem = (item: IMenuItem) => {
    if (item.id === 1) {
        readyGame();
        updateLoading(true)
    } else {
        menuItem.value = item.id
    }
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
EventBus.on('resultMenu', (data: { mode: number, item: IMenuItem }) => {
    menuItem.value = 0;
    const { mode, item } = data;
    if (mode === GameRoomMode.STAND_ALONE) {
        const { id } = item;
        if (id !== 3) {
            store.$reset();
            store.setGameState(GameRoomState.RUNNING);
            updateLoading(true)
        } else {
            store.$reset();
            menuItem.value = 0;
        }
    } else {
        console.log('联机游戏')
    }
})
const isShowResult = () => {
    console.log(store.$state.state === GameRoomState.END)
    return store.$state.state === GameRoomState.END;
}
const updateLoading = (visibel: boolean) => {
    isLoading.value = visibel;
}
const getCurrentProgress = (value: number) => {
    console.log('当前进度', value)
}
const overProgress = (isOk: boolean) => {
    console.log('是否加载成功', isOk);
    setTimeout(() => {
        if (isOk) {
            updateLoading(false);
            menuItem.value = 1
        }
    }, 1000)

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
