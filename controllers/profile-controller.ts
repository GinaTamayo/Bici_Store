import { Request, Response } from "express";
import ProfileService from "../services/ProfileServices";
import Profile from "../Dto/ProfileDto";
import { validationResult } from "express-validator";

let updateProfile = async (req: Request, res: Response) => {
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
            numeroDocumentoAntiguo 
        } = req.body;
         
        await ProfileService.updateProfile(new Profile(numeroDocumento, nombre, apellido, telefono, numeroDocumentoAntiguo));

        return res.status(200).json({
            status: 'success',
            message: 'Profile updated successfully'
        });
    } catch (error:any) {
        return res.status(500).json({
            status: 'error',
            message: 'Failed to update profile',
            error: error.message
        });
    }
}

export default updateProfile; 