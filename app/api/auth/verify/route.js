import User from "../../../../models/User";
import mongoDB from "../../../../lib/mongoDB";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await mongoDB();
        const { code } = await req.json();

        if (!code) {
            return NextResponse.json({ message: "Verification code is required" }, { status: 400 });
        }

        const token = req.cookies.get("verify_token")?.value;
        if (!token) {
            return NextResponse.json({ message: "Missing token" }, { status: 400 });
        }

        if (!process.env.JWT_SECRET) {
            return NextResponse.json({ message: "Server configuration error" }, { status: 500 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.otp !== code) {
            return NextResponse.json({ message: "Invalid code" }, { status: 400 });
        }

        const { name, email, password, number } = decoded;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "Email already exists" }, { status: 400 });
        }

        const existingNumber = await User.findOne({ number });
        if (existingNumber) {
            return NextResponse.json({ message: "Phone number already exists" }, { status: 400 });
        }

        const newUser = new User({
            name,
            email,
            password,
            number,
            isVerified: true,
            verificationCode: code, // Optional: store the code if needed
        });
        await newUser.save();

        const response = NextResponse.json({ message: "Account verified" }, { status: 201 });
        response.cookies.set("verify_token", "", { maxAge: 0, path: "/" });
        return response;
    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
        }
        console.error("Verification error:", error);
        return NextResponse.json({ message: "Server error during verification" }, { status: 500 });
    }
}