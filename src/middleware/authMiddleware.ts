import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';

const secretKey: Secret | undefined = process.env.SECRET_KEY;

function generateAuthToken(user: User): string {
    const payload = {
        username: user.username,
        password: user.password,
    };
    if (!secretKey) throw new Error('secretKey is no defined');
    return jwt.sign(payload, secretKey, { expiresIn: '2h' });
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, consistent-return
function authenticateToken(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
  
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized, token not provided' });
        }

        if (!secretKey) throw new Error('secretKey is no defined');
  
        // eslint-disable-next-line consistent-return
        jwt.verify(token, secretKey, (err) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}


export { generateAuthToken, authenticateToken };
