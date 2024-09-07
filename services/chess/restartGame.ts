import { Server } from "socket.io";
import { createInitialBoard } from "./createInitialBoard"

const restartGame = (io: Server, gameState: any) => {
    let {chessBoard, currentPlayer} = gameState;
    console.log('restarts')
    chessBoard = createInitialBoard();
    currentPlayer = 'white';
    io.emit('chessBoard', {chessBoard, currentPlayer});
}

export default restartGame;