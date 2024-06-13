import { Router } from "express";
import ProductDaoMongoDB from "../daos/mongodb/product_dao.js";
import CartDaoMongoDB from "../daos/mongodb/cart_dao.js";
import { validateLogin } from "../middlewares/validate_login.js";

const router = Router();

const productDao = new ProductDaoMongoDB();
const cartDao = new CartDaoMongoDB();

//When loading the project, it shows the login screen
router.get("/", (req,res) => {
  res.redirect('/login');
});

////////////////////////////////// User Register and Login ///////////////////////////////
//User Register
router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req,res) => {
  res.render("login");
});

//User Login
router.get("/logout", (req,res) => {
  req.session.user ={};
  req.session.destroy();
  res.redirect('/login');
});

//View Error User Login
router.get("/user_login_error", (req,res) => {
  res.render("user_login_error");
});

//View Message User Exist in User Register
router.get("/user_exist", (req,res) => {
  res.render("user_exist");
});

//View Message User Registered in User Register
router.get("/user_registered", (req,res) => {
  res.render("user_registered");
});
////////////////////////////////// Views Products and Cart ///////////////////////////////

//View Products
router.get('/products',validateLogin, async(req,res) => {
  let dataUser={};
  if(req.session.user) {
    dataUser = {first_name: req.session.user.first_name,
                last_name: req.session.user.last_name,
                role: req.session.user.role};
  };
  let products = await productDao.getProducts();
  res.render("products", {products: products, dataUser});
});

//View One Cart
router.get('/cart/:cid',validateLogin, async(req,res) => {
  const { cid } = req.params;
  let cartDetail = await cartDao.getCartById(cid);
  res.render("cart", {products: cartDetail.products});
});

////////////////////////////////// View Chat ///////////////////////////////
router.get("/chat", (req, res) => {
  res.render("chat");
});

export default router;
