const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { User } = require("../db/userModel");
const { NotAuthorizedError, ConflictError } = require("../helpers/errors");

const registration = async (email, password) => {
  const userExists = await User.findOne({ email });

  if (!userExists) {
    const avatarURL = gravatar.url(email, { s: "200" });
    const user = new User({ email, password, avatarURL });
    await user.save();
    return user;
  }
  throw new ConflictError(`The email "${email}" is already in use`);
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError(
      `No user with "${email}" found or you provided wrong password`
    );
  }

  if (user.token) {
    throw new ConflictError("You already loged in");
  }
  const token = jwt.sign(
    { _id: user._id, createdAt: user.createdAt },
    process.env.JWT_SECRET
  );
  await User.findOneAndUpdate(
    { email },
    {
      $set: { token },
    }
  );
  return token;
};

const logout = async (userId) => {
  await User.findByIdAndUpdate(userId, { $unset: { token: 1 } });
};

const currentUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    next(new NotAuthorizedError("You need to log in first!"));
  }
  return user;
};

const updateSubscr = async (userId, subscription) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: { subscription },
    },
    { new: true }
  );
  if (!user) {
    next(new NotAuthorizedError("You need to log in first!"));
  }
  return user;
};

module.exports = {
  registration,
  login,
  logout,
  currentUser,
  updateSubscr,
};
