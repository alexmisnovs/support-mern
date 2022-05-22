const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const cnn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${cnn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Mongoose Connection Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};
module.exports = { connectDB };
