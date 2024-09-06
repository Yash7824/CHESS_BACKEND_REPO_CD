import { Socket, Server } from "socket.io";
import isValidMove from "./IsValidMove";
import isKingInCheck from "./isKingInCheck";
import isCheckmate from "./isCheckMate";

const makeMovement = (io: Server, socket: Socket, fromRow: number, fromCol: number, toRow: number, toCol: number, gameState: any, gameAnalysis: any) => {
  let {chessboard, currentPlayer} = gameState;
    if (isValidMove(fromRow, fromCol, toRow, toCol, chessboard, currentPlayer)) {

      let piece = chessboard[fromRow][fromCol];
      gameAnalysis.moves.push(`moved-${piece}-${toRow},${toCol}`)
        // Update the board
        chessboard[toRow][toCol] = chessboard[fromRow][fromCol];
        chessboard[fromRow][fromCol] = '';

        if(gameState.currentPlayer == 'white'){
          gameState.currentPlayer = 'black';
        } else if(gameState.currentPlayer == 'black'){
          gameState.currentPlayer = 'white';
        }

        // Check if the opponent's king is in check
        const opponentPlayer = currentPlayer === 'white' ? 'black' : 'white';
        let isWhite = opponentPlayer === 'white' ? true : false;
        const kingInCheck = isKingInCheck(chessboard, isWhite);

        if (kingInCheck) {
            // Check for checkmate
            const checkmate = isCheckmate(chessboard, isWhite);
            if (checkmate) {
                io.emit('gameOver', { winner: currentPlayer });
                return;
            } else {
                io.emit('kingInCheck', { player: opponentPlayer });
            }
        }

        console.log('after validation current player: ', gameState.currentPlayer)
        io.emit('updateBoard', chessboard);
        io.emit('currentPlayer', gameState.currentPlayer);
      }
}

export default makeMovement;