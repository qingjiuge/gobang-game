export enum PieceType {
    // 白色
    white,
    // 黑色
    black
}
// 棋子类
export class Piece {
    // 棋子的类型
    type: PieceType;
    constructor(type: PieceType) {
      this.type=type
    }
}
