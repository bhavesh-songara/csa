import { csaDb } from "@/lib/db/csa-db";
import mongoose from "mongoose";

export interface IAgent {
  name: string;
  description?: string;
  instructions: string;
  isDeleted?: boolean;
}

const agentSchema = new mongoose.Schema<IAgent>(
  {
    name: { type: String, required: true },
    description: { type: String },
    instructions: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: "Agents",
  }
);

export const AgentModel = csaDb.model<IAgent>("Agent", agentSchema);
