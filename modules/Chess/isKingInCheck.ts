import findKingPosition from "./findKingPosition";
import isSquareAttacked from "./isSquareAttacked";

const isKingInCheck = (board: string[][], isWhite: boolean) => {
    let kingPos = findKingPosition(board, isWhite);
    if(kingPos) return isSquareAttacked(board, kingPos.row, kingPos.col, isWhite);
    return false;
};

export default isKingInCheck;