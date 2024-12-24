"use server";

import mongoose from "mongoose";

export async function connect() {
  const username = process.env.MONGODB_USERNAME;
  const password = process.env.MONGODB_PASSWORD;
  const host = process.env.MONGODB_HOST;

  if (!host) {
    throw new Error("MongoDB host not provided");
  }

  if (!username || !password) {
    throw new Error("Username and password not provided");
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  const mongoUrl = `mongodb+srv://${username}:${password}@${host}`;

  console.log(`Connecting to MongoDB: ${host}`);

  await mongoose.connect(mongoUrl, {
    readPreference: "primary",
    connectTimeoutMS: 30000,
    socketTimeoutMS: 20000,
  });

  console.log(`Connected to MongoDB: ${host}`);
}
