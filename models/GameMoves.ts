import mongoose, { Document } from 'mongoose';
import { Player } from '../interfaces/player';
const { Schema } = mongoose;

export interface IGameMoves extends Document {
  user_id: string;
  moves: string[];
  player1: Player;
  player2: Player;
  date: Date;
}

const GameMovesSchema = new Schema<IGameMoves>({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  moves: {
    type: [String],
    required: true
  },
  player1: {
    type: Object,
  },
  player2: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const GameMoves = mongoose.model<IGameMoves>('gameMovesSchema', GameMovesSchema);
export default GameMoves;