import { users } from "@/models/server/config";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    const { newPassword } = await request.json();

    if (!newPassword) {
      return NextResponse.json(
        {
          message: "New password are required",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const currentUser = await users.get(userId);

    if (!currentUser) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    await users.updatePassword(userId, newPassword);
    return NextResponse.json(
      {
        message: "Password updated successfully",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "Error updating password",
        success: false,
      },
      {
        status: error?.status || error?.code || 500,
      }
    );
  }
}
