import jwt, { Secret } from 'jsonwebtoken';
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

export { generateAuthToken };
