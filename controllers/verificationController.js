const { WrongParametersError } = require("../helpers/errors");
const {
  verification,
  repeatVerification,
} = require("../services/verificationService");

const verificationController = async (req, res) => {
  const { verificationToken } = req.params;
  if (!verificationToken) {
    throw WrongParametersError("missing required parameter verificationToken");
  }
  await verification(verificationToken);
  return res.status(200).json({ message: "Verification successful" });
};

const repeatVerificationController = async (req, res) => {
  const { email } = req.body;
  if (Object.keys(req.body).length === 0) {
    throw new WrongParametersError(`Missing required field email`);
  }
  await repeatVerification(email);
  return res.status(200).json({ message: "Verification email sent" });
};

module.exports = { verificationController, repeatVerificationController };
