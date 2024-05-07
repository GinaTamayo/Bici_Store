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














/*// middleware/middlewareToken.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.split(' ')[1]; // Obtiene el token del encabezado de autorización

    if (!accessToken) {
        return res.status(401).json({ message: 'Access denied. Token missing.' });
    }

    try {
        const secret = process.env.SECRET ?? 'SECRET';
        await jwt.verify(accessToken, secret); // Verifica el token JWT
        console.log('Token is correct');
        next(); // Si el token es válido, pasa al siguiente middleware o controlador
    } catch (err) {
        return res.status(403).json({ message: 'Access denied. Invalid token.' });
    }
};

export default validateToken;
*/ 