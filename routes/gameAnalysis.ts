import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authorization from "../middleware/authorization";
import { v4 as uuidv4 } from 'uuid';
import User from "../models/User";
import GameMoves from "../models/GameMoves";

dotenv.config();
const router = express.Router();
const jwtSecret = process.env.jwtSecret;

// POST /saveMoves route
router.post('/saveMoves', authorization, async (req: any, res: Response) => {
  try {
    let success = false;

    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    // Get the current user from the JWT payload
    const currentUser = await User.findOne({ user_id: req.user.id });
    if (!currentUser) return res.status(404).json({ statusMsg: "User Not Found" });

    // Destructure the moves from the request body
    const { moves } = req.body;

    // Check if moves exist in the request
    if (!moves || !Array.isArray(moves)) {
      return res.status(400).json({ statusMsg: "Invalid moves data" });
    }

    // Create a new GameMoves document
    const gameMoves = new GameMoves({
      user_id: uuidv4().toString(),
      moves: moves, // Ensure that this is a valid array
      player1: {
        user_id: currentUser.user_id,
        name: currentUser.name,
        email: currentUser.email
      },
      player2: {
        user_id: currentUser.user_id, // May change this if there's another player involved
        name: currentUser.name,
        email: currentUser.email
      },
      date: new Date()
    });

    // Save the game moves
    await gameMoves.save();

    success = true;
    return res.status(200).json({ success, gameMoves });

  } catch (error: any) {
    console.error('Error saving moves:', error);
    return res.status(500).json({ statusMsg: "INTERNAL SERVER ERROR" });
  }
});

module.exports = router;
