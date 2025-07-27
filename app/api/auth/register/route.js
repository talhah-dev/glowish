import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import User from "../../../../models/User";
import mongoDB from "../../../../lib/mongoDB";

// Helper: Generate 6-digit code
const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// Helper: Send email
const sendVerificationEmail = async (email, code) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `"Verify Your Email" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Email Verification Code",
        html: `<p>Your verification code is: <strong>${code}</strong></p>`,
    });
};

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

        const token = jwt.sign(
            { name, email, number, password: hashedPassword, otp: verificationCode },
            process.env.JWT_SECRET,
            { expiresIn: "5m" }
        );

        // Send email
        await sendVerificationEmail(email, verificationCode);

        // Now set cookie in response
        const response = NextResponse.json(
            { message: "Verification code sent to email." },
            { status: 201 }
        );

        response.cookies.set("verify_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 5 * 60,
            path: "/",
        });

        return response;
    }
    catch (error) {
        console.error("Error in registration:", error);
        return NextResponse.json({ message: "Server error, please try again later" }, { status: 500 });
    }
}