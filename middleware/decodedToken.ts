import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

let decodedToken = async(token: string ) =>{
    try {
        const decodedToken: any = jwt.decode(token, { json: true });
        return decodedToken
    } catch (error) {
        throw error;
    }
}

export default {decodedToken};