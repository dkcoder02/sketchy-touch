import { users } from "@/models/server/config";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    const { username, email } = await request.json();

    if (!(username || email)) {
      return NextResponse.json(
        {
          message: "Username or email are required",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const isUserExist = await users.get(userId);

    const isUsernameMatch = isUserExist?.name === username;

    if (username && !isUsernameMatch) {
      const isUpdateUsername = await users.updateName(userId, username);
      if (!isUpdateUsername) {
        return NextResponse.json(
          {
            message: "Username update failed",
            success: false,
          },
          {
            status: 500,
          }
        );
      }
    }

    const isEmailMatch = isUserExist?.email === email;

    if (email && !isEmailMatch) {
      const isUpdateEmail = await users.updateEmail(userId, email);
      if (!isUpdateEmail) {
        return NextResponse.json(
          {
            message: "Email update failed",
            success: false,
          },
          {
            status: 500,
          }
        );
      }
    }

    return NextResponse.json(
      {
        message: "Your profile updated successfully",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "Error updating profile",
      },
      {
        status: error?.status || error?.code || 500,
      }
    );
  }
}
