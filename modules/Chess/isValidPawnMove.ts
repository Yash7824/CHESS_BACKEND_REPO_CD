import { isOpponentPiece } from "./isOpponentPiece";

const isValidPawnMove = (fromRow: number, fromCol: number, toRow: number, toCol: number, board: string[][], isWhite: boolean) =>  {
    const direction = isWhite ? -1 : 1;
    const startRow = isWhite ? 6 : 1;
  
    // Moving forward (one or two spaces from the start position)
    if (fromCol === toCol) {
      if (board[toRow][toCol]) return false; // Blocked by a piece
      if (toRow === fromRow + direction) return true; // Single move forward
      if (fromRow === startRow && toRow === fromRow + 2 * direction && !board[fromRow + direction][fromCol]) {
        return true; // Two-move forward from starting position
      }
    }

    if (Math.abs(fromCol - toCol) === 1 && toRow === fromRow + direction) {
        return !!board[toRow][toCol] && isOpponentPiece(board[toRow][toCol], isWhite);
    }

    return false;
}

export default isValidPawnMove;
  