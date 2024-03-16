import { Request, Response } from 'express';
import Player from '../models/playerModel';

export class PlayerController {

    async getAllPlayers(req: Request, res: Response): Promise<Response<Player[]>> {
        try {
            const players = await Player.findAll();
            if (players.length > 0) return res.status(200).json(players);
            else return res.status(204).end();
        } catch (error) {
            return res.status(500).json({ message: 'Error obtaining players', error });
        }
    }

    async createPlayer(req: Request, res: Response): Promise<Response<Player>> {
        try {
            const { name, age, position, height, weight } = req.body;
            const newPlayer = await Player.create({ name, age, position, height, weight });
            return res.status(201).json(newPlayer);
        } catch (error) {
            return res.status(500).json({ message: 'Error creating player', error });
        }
    }
    
}

export default new PlayerController();
