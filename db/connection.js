const mongoose = require("mongoose");

const connectMongo = async () => {
  mongoose.connect(process.env.MONGODB_URL).catch((err) => {
    console.log(`Connection failed with error "${err.message}"`);
    process.exit(1);
  });
};

module.exports = {
  connectMongo,
};
