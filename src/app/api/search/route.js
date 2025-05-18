import clientPromise from "@/database/mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const searchquery = searchParams.get("searchquery") || "";
    const limit = parseInt(searchParams.get("limit"), 10) || 10; // Configurable limit

    const userId = searchParams.get("userid");

    if (!searchquery.trim()) {
      return NextResponse.json(
        { error: "Search query cannot be empty" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const cards = db.collection("cards");

    const results = await cards
      .find({ userId: userId, title: { $regex: searchquery, $options: "i" } })
      .limit(limit)
      .toArray();

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Error during search:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
