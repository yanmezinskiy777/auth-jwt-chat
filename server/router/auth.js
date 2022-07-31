const Router = require("express").Router;
const { body } = require("express-validator");
const paths = require("./authPaths");
const AuthMiddleware = require("../middleware/auth-middleware");
const userControllers = require("../controllers/user-controller");

const router = new Router();

router.post(
  paths.registration,
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userControllers.registration
);
router.post(paths.login, userControllers.login);
router.post(paths.logout, userControllers.logout);
router.get(paths.refresh, userControllers.refresh);
router.get(paths.activate, userControllers.activate);
router.get(paths.users, AuthMiddleware, userControllers.users);

module.exports = router;
