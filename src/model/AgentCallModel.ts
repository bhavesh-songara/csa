import { csaDb } from "@/lib/mongodb";
import mongoose from "mongoose";

export interface IAgentCall {
  agentId: string | mongoose.Types.ObjectId;
  summary?: string;
}

const agentCallSchema = new mongoose.Schema<IAgentCall>(
  {
    agentId: { type: mongoose.Schema.Types.ObjectId, required: true },
    summary: { type: String },
  },
  {
    timestamps: true,
    collection: "AgentCalls",
  }
);

export const AgentCallModel = csaDb.model<IAgentCall>(
  "AgentCall",
  agentCallSchema
);
