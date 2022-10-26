const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.

const mongoUrl =
  process.env.NODE_ENV === "development"
    ? process.env.MONGO_URI
    : process.env.MONGO_REMOTE_URL;
// console.log({ mongoUrl });
const dbConnect = async () => {
  mongoose.connect(
    mongoUrl,
    {
      useNewUrlParser: true,
    },
    (err) => {
      if (!err) {
        console.log("MongoDB Connection Succeeded.");
      } else {
        console.log("Error in DB connection: " + err);
      }
    }
  );
};

export default dbConnect;
