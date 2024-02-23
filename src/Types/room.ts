import { PieceType } from "./piece";
import { Player } from "./player";

export enum GameRoomState {
    // 等待中
    PEDDING,
    // 进行中
    RUNNING,
    // 结束
    END
}
export enum GameRoomResultState {
    //失败
    LOSE = -1,
    // 平局
    DRAW,
    // 胜利 
    WIN,
}
export enum GameRoomMode {
    //单机
    STAND_ALONE,
    //联机
    ONLINE,
}
export interface GameRoomType {
    //当前对局id
    id: string | null,
    // 当前对局状态
    state: GameRoomState,
    // 当前的玩家信息
    players: Player[],
    // 当前的步计时器
    stepTime: number,
    // 游戏结果
    result: GameRoomResult,
    // 棋子数组
    pieceTypes: PieceType[],
    // 房间模式
    mode: GameRoomMode,
    // 对局的棋子落子位置
    locations: string[][],
}
export interface GameRoomResult {
    // 游戏玩家
    player: null | Player;
    // 游戏状态
    state: GameRoomResultState;
}
