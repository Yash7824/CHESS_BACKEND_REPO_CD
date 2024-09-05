import { isOpponentPiece } from "./isOpponentPiece";

const isValidRookMove = (fromRow: number, fromCol: number, toRow: number, toCol: number, board: string[][], isWhite: boolean) => {
    // Rooks move in straight lines, either horizontally or vertically
    if (fromRow !== toRow && fromCol !== toCol) return false;
  
    // Ensure there are no pieces blocking the way (except the destination)
    if (fromRow === toRow) {
      const step = fromCol < toCol ? 1 : -1;
      for (let col = fromCol + step; col !== toCol; col += step) {
        if (board[fromRow][col]) return false; // Blocked by another piece
      }
    } else if (fromCol === toCol) {
      const step = fromRow < toRow ? 1 : -1;
      for (let row = fromRow + step; row !== toRow; row += step) {
        if (board[row][fromCol]) return false; // Blocked by another piece
      }
    }
  
    return !board[toRow][toCol] || isOpponentPiece(board[toRow][toCol], isWhite);
  }

  export default isValidRookMove;