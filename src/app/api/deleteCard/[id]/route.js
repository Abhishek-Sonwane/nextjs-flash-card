import clientPromise from "@/database/mongoose";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { id } = await params;

  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const cards = db.collection("cards");

    const deletedCard = await cards.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({
      deletedCard,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
