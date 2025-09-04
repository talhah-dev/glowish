import User from "../../../../models/User";
import mongoDB from "../../../../lib/mongoDB";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await mongoDB();
    const { otp, email, newPassword } = await req.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json({ message: "Email, OTP and newPassword are required" }, { status: 400 });
    }
    if (newPassword.length < 8) {
      return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.verificationCode !== otp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 404 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedPassword;
    user.verificationCode = null;
    user.otpExpire = null;

    await user.save();

    return NextResponse.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Error resetting password:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
