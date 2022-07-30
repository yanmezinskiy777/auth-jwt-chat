const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const authPaths = require("../router/authPaths");
const ApiError = require("../exeptions/error");

const registration = async (email, password) => {
  const existUser = await UserModel.findOne({ email });
  if (existUser) {
    throw ApiError.BadRequest(`User with email address ${email} already exist.`);
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
  const userData = {
    id: user._id,
    email: user.email,
    isActivated: user.isActivated,
  };
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

module.exports = { registration, activation };
