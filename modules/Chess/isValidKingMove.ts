import { isOpponentPiece } from "./isOpponentPiece";

const isValidKingMove = (fromRow: number, fromCol: number, toRow: number, toCol: number, board: string[][], isWhite: boolean) => {
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);
  // King moves one square in any direction
  if (rowDiff <= 1 && colDiff <= 1) {
    // Valid move if the target square is either empty or contains an opponent's piece
    return !board[toRow][toCol] || isOpponentPiece(board[toRow][toCol], isWhite);
  }
  return false;
  }

export default isValidKingMove;