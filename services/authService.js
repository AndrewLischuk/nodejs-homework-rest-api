const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { User } = require("../db/userModel");
const { NotAuthorizedError, ConflictError } = require("../helpers/errors");
const { transporter } = require("../helpers/mailSender");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const registration = async (email, password) => {
  const userExists = await User.findOne({ email });

  if (!userExists) {
    const avatarURL = gravatar.url(email, { s: "200" });
    const verificationToken = uuidv4();
    const user = new User({ email, password, avatarURL, verificationToken });
    await user.save();

    const verifyURL = path.join(
      `localhost:${process.env.PORT}`,
      "/api/auth/users",
      `/verify/${verificationToken}`
    );
    const emailOptions = {
      from: "andrewlischuk@meta.ua",
      to: email,
      subject: "Verification",
      text: "Hello! Please verify your email by clicking the link below!",
      html: `<a target="_blank" href="http://${verifyURL}">Confirm your email</a>`,
    };

    transporter
      .sendMail(emailOptions)
      .then(() => {})
      .catch((err) => console.log(err));

    return user;
  }
  throw new ConflictError(`The email "${email}" is already in use`);
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (
    !user ||
    !(await bcrypt.compare(password, user.password)) ||
    !user.verify
  ) {
    throw new NotAuthorizedError(
      `No verified user with "${email}" found or you provided wrong password`
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
