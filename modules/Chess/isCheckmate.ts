import isCurrentPlayerPiece from "./isCurrentPlayerPiece";
import isKingInCheck from "./isKingInCheck";
import isValidMove from "./IsValidMove";

const isCheckmate = (board: string[][], isWhite: boolean) => {
    if (!isKingInCheck(board, isWhite)) {
        return false;
    }

    // Check if the current player can make any valid move to escape check
    for (let fromRow = 0; fromRow < board.length; fromRow++) {
        for (let fromCol = 0; fromCol < board[fromRow].length; fromCol++) {
            const piece = board[fromRow][fromCol];
            if (piece && isCurrentPlayerPiece(piece, isWhite)) {
                for (let toRow = 0; toRow < board.length; toRow++) {
                    for (let toCol = 0; toCol < board[toRow].length; toCol++) {
                        const originalBoard = JSON.parse(JSON.stringify(board)); // Copy board
                        let currentPlayer = isWhite ? 'white' : 'black';
                        if (isValidMove(fromRow, fromCol, toRow, toCol, board, currentPlayer)) {
                            // Make the move
                            board[toRow][toCol] = board[fromRow][fromCol];
                            board[fromRow][fromCol] = '';

                            // Check if the king is still in check after this move
                            if (!isKingInCheck(board, isWhite)) {
                                return false; // King can escape check
                            }

                            // Restore the board
                            board = originalBoard;
                        }
                    }
                }
            }
        }
    }

    // No valid moves, it's checkmate
    return true;
};

export default isCheckmate;
