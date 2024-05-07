import User from '../Dto/UserDto';
import UserService from '../services/UserServices';
import { Request, Response } from "express";
import validateEmail from '../middleware/validateEmail';


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
    }  = req.body;



    if (!validateEmail(email)) {
      return res.status(400).send({ error: 'El correo no cumple con los requerimientos necesarios' });
    }
    if (confirmPassword != password) {
      return res.status(400).send({ error: 'La contraseña no coincide' });
    }

    
    const result = await UserService.register(new User(numeroDocumento, nombre, apellido, telefono, email, password));
    
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