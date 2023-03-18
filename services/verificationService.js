const { User } = require("../db/userModel");
const {
  VerificationError,
  WrongParametersError,
} = require("../helpers/errors");

const { PORT, BASE_URL } = process.env;

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

  const verificationOptions = {
    to: email,
    subject: "Repeate verification",
    text: "Hello! Please verify your email by clicking the link below!",
    html: `<a target="_blank" href="${BASE_URL}${PORT}/api/auth/users/verify/${user.verificationToken}">Confirm your email</a>`,
  };
  await sendEmail(verificationOptions);
};

module.exports = { verification, repeatVerification };
