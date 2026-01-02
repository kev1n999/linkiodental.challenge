import mongoose from "mongoose";

export async function connect(mongoUri: string) {
  try {
    await mongoose.connect(mongoUri, { dbName: "TEST" });
    console.log("You are connected on mongodb!");
  } catch (err) {
    console.error(`An error occurred while connecting to mongodb\n\n${err}`);
  }
}
