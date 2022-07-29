const jwt = require("jsonwebtoken");
const TokenModel = require("../models/token-model");

const saveToken = async (userId, token) => {
    const existUser = TokenModel.findOne({ user: userId })
    await TokenModel.create({ refreshToken: token })
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

module.exports = { generateToken };
