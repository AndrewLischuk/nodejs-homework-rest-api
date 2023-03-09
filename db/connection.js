const mongoose = require("mongoose");

const connectMongo = async () => {
  mongoose.connect(process.env.MONGODB_URL);
};

module.exports = {
  connectMongo,
};
