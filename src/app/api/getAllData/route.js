import { verifyToken } from "@/app/utils/jwt";
import clientPromise from "@/database/mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "Unauthorized: No Authorization header" },
        { status: 401 }
      );
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: Token missing" },
        { status: 401 }
      );
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid or expired token" },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const database = client.db(process.env.DB_NAME);
    const collection = database.collection("cards");

    const userId = decoded.userId;

    const allData = await collection.find({ userId: userId }).toArray();

    return NextResponse.json(allData, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      message: "Internal Server Error",
      status: 500,
    });
  }
}
