import { ONE_MINUTE } from '@/types'
import { GameRoomMode, GameRoomState, GameRoomType } from '@/types/room'
import { defineStore } from 'pinia'
import { Player } from '@/types/player';
import { PieceType } from '@/types/piece';
import { getRandomInt } from '@/utils/tools';
export const roomStore = defineStore('room', {
    state: () => {
        //当前对局的信息
        return {
            //当前对局id
            id: null,
            // 当前对局状态
            state: 0,
            // 当前的玩家信息
            players: [],
            // 当前的步计时器
            stepTime: ONE_MINUTE * 3,
            // 游戏结果
            result: {
                player: null,
                state: -1,
            },
            // 棋子数组
            pieceTypes: [PieceType.black, PieceType.white],
            //房间模式
            mode: GameRoomMode.STAND_ALONE,
            // 棋子的落子位置
            locations: []

        }

    },
    getters: {
        //获取state参数
        getRoomState(state): GameRoomType {
            return state
        },
        // 获取随机获取棋子
        getPieceTypes(state): PieceType | undefined {
            const pieces = state.pieceTypes;
            if (pieces.length === 0) {
                return undefined
            } else {
                const index = getRandomInt(pieces.length);
                return pieces.splice(index, 1)[0];

            }
        },
        //判断是否是联机模式
        isOnlineMode(state): boolean {
            return state.mode === GameRoomMode.ONLINE;
        },
        //获取对局状态
        getGameState(state): GameRoomState {
            return state.state;
        }
    },

    actions: {
        //重置棋子
        resetPieceTypes() {
            this.pieceTypes = [PieceType.black, PieceType.white]
        },
        // 设置房间id
        setRoomId(id: string | null) {
            this.id = id
        },
        // 设置游戏状态
        setGameState(state: GameRoomState) {
            this.state = state
        },
        //添加房间的玩家
        addRoomPlayer(player: Player) {
            this.players.push(player)
        },
        //设置玩家信息
        setRoomPlayers(players: Player[]) {
            this.players = players;
        },
        //设置当前步计时器
        setRoomStepTime(time: number) {
            this.stepTime = time
        },
        //设置游戏结果
        setResult(player: Player, state: number) {
            this.result.player = player;
            this.result.state = state;
        },
        // 设置棋子的落子位置
        setLocation(locations:string[][]){
            this.location = locations;
        },
        // 设置state
        setRoomState(state: GameRoomType) {
            this.$patch(state)
        }

    }
})
