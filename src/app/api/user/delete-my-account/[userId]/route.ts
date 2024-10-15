import { dbId, drawingsCollectionId } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { NextResponse } from "next/server";
import { Query } from "node-appwrite";

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    const IsUserExist = await users.get(userId);

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
        Query.equal("owner", userId),
      ]
    );

    if(isExistUserDrawing.total !== 0){
      const documentId = isExistUserDrawing.documents[0].$id;
      await databases.deleteDocument(
        dbId,
        drawingsCollectionId,
        documentId
      );
    }

    await users.delete(IsUserExist.$id);

    return NextResponse.json(
      {
        message: "Your account deleted successfully",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "Error deleting user account",
        success: false,
      },
      {
        status: error?.status || error?.code || 500,
      }
    );
  }
}
