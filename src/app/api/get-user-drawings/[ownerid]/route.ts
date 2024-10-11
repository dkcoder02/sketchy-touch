import { dbId, drawingsCollectionId } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";

export async function GET(
  request: Request,
  { params }: { params: { ownerid: string } }
) {
  try {
    const ownerId = params.ownerid;

    const IsUserExist = await users.get(ownerId);

    if (!IsUserExist) {
      return NextResponse.json(
        {
          message: "User does not exist",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    const userDrawings = await databases.listDocuments(
      dbId,
      drawingsCollectionId,
      [
        Query.select(["$id", "owner", "drawings"]),
        Query.equal("owner", ownerId),
      ]
    );

    const drawings = userDrawings.documents;

    if (drawings.length < 1) {
      return NextResponse.json({
        message: "User drawings does not exist",
        data: [],
        status: false,
      });
    }

    return NextResponse.json({
      message: "User drawings fetched successfully",
      data: drawings[0],
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "Error fetching drawing",
      },
      {
        status: error?.status || error?.code || 500,
      }
    );
  }
}
