//Third party imports
import { Router } from "express";

//Local imports
import * as controller from "../controllers/cart_controller.js";

const router = Router();

router.get("/", controller.getAllCarts);

router.get("/:cid", controller.getCartById);

router.post("/", controller.createCart);

router.post("/:cid/product/:pid", controller.saveProductToCart);

router.put("/:cid", controller.updateCartWithProducts);

router.put("/:cid/product/:pid", controller.updateProductQuantity);

router.delete("/:cid/product/:pid", controller.deleteProductFromCart);

router.delete("/:cid", controller.deleteAllProductsFromCart);

export default router;
