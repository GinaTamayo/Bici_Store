import express from "express";
import updateProfile from "../controllers/profile-controller";
import validateToken from "../middleware/validateToken"

const router = express.Router();

router.put('/',  validateToken, updateProfile);

export default router;