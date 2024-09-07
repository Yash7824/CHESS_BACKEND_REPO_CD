import isValidBishopMove  from "./isValidBishopMove";
import isValidRookMove from "./isValidRookMove";

const isValidQueenMove = (fromRow: number, fromCol: number, toRow: number, toCol: number, board: string[][], isWhite: boolean) => {
    // Queen moves like both a rook and a bishop
    return (
      isValidRookMove(fromRow, fromCol, toRow, toCol, board, isWhite) ||
      isValidBishopMove(fromRow, fromCol, toRow, toCol, board, isWhite)
    );
  }

export default isValidQueenMove;