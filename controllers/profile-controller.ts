import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import middlewareToken from "../middleware/middlewareToken";
import User from '../Dto/UserDto';

let updateProfile = async (req: Request, res: Response) =>{
    try {
        const token = req.cookies.token;
        const decoded = await middlewareToken.validateToken(token);
        const { numeroDocumento, nombre, apellido, telefono,  numeroDocumentoAntiguo} = req.body;
        await UserRepository.updateProfile(numeroDocumento, nombre, apellido, telefono,  numeroDocumentoAntiguo);

        return res.status(200).json({
            status: 'success',
            message: 'Perfil de usuario actualizdo exitosamente'
        });
        
    } catch (error) {
        return res.status(500).json({
            status: 'success',
            message: 'Error al actualizar el perfil del usuario'
        });
    }
}

export default { updateProfile }