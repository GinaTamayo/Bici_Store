import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();


interface JwtPayload {
    data: {email: string},
    exp: number,
    iat: number
}


const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.get('Authorization');    
    if (authorization) {
        const token = authorization.split(' ')[1]        
        if (!token) {
            return res.status(401).json(
                { status: 'you have not sent a token' }
  ,           );
        };
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;            
            req.body.email = decoded.data.email;
            next()
        } catch (error) {
            return res.status(403).json(
                { status: 'Unauthorized' }
            );
        }
    }
    else { 
        return res.status(403).json(
        { status: "The Authorization header is required"}
        );
    }
   
}

export default validateToken;