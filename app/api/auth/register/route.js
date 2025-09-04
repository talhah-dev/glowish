import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../../../models/User";
import mongoDB from "../../../../lib/mongoDB";
import EmailCode from "../../config/EmailCode";

// Helper: Generate 6-digit code
const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

export async function POST(req) {
    try {
        await mongoDB();
        const { name, email, number, password } = await req.json();

        if (!name || !email || !password || !number)
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return NextResponse.json({ message: "Email already registered" }, { status: 400 });

        const existingNumber = await User.findOne({ number });
        if (existingNumber)
            return NextResponse.json({ message: "Phone number already registered" }, { status: 400 });

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = generateCode();

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            number,
            verificationCode,
            otpExpire: Date.now() + 5 * 60 * 1000,
        });

        await newUser.save();

        // Send email
        await EmailCode(email, verificationCode);

        // Now set cookie in response
        const response = NextResponse.json(
            { message: "Verification code sent to email." },
            { status: 201 }
        );

        return response;
    }
    catch (error) {
        console.error("Error in registration:", error);
        return NextResponse.json({ message: "Server error, please try again later" }, { status: 500 });
    }
}