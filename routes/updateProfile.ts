import express from "express";
import updateProfile from "../controllers/profile-controller";
import validateToken from "../middleware/validateToken"
import validateUser from "../middleware/user.middleware";

const router = express.Router();

router.put('/', validateUser.validateUpdateUser,  validateToken, updateProfile);

export default router;