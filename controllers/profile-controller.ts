import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import Profile from "../Dto/ProfileDto";
import validateToken from "../middleware/middlewareToken";

let updateProfile = async (req: Request, res: Response) =>{

    try {
        const token = req.cookies.token;
        const decoded = await validateToken(token);
        const { numeroDocumento, nombre, apellido, telefono, numeroDocumentoAntiguo} = req.body;
        const result = await UserRepository.updateProfile(new Profile(numeroDocumento, nombre, apellido, telefono, numeroDocumentoAntiguo));

        return res.status(200).json({
            status: 'success',
            message: 'Perfil de usuario actualizdo exitosamente'
        });
        
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al actualizar el perfil del usuario',
            //error: error.message,
        });
    }
}

export default updateProfile;






/*import { Request, Response } from "express";
import ProfileService from "../services/ProfileService";
import Profile from "../Dto/ProfileDto";

let updateProfile = async (req: Request, res: Response) => {
    try {
        const { numeroDocumento, nombre, apellido, telefono, numeroDocumentoAntiguo } = req.body;
        await ProfileService.updateProfile(new Profile(numeroDocumento, nombre, apellido, telefono, numeroDocumentoAntiguo));
        return res.status(200).json({
            status: 'success',
            message: 'Profile updated successfully'
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Failed to update profile'
        });
    }
}

export default updateProfile; */