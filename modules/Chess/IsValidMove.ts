import isValidBishopMove from "./isValidBishopMove";
import isValidKingMove from "./isValidKingMove";
import { isValidKnightMove } from "./isValidKnightMove";
import isValidPawnMove from "./isValidPawnMove";
import isValidQueenMove from "./isValidQueenMove";
import isValidRookMove from "./isValidRookMove";

const isValidMove = (fromRow: number, fromCol: number, toRow: number, toCol: number, board: string[][], currentPlayer: string) => {// Current chess board state
    const piece = board[fromRow][fromCol];
    const target = board[toRow][toCol];
    // Ensure a piece is being moved
    if (!piece) return false;
  
    // Ensure the piece belongs to the current player
    const isWhite = piece === piece.toUpperCase();
    console.log(isWhite, currentPlayer);
    if ((currentPlayer === 'white' && !isWhite) || (currentPlayer === 'black' && isWhite)) {
      return false;
    }
  
    switch (piece) {
      case 'p':
      case 'P': 
        return isValidPawnMove(fromRow, fromCol, toRow, toCol, board, isWhite);
      case 'r':
      case 'R':
        return isValidRookMove(fromRow, fromCol, toRow, toCol, board, isWhite);
      case 'n':
      case 'N':
        return isValidKnightMove(fromRow, fromCol, toRow, toCol, board, isWhite);
      case 'b':
      case 'B':
        return isValidBishopMove(fromRow, fromCol, toRow, toCol, board, isWhite);
      case 'q':
      case 'Q':
        return isValidQueenMove(fromRow, fromCol, toRow, toCol, board, isWhite);
      case 'k':
      case 'K':
        return isValidKingMove(fromRow, fromCol, toRow, toCol, board, isWhite);
      default:
        return false;
    }
  }

  export default isValidMove;