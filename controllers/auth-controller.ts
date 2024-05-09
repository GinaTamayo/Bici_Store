import { Request, Response } from "express";
import AuthService from "../services/AuthServices";
import Auth from "../Dto/AuthDto";

let login = async (req: Request, res: Response) => {
    try {
        const { 
          email, 
          password 
        } = req.body;
        
        const accessToken = await AuthService.login(new Auth(email, password));
        
        res.cookie('token', accessToken, {
            httpOnly: true
          })
        
        
        return res.status(200).json({
            status: 'Successful authentication',
            accessToken
        });
    } catch (error) {
        return res.status(401).json({ 
            status: 'Incorrect username or password'
        });
    }
}

export default login;
 