import clientPromise from "@/database/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { title, description, userId, isKnown } = await req.json();

  if (!userId) {
    return NextResponse.json({ message: "User is Required" }, { status: 400 });
  }

  if (!title || !description) {
    return NextResponse.json(
      { message: "Title and Description is Required" },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const card = db.collection("cards");

    const newCard = {
      title,
      description,
      userId,
      isKnown,
      createdAt: new Date(),
    };

    await card.insertOne(newCard);

    return NextResponse.json(
      { message: "New Card Created Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("New Card Creation error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
