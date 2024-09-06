import axios from "axios";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();
const baseURL = process.env.BASE_URL;

const saveGame = async (io: Server, authtoken: any, gameAnalysis: any) => {

    try{
        const headers = {
            'Content-Type': 'application/json',
            'auth-token': authtoken
          };

        const response = await axios.post(`${baseURL}/api/gameAnalysis/saveMoves`, gameAnalysis, {headers})
        io.emit('savedGameData', {data: response.data});
    }catch(error: any){
        console.error('Error saving game:', error);
    } 
}

export default saveGame;