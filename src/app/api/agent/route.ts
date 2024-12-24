import { NextRequest, NextResponse } from "next/server";
import { AgentModel } from "@/model/AgentModel";
import { connect } from "@/lib/db/mongodb";
import { validateJoiSchema } from "@/lib/validateJoiSchema";
import Joi from "joi";
import { ApiHelper } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    const { name, description, instructions } = await request.json();

    await connect();

    validateJoiSchema({
      schema: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().allow(""),
        instructions: Joi.string().required(),
      }),
      data: { name, description, instructions },
    });

    await AgentModel.create({
      name,
      description,
      instructions,
    });

    return NextResponse.json(
      {
        message: "Agent created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return ApiHelper.handleError(error);
  }
}

export async function GET(request: NextRequest) {
  try {
    await connect();

    const data = await AgentModel.find();

    return NextResponse.json({
      data,
    });
  } catch (error) {
    return ApiHelper.handleError(error);
  }
}
