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
    if ((currentPlayer === 'white' && !isWhite) || (currentPlayer === 'black' && isWhite)) {
      return false;
    }
  
    const pieceType = piece.toLowerCase();
  
    switch (pieceType) {
      case 'p': // Pawn
        return isValidPawnMove(fromRow, fromCol, toRow, toCol, board, isWhite);
      case 'r': // Rook
        return isValidRookMove(fromRow, fromCol, toRow, toCol, board, isWhite);
      case 'n': // Knight
        return isValidKnightMove(fromRow, fromCol, toRow, toCol, board, isWhite);
      case 'b': // Bishop
        return isValidBishopMove(fromRow, fromCol, toRow, toCol, board, isWhite);
      case 'q': // Queen
        return isValidQueenMove(fromRow, fromCol, toRow, toCol, board, isWhite);
      case 'k': // King
        return isValidKingMove(fromRow, fromCol, toRow, toCol, board, isWhite);
      default:
        return false;
    }
  }

  export default isValidMove;