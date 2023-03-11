const app = require("./app");
const { connectMongo } = require("./db/connection");

const start = async () => {
  await connectMongo();

  app.listen(process.env.PORT, (err) => {
    if (err) {
      console.error("Error at server launch: ", err);
      process.exit(1);
    }
    console.log(
      `Database connection successful. Server running. Use our API on port: ${process.env.PORT}`
    );
  });
};

start();
