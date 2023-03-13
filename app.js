const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { contactsRouter } = require("./routes/api/contactsRouter");
const { authRouter } = require("./routes/api/authRouter");
const { errorHandler } = require("./helpers/apiHelpers");
const { filesRouter } = require("./routes/api/filesRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.static(path.resolve("./public")));

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/auth/users", authRouter);
app.use("/api/auth/users", filesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);

module.exports = app;
