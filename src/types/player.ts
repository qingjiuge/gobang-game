import { uuid } from "@/utils/tools";
import { Piece } from "./piece";

export enum PlayerStatus {
    // 等待中
    waiting,
    // 准备好
    ready,
    // 完成
    over,
    // 超时
    timeout
}

export enum PieceMode {
    // 电脑
    computer,
    // 玩家
    player
}

// 玩家类
export class Player {
    // 玩家的用户id
    uid: string | null;
    // 玩家的id
    id: string | null;
    // 玩家的棋子类型
    pieceType: Piece;
    // 玩家的状态
    status: PlayerStatus;
    // 玩家的昵称
    nickName: string;
    // 玩家的胜负情况
    result: number[] = [];
    // 玩家模式
    mode: PieceMode;
    constructor() {
        this.id = uuid();
        this.status = 0;
        this.nickName = "玩家" + this.id;
        this.result = [];
        this.mode = 0;
    }
    // 更新玩家状态
    updateStatus(status: number) {
        this.status = status;
    }
    // 更新玩家棋子类型
    updatePieceType(piece: Piece) {
        this.pieceType = piece;
    }
    // 更新玩家胜负情况
    updateResult(result: number) {
        this.result.push(result);
    }
    // 更新模式
    updateMode(mode: PieceMode) {
        this.mode = mode;
    }
    // 更新用户id
    updateUid(uid: string | null) {
        this.uid = uid ? uid : uuid();
    }

}
