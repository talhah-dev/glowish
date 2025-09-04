import User from "../../../../models/User";
import mongoDB from "../../../../lib/mongoDB";
import { NextResponse } from "next/server";
import EmailCode from "../../config/EmailCode";

export async function POST(req) {
    try {
        await mongoDB();

        const { email } = await req.json();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await EmailCode(email, otp);

        user.verificationCode = otp;
        user.otpExpire = Date.now() + 5 * 60 * 1000;

        await user.save();

        return NextResponse.json({ message: "OTP sent to your email" });
    } catch (err) {
        console.error("Error sending password reset OTP:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
