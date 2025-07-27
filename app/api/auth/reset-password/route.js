import User from "../../../../models/User";
import mongoDB from "../../../../lib/mongoDB";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await mongoDB();

        const { token, password } = await req.json();

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
        }

        // Find user by their decoded email or userId
        const user = await User.findById(decoded.userId); // Assuming token contains userId
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 400 });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;

        // Save updated password
        await user.save();

        return NextResponse.json({ message: "Password reset successful" });
    } catch (err) {
        console.error("Reset password error:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
