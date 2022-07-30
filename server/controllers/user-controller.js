const userService = require("../services/user-service");

const login = async (req, res, next) => {
  try {
  } catch (error) {}
};
const logout = async (req, res, next) => {
  try {
  } catch (error) {}
};
const registration = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await userService.registration(email, password);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (error) {
    next(error);
  }
};
const refresh = async (req, res, next) => {
  try {
  } catch (error) {}
};
const activate = async (req, res, next) => {
  try {
    const activationLink = req.params.link;
    await userService.activation(activationLink);
    return res.redirect(process.env.CLIENT_URL);
  } catch (error) {
    next(error);
  }
};
const users = async (req, res, next) => {
  try {
    res.json({ user: "Yan" });
  } catch (error) {}
};

module.exports = { login, logout, activate, refresh, registration, users };
