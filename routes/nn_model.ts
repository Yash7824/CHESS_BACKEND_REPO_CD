import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from 'path'

dotenv.config();
const router = express.Router();

router.get(
    '/getNNModel', async (req: Request, res: Response) => {
        try {
            const modelPath = path.join(__dirname, '..', 'assets', 'neural_network_models', 'chess_move_predictor.onnx');
            if(!modelPath) return res.status(400).json({statusMsg: 'File not found'});

            return res.status(200).sendFile(modelPath);
        } catch (error: any) {
            return res.status(500).json({statusMsg: "Internal Server Error"});
        }
    }
)


module.exports = router;