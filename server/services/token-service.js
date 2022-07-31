const jwt = require("jsonwebtoken");
const TokenModel = require("../models/token-model");

const saveToken = async (userId, refreshToken) => {
  const existUser = await TokenModel.findOne({ user: userId });
  if (existUser) {
    existUser.refreshToken = refreshToken;
    return existUser.save();
  }
  const token = await TokenModel.create({ user: userId, refreshToken });
  return token;
};

const verifyToken = async (token, secretString) => {
  try {
    const result = await jwt.verify(token, secretString);
    return result;
  } catch (error) {
    return null;
  }
};

const generateToken = async (payload) => {
  const accessToken = await jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
    expiresIn: "30m",
  });
  const refreshToken = await jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
    expiresIn: "1d",
  });

  return {
    accessToken,
    refreshToken,
  };
};

const removeToken = async (refreshToken) => {
  const result = await TokenModel.remove({ refreshToken });
  return result;
};

const findToken = async (refreshToken) => {
  const result = await TokenModel.findOne({ refreshToken });
  return result;
};

module.exports = {
  generateToken,
  saveToken,
  removeToken,
  findToken,
  verifyToken,
};
