import { csaDb } from "@/lib/mongodb";
import mongoose from "mongoose";

export enum AgentCallPartRole {
  User = "user",
  Assistant = "assistant",
}

export interface IAgentCallPart {
  agentCallId: string | mongoose.Types.ObjectId;
  role: AgentCallPartRole;
  content: string;
}

const agentCallPartSchema = new mongoose.Schema<IAgentCallPart>(
  {
    agentCallId: { type: mongoose.Schema.Types.ObjectId, required: true },
    role: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true, collection: "AgentCallParts" }
);

export const AgentCallPartModel = csaDb.model<IAgentCallPart>(
  "AgentCallPart",
  agentCallPartSchema
);
