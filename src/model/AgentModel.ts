import { csaDb } from "@/lib/mongodb";
import mongoose from "mongoose";

export interface IAgent {
  name: string;
  description?: string;
  instructions: string;
}

const agentSchema = new mongoose.Schema<IAgent>(
  {
    name: { type: String, required: true },
    description: { type: String },
    instructions: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "Agents",
  }
);

export const AgentModel = csaDb.model<IAgent>("Agent", agentSchema);
