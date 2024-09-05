import { Socket, Server } from "socket.io";
import isValidMove from "./IsValidMove";

const makeMovement = (io: Server, socket: Socket, fromRow: number, fromCol: number, toRow: number, toCol: number, chessboard: string[][], currentPlayer: string) => {
    
    if (isValidMove(fromRow, fromCol, toRow, toCol, chessboard, currentPlayer)) {
        // Update the board
        chessboard[toRow][toCol] = chessboard[fromRow][fromCol];
        chessboard[fromRow][fromCol] = '';
  
        currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
  
        io.emit('updateBoard', chessboard);
        io.emit('currentPlayer', currentPlayer);
      }
}

export default makeMovement;