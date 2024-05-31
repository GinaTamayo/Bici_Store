import express from "express";
import authController from '../controllers/auth-controller';
import validateUser from '../middleware/user.middleware';

const router = express.Router();

router.post('/', validateUser.validarteAuth, authController);

export default router;
