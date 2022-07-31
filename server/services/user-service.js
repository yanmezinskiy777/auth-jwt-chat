const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const ApiError = require("../exeptions/error");
const { getUserData } = require("../utils/user");

const registration = async (email, password) => {
  const existUser = await UserModel.findOne({ email });
  if (existUser) {
    throw ApiError.BadRequest(
      `User with email address ${email} already exist.`
    );
  }
  const link = uuid.v4();
  const hashPassword = await bcrypt.hash(password, 3);
  const user = await UserModel.create({
    email,
    password: hashPassword,
    activationLink: link,
  });
  await mailService.sendActivation(
    email,
    `${process.env.API_URL}/api/auth/activate/${link}`
  );
  const userData = getUserData(user);
  const tokens = await tokenService.generateToken({ ...userData });
  await tokenService.saveToken(userData.id, tokens.refreshToken);
  return { ...tokens, user: userData };
};

const activation = async (activationLink) => {
  const user = await UserModel.findOne({ activationLink });
  if (!user) {
    throw ApiError.BadRequest("User with activation link doesn't exist.");
  }
  user.isActivated = true;
  await user.save();
};

const login = async (email, password) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw ApiError.BadRequest(
      `The user with the email(${email}) address does not exist.`
    );
  }
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    throw ApiError.BadRequest(`The credentials is wrong`);
  }
  const userData = getUserData(user);
  const tokens = await tokenService.generateToken({ ...userData });
  await tokenService.saveToken(userData.id, tokens.refreshToken);
  return { ...tokens, user: userData };
};

const logout = async (refreshToken) => {
  const token = await tokenService.removeToken(refreshToken);
  return token;
};

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError("You are not authorized");
  }

  const user = await tokenService.verifyToken(
    refreshToken,
    process.env.JWT_REFRESH_KEY
  );
  const dbToken = await tokenService.findToken(refreshToken);

  if (!user || !dbToken) {
    throw ApiError.UnauthorizedError("You are not authorized");
  }
  const findUser = await UserModel.findById(user.id);

  const userData = getUserData(findUser);
  const tokens = await tokenService.generateToken({ ...userData });
  await tokenService.saveToken(userData.id, tokens.refreshToken);
  return { ...tokens, user: userData };
};

const users = async () => {
  const users = await UserModel.find();
  return users;
};

module.exports = { registration, activation, logout, login, refresh, users };
