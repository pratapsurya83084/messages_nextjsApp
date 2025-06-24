import { log } from "console";
import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to MongoDB database");
    return;
  }

  try {
    const db = await mongoose.connect(
      process.env.MONGODB_CONNECTION_URL || "",
      {}
    );

    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to MongoDB database", db);
  } catch (error) {
    console.log("Connected to  database failed : ", error);
    process.exit(1);
  }
}
// dbConnect();

export default dbConnect;
