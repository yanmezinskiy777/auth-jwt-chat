const Router = require("express").Router;
const paths = require("./authPaths");
const userControllers = require("../controllers/user-controller");

const router = new Router();

router.post(paths.login, userControllers.login);
router.post(paths.logout, userControllers.logout);
router.post(paths.registration, userControllers.registration);
router.get(paths.refresh, userControllers.refresh);
router.get(paths.activate, userControllers.activate);
router.get(paths.users, userControllers.users);

module.exports = router;