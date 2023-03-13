const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helpers/errors");
const { User } = require("../db/userModel");

const authMiddleware = async (req, res, next) => {
  const [tokenType, token] = req.headers["authorization"].split(" ");

  if (!token) {
    next(new NotAuthorizedError("Please provide a correct token"));
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const userExists = await User.findById(user._id);

    if (!userExists || !(token === userExists.token)) {
      next(new NotAuthorizedError("Please provide a correct token"));
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    next(new NotAuthorizedError("Invalid token"));
  }
};

module.exports = {
  authMiddleware,
};
