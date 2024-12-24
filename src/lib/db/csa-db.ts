import mongoose from "mongoose";

export const csaDb = mongoose.connection.useDb("csa");
