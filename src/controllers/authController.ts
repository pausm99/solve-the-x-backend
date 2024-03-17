import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userModel';
import { generateAuthToken } from '../middleware/authMiddleware';


export class UserController {

    async register(req: Request, res: Response): Promise<Response<string>> {
        try {
            const { username, password } = req.body;
            
            const existingUser = await User.findOne({ where: { username } });

            if (existingUser) {
                return res.status(400).json({ message: 'Username already in use' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                username,
                password: hashedPassword,
            });

            const token = generateAuthToken(newUser);

            return res.status(201)
                .header('Authorization', `Bearer ${token}`)
                .json({ message: 'User registered successfully' });
                
        } catch (error) {
            return res.status(500).json({ message: 'Error creating user', error });
        }
    }
    
}

export default new UserController();
