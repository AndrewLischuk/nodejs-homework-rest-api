const app = require("./app");
const { connectMongo } = require("./db/connection");

const start = async () => {
  await connectMongo();

  app.listen(3000, (err) => {
    if (err) {
      console.error("Error at server launch: ", err);
      process.exit(1);
    }
    console.log(
      "Database connection successful. Server running. Use our API on port: 3000"
    );
  });
};

start();
