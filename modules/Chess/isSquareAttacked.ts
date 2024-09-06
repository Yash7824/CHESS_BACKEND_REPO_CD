import { isOpponentPiece } from "./isOpponentPiece";
import isValidMove from "./IsValidMove";

const isSquareAttacked = (board: string[][], row: number, col: number, isWhite: boolean) => {
    // Loop through all opponent's pieces and check if any can attack the square
    const opponent = isWhite ? 'black' : 'white';
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[r].length; c++) {
            const piece = board[r][c];
            if (piece && isOpponentPiece(piece, isWhite)) {
                if (isValidMove(r, c, row, col, board, opponent)) {
                    return true;
                }
            }
        }
    }
    return false;
};

export default isSquareAttacked;