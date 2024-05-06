import express from "express";
import middlewareToken from "../middleware/middlewareToken";
import updateProfileController from "../controllers/profile-controller";
import updateProfile from "../controllers/profile-controller";
const router = express.Router();

router.put('/', updateProfile);

export default router;