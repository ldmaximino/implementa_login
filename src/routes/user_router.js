//Third party imports
import { Router } from "express";

//Local imports
import * as controller from "../controllers/user_controller.js";

const router = Router();

router.post("/login", controller.login);
router.post("/register", controller.register);

export default router;
