import jwt from 'jsonwebtoken';

async function createToken(correo: string) {
    try {
        const secret = process.env.SECRET ?? 'SECRET'; 
        const payload = { correo };
        return jwt.sign(payload, secret, { expiresIn: '60m' });
    } catch (error) {
        throw new Error('Error create token');
    }
}

export default createToken;