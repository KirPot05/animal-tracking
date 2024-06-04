import { connect } from "mongoose";
import { DB_URL } from "../config";

export async function connectDB() {
  // Connect the client to the server	(optional starting in v4.7)
  await connect(DB_URL, { dbName: "animal_tracker" });
  // Send a ping to confirm a successful connection
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
