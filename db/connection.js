const MongoClient = require("mongodb").MongoClient;
const collections = {};

const getCollections = () => {
  return collections;
};

const connectMongo = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://andrewlischuk59:6zfHvkF2D6fX7nED@cluster0.9zkqc1x.mongodb.net/db-contacts?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );

  const db = client.db();
  collections.Contacts = db.collection("contacts");
  // console.log("Database connection successful");
};

module.exports = {
  connectMongo,
  getCollections,
};
