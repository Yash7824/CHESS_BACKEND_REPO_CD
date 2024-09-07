import { isOpponentPiece } from "./isOpponentPiece";

export function isValidKnightMove(fromRow: number, fromCol: number, toRow: number, toCol: number, board: string[][], isWhite: boolean) {
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);
    // Knights move in an L-shape
    if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
      // Valid move if the target square is either empty or contains an opponent's piece
      return !board[toRow][toCol] || isOpponentPiece(board[toRow][toCol], isWhite);
    }
    return false;
  }