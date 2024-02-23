import { defineStore } from 'pinia'
export const globalStore = defineStore('global', {

    state: () => {
        return {
            // 游戏难度
            difficulty: 'middle',
            // 当前局此
            rounds: 0,
            // 游戏状态
            gameState: 'init',
            // 背景图片
            bgImage: 'game-bg',
            // 是否显示游戏日志roomStore
            isShowGameInfo: true,
            // 游戏日志
            gameLogItems: []
        }
    }
})