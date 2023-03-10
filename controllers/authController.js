const { registration, login } = require("../services/authService");

const regController = async (req, res) => {
  const { email, password } = req.body;
  await registration(email, password);
  return res.status(201).json({ status: "success" });
};

const loginController = (req, res) => {};

module.exports = {
  regController,
  loginController,
};
