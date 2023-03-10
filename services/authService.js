const { User } = require("../db/userModel");

const registration = async (email, password) => {
  const user = new User({ email, password });
  await user.save();
};

const login = async (req, res) => {};

module.exports = {
  registration,
  login,
};
