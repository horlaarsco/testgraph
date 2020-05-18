const { Mongoose } = require("mongoose");

let connection = null;

const connectToDB = async () => {
  const mongoose = new Mongoose();
  mongoose.Promise = global.Promise;

  const MONGO_CONNECTION_STRING =
    "mongodb+srv://horlaarsco:bukola99@cluster0-eirda.mongodb.net/ecom?retryWrites=true&w=majority";

  await mongoose.connect(MONGO_CONNECTION_STRING);
  connection = mongoose;
};

const getDB = () => {
  if (!connection) {
    throw new Error("Call connectToDB first");
  }
  return connection;
};

module.exports = {
  connectToDB,
  getDB,
};
