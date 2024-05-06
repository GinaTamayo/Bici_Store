import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

async function validateToken(accessToken: string | undefined): Promise<void> {
    const secret = process.env.SECRET ?? 'SECRET' 
    if (!accessToken) {
        throw new Error('Access denied');
    }
    try {
         await jwt.verify(accessToken, secret);
        console.log('Token is correct');
    } catch (err) {
        throw new Error('Access denied, token expired or incorrect');
    }
}
export default validateToken;