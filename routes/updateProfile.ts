import express from "express";
import middlewareToken from "../middleware/middlewareToken";
import updateProfileController from "../controllers/profile-controller";
const router = express.Router();

router.put('/updateProfile', updateProfileController.updateProfile);

export default router;