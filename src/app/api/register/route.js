import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import User from "@/app/models/User";
// import dbConnect from "@/lib/mongodb"

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashed,
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return NextResponse.json(
      { error: "Server failed while creating account" },
      { status: 500 }
    );
  }
}
