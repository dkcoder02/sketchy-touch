import { drawingsCollectionId, dbId } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";

export async function PATCH(request: Request) {
  try {
    const { ownerId, drawings } = await request.json();

    if (!drawings) {
      throw new Error("Drawings are required");
    }

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

    const isExistUserDrawing = await databases.listDocuments(
      dbId,
      drawingsCollectionId,
      [
        Query.select(["$id", "owner", "drawings"]),
        Query.equal("owner", ownerId),
      ]
    );

    if (isExistUserDrawing.total < 1) {
      await databases.createDocument(dbId, drawingsCollectionId, ID.unique(), {
        owner: ownerId,
        drawings: JSON.stringify(drawings),
      });

      return NextResponse.json({
        message: "Drawing created successfully",
        success: true,
        status: 201,
      });
    }

    const documentId = isExistUserDrawing.documents[0].$id;

    await databases.updateDocument(dbId, drawingsCollectionId, documentId, {
      drawings: JSON.stringify(drawings),
    });

    return NextResponse.json({
      message: "Drawing updated successfully",
      success: true,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "Error while updating drawing",
      },
      {
        status: error?.status || error?.code || 500,
      }
    );
  }
}
