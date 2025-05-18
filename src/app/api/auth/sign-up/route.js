import clientPromise from "@/database/mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/app/utils/jwt";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        {
          error: "Email and Password is Required.",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const users = db.collection("users");

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User Already Exist" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      password: hashedPassword,
      name,
      createdAt: new Date(),
    };

    const response = await users.insertOne(newUser);

    const token = signToken({
      userId: response.insertedId,
      email: newUser.email,
    });

    return NextResponse.json(
      { message: "User Created Successfully", token: token },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
