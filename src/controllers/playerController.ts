import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
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
        await validatePlayer(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, age, position, height, weight } = req.body;
            const newPlayer = await Player.create({ name, age, position, height, weight });
            return res.status(201).json(newPlayer);
        } catch (error) {
            return res.status(500).json({ message: 'Error creating player', error });
        }
    }

    async updatePlayer(req: Request, res: Response): Promise<Response<Player>> {
        await validatePlayer(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        try {
            const id = req.params.id;
            const { name, age, position, height, weight } = req.body;
            
            const player = await Player.findByPk(id);

            if (!player) {
                return res.status(404).json({ message: 'Player not found' });
            }

            player.name = name;
            player.age = age;
            player.position = position;
            player.height = height;
            player.weight = weight;

            await player.save();

            return res.status(200).json(player);
        } catch (error) {
            return res.status(500).json({ message: 'Error updating player', error });
        }
    }

    async deletePlayer(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id;
            
            const player = await Player.findByPk(id);

            if (!player) {
                return res.status(404).json({ message: 'Player not found' });
            }

            await player.destroy();

            return res.status(200).json({ message: "Player deleted successfully"});
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting player', error });
        }
    }
}

async function validatePlayer(req: Request): Promise<void> {
    await body('name', 'Name is required').notEmpty().isString().run(req);
    await body('age', 'Age is required').notEmpty().isInt().run(req);
    await body('position', 'Position is required').notEmpty().isString().run(req);
    await body('height', 'Height is required').notEmpty().isFloat().run(req);
    await body('weight', 'Weight is required').notEmpty().isFloat().run(req);
}

export default new PlayerController();
