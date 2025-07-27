import User from "../../../../models/User";
import mongoDB from "../../../../lib/mongoDB";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await mongoDB();
    const { token, newPassword } = await req.json();

    // Verify the reset token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Error resetting password:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
