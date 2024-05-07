import express from "express";
import updateProfile from "../controllers/profile-controller";
import validateToken from "../middleware/middlewareToken"

const router = express.Router();

router.put('/', updateProfile);

export default router;