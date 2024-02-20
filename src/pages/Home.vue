<template>
    <div class="home">
        <div class="container">
            <GameMenu v-if="menuItem === 0" @menu-select="getMenuItem" />
            <CheckerBoard v-else-if="menuItem === 1" @back-menu="menuItem = 0" />
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
import { Player, PieceMode } from '@/Types/player';

const menuItem = ref(0);

const gameConfig = {
    // 玩家1信息
    player1: {},
    // 玩家2信息
    player2: {},
    // 游戏的状态
    status: 0,
}

// 当前游戏玩家信息
const currentPlayer = ref<Player>();
const currentOrder = ref<number>(0);
const getMenuItem = (item: IMenuItem) => {
    if (item.id === 1) {
        readyGame();
    }
    menuItem.value = item.id;
    console.log(gameConfig)
}

// 准备游戏工作
const readyGame = () => {
    const player1 = createPlayer(PieceMode.player, PieceType.black);
    const player2 = createPlayer(PieceMode.computer, PieceType.white);
    gameConfig.player1 = player1;
    gameConfig.player2 = player2;
    if (!currentOrder.value) {
        player1.updateStatus(1);
        updateCurrentPlayer(player1);
    } else {
        player1.updateStatus(2);
        updateCurrentPlayer(player2);
    }
    gameConfig.status = 1
}

// 创建玩家
const createPlayer = (mode: PieceMode, type: PieceType, id: string = null) => {
    const player = new Player();
    player.updateMode(mode);
    player.updateUid(id);
    player.updateStatus(0);
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
