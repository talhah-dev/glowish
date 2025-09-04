import { NextResponse } from "next/server";
import User from "../../../../models/User";
import mongoDB from "../../../../lib/mongoDB";

export async function POST(req) {
  try {
    await mongoDB();

    const { code, email } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { message: "Email and code are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!user.verificationCode) {
      return NextResponse.json({ message: "No OTP requested" }, { status: 400 });
    }

    if (user.otpExpire && new Date(user.otpExpire).getTime() < Date.now()) {
      return NextResponse.json({ message: "OTP expired" }, { status: 400 });
    }

    const incoming = String(code).trim();
    const stored = String(user.verificationCode).trim();

    if (incoming !== stored) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    user.isVerified = true;
    user.verificationCode = undefined; // or null
    user.otpExpire = undefined;        // or null
    await user.save();

    return NextResponse.json({ message: "Account verified" }, { status: 200 });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { message: "Server error during verification" },
      { status: 500 }
    );
  }
}