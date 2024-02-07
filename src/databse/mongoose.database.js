const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    // Removido o callback e usando apenas async/await
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@taskmanagercluster.9r0mabl.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("Connected to MongoDB!");
  } catch (error) {
    // Tratando erros de conexão
    console.error("Error connecting to MongoDB:", error.message);

  }
};

module.exports = connectToDatabase;
