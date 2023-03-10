const express = require("express");

const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  regController,
  loginController,
} = require("../../controllers/authController");

const router = express.Router();

router
  .post("/users/register", asyncWrapper(regController))

  .post("/users/login", asyncWrapper(loginController));

module.exports = { authRouter: router };
