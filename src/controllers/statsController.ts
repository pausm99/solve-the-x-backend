import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';


export async function getStatistics(req: Request, res: Response): Promise<Response> {
    try {
        const stats = await calculateStatistics();
        return res.status(200).json(stats);
    } catch (error) {
        return res.status(500).json({ message: 'Error calculating player statistics' });
    }
}

async function calculateStatistics() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('./db/database.sqlite');

        db.get(
            `SELECT 
                COUNT(*) AS totalPlayers,
                ROUND(AVG(height), 1) AS avgHeight,
                ROUND(AVG(weight), 1) AS avgWeight,
                (SELECT 
                    position
                    FROM players
                    GROUP BY position
                    ORDER BY COUNT(*) DESC
                    LIMIT 1) AS topPosition
            FROM players;
            `, (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
                db.close(); 
            });
    });
}
