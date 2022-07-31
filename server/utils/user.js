const getUserData = (user) => {
  return {
    id: user._id,
    email: user.email,
    isActivated: user.isActivated,
  };
};
module.exports = { getUserData };
