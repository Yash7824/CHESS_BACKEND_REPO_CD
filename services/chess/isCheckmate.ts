import isCurrentPlayerPiece from "./isCurrentPlayerPiece";
import isKingInCheck from "./isKingInCheck";
import isValidMove from "./IsValidMove";

const isCheckmate = (board: string[][], isWhite: boolean) => {
    const playerColor = isWhite ? 'white' : 'black';

    // If the king is not in check, it cannot be checkmate
    if (!isKingInCheck(board, isWhite)) {
        return false;
    }

    // Iterate through all pieces of the current player to check for possible escape moves
    for (let fromRow = 0; fromRow < board.length; fromRow++) {
        for (let fromCol = 0; fromCol < board[fromRow].length; fromCol++) {
            const piece = board[fromRow][fromCol];
            if (piece && isCurrentPlayerPiece(piece, isWhite)) {
                for (let toRow = 0; toRow < board.length; toRow++) {
                    for (let toCol = 0; toCol < board[toRow].length; toCol++) {
                        // Skip if the move is invalid
                        const originalBoard = JSON.parse(JSON.stringify(board)); // Copy the board
                        if (!isValidMove(fromRow, fromCol, toRow, toCol, originalBoard, playerColor)) {
                            continue;
                        }

                        // Make the move
                        originalBoard[toRow][toCol] = originalBoard[fromRow][fromCol];
                        originalBoard[fromRow][fromCol] = '';

                        // Check if the king is still in check after the move
                        if (!isKingInCheck(originalBoard, isWhite)) {
                            return false; // King can escape check
                        }
                    }
                }
            }
        }
    }

    // No valid moves to escape check, it's checkmate
    return true;
};

export default isCheckmate;
