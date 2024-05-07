import { Request, Response } from "express";
import ProfileService from "../services/ProfileServices";
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

export default updateProfile; 