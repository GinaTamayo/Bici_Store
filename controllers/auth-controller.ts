const bcrypt = require("bcryptjs");
const db = require('../config/config-db.js');

import { Request, Response } from "express";
import UserRepository from '../repositories/UserRepository';
import Auth from "../Dto/AuthDto";
import createToken from "../Helpers/generateToken";
import dotenv from "dotenv";
dotenv.config();

let auth = async (req: Request, res: Response) => {
      try {
        const {email, password} = req.body;
        const result: any = await UserRepository.auth(new Auth(email, password));
        const token = createToken(email);
        if (result[0].length > 0){
          const isPasswordValid = await bcrypt.compare(password, result[0][0].password);
          if (isPasswordValid){
            res.cookie("token", token, {
              httpOnly: true
            });
            return res.status(200).json({ 
              status: 'Successful authentication',
              AccesToken : token
            });
          }
        }
        return res.status(401).json({ 
          status: 'Incorrect username or password'
        });
      } catch (error) {
        return res.status(500).send({ errorInfo: "Ha ocurrido un error en el servidor.", error });
      }
}

export default auth;









/*import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import Auth from "../Dto/AuthDto";

let login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const accessToken = await AuthService.login(new Auth(email, password));
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
 */