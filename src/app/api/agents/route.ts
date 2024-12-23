import { NextRequest, NextResponse } from "next/server";
import { AgentModel, IAgent } from "@/model/AgentModel";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  const { name, description, instructions } = await request.json();

  const agent = await AgentModel.create({
    name,
    description,
    instructions,
  });

  return agent;
}
