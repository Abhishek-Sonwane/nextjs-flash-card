import { verifyToken } from "@/app/utils/jwt";
import clientPromise from "@/database/mongoose";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return NextResponse.json(
      { error: "Authorization header missing" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  const tokenData = verifyToken(token);

  if (!tokenData) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 403 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const users = db.collection("users");

    const user = await users.findOne({ _id: new ObjectId(tokenData.userId) });

    if (!user) {
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }

    delete user.password;

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
