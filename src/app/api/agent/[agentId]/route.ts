import { NextRequest, NextResponse } from "next/server";
import { AgentModel } from "@/model/AgentModel";
import { connect } from "@/lib/db/mongodb";
import { validateJoiSchema } from "@/lib/validateJoiSchema";
import Joi from "joi";
import { ApiHelper } from "@/lib/api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  try {
    const { agentId } = await params;

    await connect();

    validateJoiSchema({
      schema: Joi.object({
        agentId: Joi.string().hex().length(24).required(),
      }),
      data: { agentId },
    });

    const agent = await AgentModel.findOne({ _id: agentId });

    if (!agent) {
      return NextResponse.json({ message: "Agent not found" }, { status: 404 });
    }

    return NextResponse.json({ agent });
  } catch (error) {
    return ApiHelper.handleError(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  try {
    console.log({
      params,
    });

    const { agentId } = await params;

    const { name, description, instructions } = await request.json();

    await connect();

    validateJoiSchema({
      schema: Joi.object({
        agentId: Joi.string().hex().length(24).required(),
        name: Joi.string().required(),
        description: Joi.string().allow(""),
        instructions: Joi.string().required(),
      }),
      data: { name, description, instructions, agentId },
    });

    const updatedAgent = await AgentModel.findOneAndUpdate(
      { _id: agentId },
      { name, description, instructions },
      { new: true }
    );

    if (!updatedAgent) {
      return NextResponse.json({ message: "Agent not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Agent updated successfully" });
  } catch (error) {
    return ApiHelper.handleError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  try {
    const { agentId } = await params;

    await connect();

    validateJoiSchema({
      schema: Joi.object({
        agentId: Joi.string().hex().length(24).required(),
      }),
      data: { agentId },
    });

    const deletedAgent = await AgentModel.findOneAndUpdate(
      { _id: agentId },
      { isDeleted: true },
      { new: true }
    );

    if (!deletedAgent) {
      return NextResponse.json({ message: "Agent not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Agent deleted successfully" });
  } catch (error) {
    return ApiHelper.handleError(error);
  }
}
