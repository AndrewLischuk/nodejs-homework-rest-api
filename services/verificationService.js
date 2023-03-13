const { User } = require("../db/userModel");
const path = require("path");
const {
  VerificationError,
  WrongParametersError,
} = require("../helpers/errors");
const { transporter } = require("../helpers/mailSender");

const verification = async (providedToken) => {
  const user = await User.findOne({ verificationToken: providedToken });
  if (!user) {
    throw new VerificationError("User not found");
  }
  await User.updateMany({ verificationToken: null, verify: true });
};

const repeatVerification = async (email) => {
  const user = await User.findOne({ email: email });
  if (user.verify) {
    throw new WrongParametersError("Verification has already been passed");
  }
  console.log(user.verificationToken);

  const verifyURL = path.join(
    `localhost:${process.env.PORT}`,
    "/api/auth/users",
    `/verify/${user.verificationToken}`
  );
  const emailOptions = {
    from: "andrewlischuk@meta.ua",
    to: email,
    subject: "Repeat verification",
    text: "Hello! Please verify your email by clicking the link below!",
    html: `<a target="_blank" href="http://${verifyURL}">Confirm your email</a>`,
  };

  transporter
    .sendMail(emailOptions)
    .then(() => {})
    .catch((err) => console.log(err));
};

module.exports = { verification, repeatVerification };
