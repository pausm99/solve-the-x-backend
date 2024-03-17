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

            await User.create({
                username,
                password: hashedPassword,
            });

            return res.status(201).json({ message: 'User registered successfully' });
                
        } catch (error) {
            return res.status(500).json({ message: 'Error creating user', error });
        }
    }

    async login(req: Request, res: Response): Promise<Response<string>> {
        try {
            const { username, password } = req.body;

            const user = await User.findByPk(username);

            if (!user){
                return res.status(401).json({ message: 'User not found' });
            }

            const passwordValid = await bcrypt.compare(password, user!.password);
            if (!passwordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            else {
                const token = generateAuthToken(user);
                return res.status(200)
                    .header('Authorization', `Bearer ${token}`)
                    .json({ message: 'User logged successfully' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error creating user', error });
        }
    }
    
}

export default new UserController();
