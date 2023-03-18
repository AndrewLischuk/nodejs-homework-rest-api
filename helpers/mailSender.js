const nodemailer = require("nodemailer");

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "andrewlischuk@meta.ua",
    pass: process.env.META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async (data) => {
  const emailOptions = { ...data, from: "andrewlischuk@meta.ua" };
  await transporter.sendMail(emailOptions);
  return true;
};

module.exports = { sendEmail };
