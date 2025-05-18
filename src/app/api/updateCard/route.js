import clientPromise from "@/database/mongoose";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const { id, isKnown } = await req.json();
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const cards = db.collection("cards");

    const updateCard = await cards.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { isKnown } }
    );

    return NextResponse.json({
      updateCard,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
