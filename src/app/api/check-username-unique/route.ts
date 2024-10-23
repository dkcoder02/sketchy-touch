import { userNameValidation } from "@/schemas/signUpSchema";
import { z } from "zod";
import { users } from "@/models/server/config";
import { Query } from "node-appwrite";

const UsernameQuerySchema = z.object({
  username: userNameValidation,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get("username"),
    };

    // validation with zod
    const result = UsernameQuerySchema.safeParse(queryParams);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          message:
            usernameErrors.length > 0
              ? usernameErrors.join(",")
              : "Invalid query parameters",
          success: false,
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await users.list([
      Query.contains("name", username),
      Query.equal("status", true),
    ]);

    if (existingVerifiedUser.total) {
      return Response.json(
        {
          message: "Username is already taken",
          success: false,
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        message: "Username is available",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        message: "Error checking username",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
