require ("dotenv").config();
const mongoose = require("mongoose");
const mongoURI ="mongodb+srv://hayaranshorya:hayaranshorya@cluster0.sotiku4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("connected successfully");
  } catch (err) {
    console.log(err);
  }
};
mongoose.set("strictQuery", true);

module.exports = connectToMongo;
