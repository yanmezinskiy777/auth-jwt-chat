const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");

const registration = async (email, password) => {
  const existUser = await UserModel.findOne({ email });
  if (existUser) {
    throw new Error(`User with email address ${email} already exist.`);
  }
  const link = uuid.v4();
  const hashPassword = bcrypt.hash(password, 3);
  const user = UserModel.create({ email, password: hashPassword });
  await mailService.sendActivation(email, link);
  
};

module.exports = { registration };
