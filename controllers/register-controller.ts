import bcrypt from 'bcryptjs';
import UserRepository from '../repositories/UserRepository';
import User from '../Dto/UserDto';
import { Request, Response } from "express";


let register = async (req: Request, res: Response) => {
  try {
    const {
      numeroDocumento,
      nombre,
      apellido,
      telefono,
      email,
      password,
      confirmPassword
    } = req.body;

    if (confirmPassword != password) {
      return res.status(400).send({ error: 'La contraseña no coincide' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await UserRepository.add(new User(numeroDocumento, nombre, apellido, telefono, email, hashedPassword));
    
    return res.status(201).send(
      { status: 'register ok', password_hasheado: hashedPassword }
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