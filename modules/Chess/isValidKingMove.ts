import isKingInCheck from "./isKingInCheck";
import { isOpponentPiece } from "./isOpponentPiece";
import isSquareAttacked from "./isSquareAttacked";

const isValidKingMove = (fromRow: number, fromCol: number, toRow: number, toCol: number, board: string[][], isWhite: boolean) => {
    const piece = board[fromRow][fromCol];

    // Castling flags
    let kingMoved: boolean = false;
    let rookMoved: boolean = false;

    // Castling check for white king
    if (piece === 'K') {
        kingMoved = board[7][4] !== 'K'; // King starts at [7, 4] for white
        rookMoved = toCol > fromCol ? board[7][7] !== 'R' : board[7][0] !== 'R'; // Right rook (K-side) or left rook (Q-side)
    }

    // Castling check for black king
    if (piece === 'k') {
        kingMoved = board[0][4] !== 'k'; // King starts at [0, 4] for black
        rookMoved = toCol > fromCol ? board[0][7] !== 'r' : board[0][0] !== 'r'; // Right rook (K-side) or left rook (Q-side)
    }

    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);

    // Standard King Move: one square in any direction
    if (rowDiff <= 1 && colDiff <= 1) {
        // Valid move if the target square is empty or contains an opponent's piece
        return !board[toRow][toCol] || isOpponentPiece(board[toRow][toCol], isWhite);
    }

    // Castling Logic
    if (!kingMoved && (toCol === fromCol + 2 || toCol === fromCol - 2)) { // Castling move
        if (toCol === fromCol + 2 && !rookMoved && board[fromRow][5] === '' && board[fromRow][6] === '') {
            // Short castling (king-side)
            if (
                !isKingInCheck(board, isWhite) && 
                !isSquareAttacked(board, fromRow, fromCol + 1, !isWhite) && 
                !isSquareAttacked(board, fromRow, fromCol + 2, !isWhite)
            ) {
                // Move the king and rook for short castling
                board[fromRow][fromCol] = ''; // Clear original king position
                board[fromRow][7] = '';       // Clear original rook position
                board[fromRow][fromCol + 2] = piece; // Move king
                board[fromRow][fromCol + 1] = isWhite ? 'R' : 'r'; // Move rook
                return true;
            }
        } else if (toCol === fromCol - 2 && !rookMoved && board[fromRow][1] === '' && board[fromRow][2] === '' && board[fromRow][3] === '') {
            // Long castling (queen-side)
            if (
                !isKingInCheck(board, isWhite) && 
                !isSquareAttacked(board, fromRow, fromCol - 1, !isWhite) && 
                !isSquareAttacked(board, fromRow, fromCol - 2, !isWhite)
            ) {
                // Move the king and rook for long castling
                board[fromRow][fromCol] = ''; // Clear original king position
                board[fromRow][0] = '';       // Clear original rook position
                board[fromRow][fromCol - 2] = piece; // Move king
                board[fromRow][fromCol - 1] = isWhite ? 'R' : 'r'; // Move rook
                return true;
            }
        }
    }

    return false; // Invalid king move
};

export default isValidKingMove;
