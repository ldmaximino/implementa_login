//Third party imports
import { Router } from "express";

//Local imports
import { productValidator } from "../middlewares/product_validators.js";
import * as controller from "../controllers/product_controller.js";
import { validateLogin } from "../middlewares/validate_login.js";

const router = Router();

router.get("/", validateLogin, controller.getAllProducts);

router.get("/:pid", validateLogin, controller.getProductById);

router.post("/", validateLogin, productValidator, controller.createProduct);

router.put("/:pid", validateLogin, productValidator, controller.updateProduct);

router.delete("/:pid", validateLogin, controller.deleteProduct);

export default router;
