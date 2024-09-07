import { Socket, Server } from "socket.io";
import isValidMove from "./IsValidMove";
import isKingInCheck from "./isKingInCheck";
import isCheckmate from "./isCheckmate";

const makeMovement = (io: Server, socket: Socket, fromRow: number, fromCol: number, toRow: number, toCol: number, roomName: string, gameState: any, gameAnalysis: any) => {
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
                io.to(roomName).emit('gameOver', { winner: currentPlayer });
                return;
            } else {
                io.to(roomName).emit('kingInCheck', { player: opponentPlayer });
            }
        }

        console.log('after validation current player: ', gameState.currentPlayer)
        io.to(roomName).emit('updateBoard', chessboard);
        io.to(roomName).emit('currentPlayer', gameState.currentPlayer);
      }
}

export default makeMovement;