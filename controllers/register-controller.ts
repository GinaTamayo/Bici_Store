import User from '../Dto/UserDto';
import UserService from '../services/UserServices';
import { Request, Response } from "express";
import { validationResult } from 'express-validator'; 

let register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      numeroDocumento,
      nombre,
      apellido,
      telefono,
      email,
      password,
      confirmPassword
    }  = req.body;

    

    await UserService.register(new User(numeroDocumento, nombre, apellido, telefono, email, password));
    
    return res.status(201).send(
      { status: 'register ok'}
    );

  } catch (error: any) {
    if (error && error.code == "ER_DUP_ENTRY") {
      return res.status(500).send({ errorInfo: error.sqlMessage }
      );
    }else{
      return res.status(500).send({ error})
    }
  }
}

export default register;