import User from "../../../../models/User";
import mongoDB from "../../../../lib/mongoDB";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await mongoDB();

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                {
                    error: "Invalid request",
                    message: "Both email and password are required"
                },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                {
                    error: "Authentication error",
                    message: "Email not found. Please check your email and try again."
                },
                { status: 404 }
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json(
                {
                    error: "Authentication error",
                    message: "Invalid password. Please try again."
                },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1y" }
        );

        const response = NextResponse.json({
            message: `Welcome back, ${user.name}`,
            user
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 360 * 24 * 60 * 60,
            path: "/",
        });

        return response;

    } catch (err) {
        console.error("Login error:", err);

        return NextResponse.json(
            {
                error: "Server error",
                message: "An unexpected error occurred. Please try again later."
            },
            { status: 500 }
        );
    }
}
