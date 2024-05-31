import express from "express";
import registerController from '../controllers/register-controller';
import validateUser from '../middleware/user.middleware';


const router = express.Router();

router.post('/', validateUser.validateRegister, registerController);

export default router;