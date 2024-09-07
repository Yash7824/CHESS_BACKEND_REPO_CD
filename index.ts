import express, { Express, Request, Response } from "express";
import cors from "cors";
const { createServer } = require("http");
import { Server, Socket } from "socket.io";
import dotenv from "dotenv";
import createRoom from "./services/room/createRoom";
import joinRoom from "./services/room/joinRoom";
import disconnect from "./services/room/disconnect";
import updateChessBoardState from "./services/chess/updateChessBoardState";
import updateMovementList from "./services/chess/updateMovementList";
import { Room } from "./interfaces/room";
import connectToMongo from "./config/db"
import { createInitialBoard } from "./services/chess/createInitialBoard";
import makeMovement from "./services/chess/makeMovement";
import restartGame from "./services/chess/restartGame";
import saveGame from "./services/chess/saveGame";

dotenv.config();

// Server Init and Config
const app: Express = express();
connectToMongo();
const server: any = createServer(app);
const port = process.env.PORT || 3000;
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Typescript + Node.js + Express Server");
});

app.use('/api/auth', require('./controllers/AuthController'))
app.use('/api/admin', require('./controllers/AdminController'))
app.use('/api/social', require('./controllers/SocialController'))
app.use('/api/nn_model', require('./controllers/NN_ModelController'))
app.use('/api/gameAnalysis', require('./controllers/GameAnalysisController'))


let gameState = {
  chessboard: createInitialBoard(),
  currentPlayer: 'white'
};

let gameAnalysis = {
  moves: []
}

// Maintain a list of active rooms and users in each room
const activeRooms: Map<string, Room> = new Map();
// Maps each socket id created for user to their username
const socketIDToUserNameMapper: Map<string,string> = new Map();
io.on("connection", (socket) => {
  socket.on("create room", (roomName: string, userName: string) => createRoom(io, socket, roomName, userName, activeRooms, socketIDToUserNameMapper));
  socket.on("join room", (roomName: string, userName: string) => joinRoom(io, socket, roomName, userName, activeRooms, socketIDToUserNameMapper));
  socket.on("updateChessboardState", (roomName: string, updatedChessBoardMatrix: Array<Array<string>>, updatedChessBoardAttributes: any) => updateChessBoardState(io, socket, roomName, updatedChessBoardMatrix, updatedChessBoardAttributes, socketIDToUserNameMapper));
  socket.on("disconnect", () => disconnect(io, socket, activeRooms, socketIDToUserNameMapper));
  socket.on("movementTable", (roomName: string, updatedMovementList: any) => updateMovementList(io, socket, updatedMovementList, roomName, activeRooms, socketIDToUserNameMapper))

  socket.on('makeMove', (fromRow: number, fromCol: number, toRow: number, toCol: number, roomName: string) => makeMovement(io, socket, fromRow, fromCol, toRow, toCol, roomName, gameState, gameAnalysis));

  socket.on('saveGame', (authtoken: any) => saveGame(io, authtoken, gameAnalysis));
  socket.on('restartGame', () => restartGame(io, gameState));
});

server.listen(port, () => {
  console.log(`Server is Running on Port:${port}`);
});
