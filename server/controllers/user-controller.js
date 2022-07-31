const { validationResult } = require("express-validator");
const userService = require("../services/user-service");
const ApiError = require("../exeptions/error");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await userService.login(email, password);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const token = await userService.logout(refreshToken);
    res.clearCookie("refreshToken");
    return res.json(token);
  } catch (error) {
    next(error);
  }
};

const registration = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw ApiError.BadRequest("Validation error", errors.array());
    }
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
    const { refreshToken } = req.cookies;
    const userData = await userService.refresh(refreshToken);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (error) {
    next(error);
  }
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
    const users = (await userService.users()) || {};
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, logout, activate, refresh, registration, users };
