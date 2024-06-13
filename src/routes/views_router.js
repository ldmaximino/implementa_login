import { Router } from "express";
import ProductDaoMongoDB from "../daos/mongodb/product_dao.js";
import CartDaoMongoDB from "../daos/mongodb/cart_dao.js";
import { validateLogin } from "../middlewares/validate_login.js";
import { numberFormat } from "../utils.js";

const router = Router();

const productDao = new ProductDaoMongoDB();
const cartDao = new CartDaoMongoDB();

//When loading the project, it shows the login screen
router.get("/", (req, res) => {
  res.redirect("/login");
});

////////////////////////////////// User Register and Login ///////////////////////////////
//User Register
router.get("/register", (req, res) => {
  res.render("register");
});

//User Login
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  req.session.user.loggedIn = false;
  req.session.user.first_name = "";
  req.session.user.last_name = "";
  req.session.user.role = "user";
  req.session.destroy();
  res.redirect("/login");
});

//View Error User Login
router.get("/user_login_error", (req, res) => {
  res.render("user_login_error");
});

//View Message User Exist in User Register
router.get("/user_exist", (req, res) => {
  res.render("user_exist");
});

//View Message User Registered in User Register
router.get("/user_registered", (req, res) => {
  res.render("user_registered");
});
////////////////////////////////// Views Products and Cart ///////////////////////////////

//View Products
router.get("/products", validateLogin, async (req, res) => {
  let dataUser = {};
  if (req.session.user) {
    dataUser = {
      first_name: req.session.user.first_name,
      last_name: req.session.user.last_name,
      role: req.session.user.role,
    };
  }
  let products = await productDao.getProducts();
  res.render("products", { products: products, dataUser });
});

//View One Cart
router.get("/cart/:cid", validateLogin, async (req, res) => {
  const { cid } = req.params;
  let cartDetail = await cartDao.getCartById(cid);
  const products = cartDetail.products.map((obj) => {
    return {
      quantity: obj.quantity,
      title: obj.product.title,
      price: numberFormat(obj.product.price),
      totalItem: numberFormat(obj.product.price * obj.quantity),
      totalPrice: obj.product.price * obj.quantity,
    };
  });
  const totalAmount = numberFormat(
    products.reduce((total, curr) => total + curr.totalPrice, 0)
  );
  res.render("cart", { products, totalAmount });
});

////////////////////////////////// View Chat ///////////////////////////////
router.get("/chat", (req, res) => {
  res.render("chat");
});

export default router;
