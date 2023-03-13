const express = require("express");

const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  regController,
  loginController,
  logoutController,
  currentUserController,
  updateSubscrController,
} = require("../../controllers/authController");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { patchSubscrValidation } = require("../../middlewares/validation");
const {
  verificationController,
  repeatVerificationController,
} = require("../../controllers/verificationController");

const router = express.Router();

router
  .post("/register", asyncWrapper(regController))

  .post("/login", asyncWrapper(loginController))

  .post("/logout", authMiddleware, asyncWrapper(logoutController))

  .post("/current", authMiddleware, asyncWrapper(currentUserController))

  .patch(
    "/",
    patchSubscrValidation,
    authMiddleware,
    asyncWrapper(updateSubscrController)
  )
  .get("/verify/:verificationToken", asyncWrapper(verificationController))

  .post("/verify", asyncWrapper(repeatVerificationController));

module.exports = { authRouter: router };
