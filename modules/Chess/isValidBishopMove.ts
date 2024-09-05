import { isOpponentPiece } from "./isOpponentPiece";

const isValidBishopMove = (fromRow: number, fromCol: number, toRow: number, toCol: number, board: string[][], isWhite: boolean) => {
    // Bishops move diagonally, so the row and column distance must be equal
    if (Math.abs(fromRow - toRow) !== Math.abs(fromCol - toCol)) return false;
  
    // Ensure no pieces block the path
    const rowStep = fromRow < toRow ? 1 : -1;
    const colStep = fromCol < toCol ? 1 : -1;
    let row = fromRow + rowStep;
    let col = fromCol + colStep;
    while (row !== toRow && col !== toCol) {
      if (board[row][col]) return false; // Blocked by another piece
      row += rowStep;
      col += colStep;
    }
  
    return !board[toRow][toCol] || isOpponentPiece(board[toRow][toCol], isWhite);
  }

  export default isValidBishopMove;