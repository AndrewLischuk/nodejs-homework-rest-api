const {
  registration,
  login,
  logout,
  currentUser,
  updateSubscr,
} = require("../services/authService");
const { WrongParametersError } = require("../helpers/errors");

const regController = async (req, res) => {
  const { email, password } = req.body;
  const user = await registration(email, password);
  return res
    .status(201)
    .json({ user: { email: user.email, subscription: user.subscription } });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const token = await login(email, password);
  return res.status(200).json({ status: "success", token });
};

const logoutController = async (req, res) => {
  const { _id: userId } = req.user;
  await logout(userId);
  return res.status(204).json({ status: "no content" });
};

const currentUserController = async (req, res) => {
  const { _id: userId } = req.user;
  // console.log(userId);
  const user = await currentUser(userId);
  return res
    .status(200)
    .json({ user: { email: user.email, subscription: user.subscription } });
};

const updateSubscrController = async (req, res) => {
  const { subscription } = req.query;
  const { _id: userId } = req.user;
  if (Object.keys(req.query).length === 0) {
    throw new WrongParametersError(
      `You need to provide subscription value ("starter", "pro" or "business")`
    );
  }
  if (subscription) {
    const user = await updateSubscr(userId, subscription);
    return res
      .status(200)
      .json({ user: { email: user.email, subscription: user.subscription } });
  }
  console.log(Object.keys(req.query).length);
};

module.exports = {
  regController,
  loginController,
  logoutController,
  currentUserController,
  updateSubscrController,
};
