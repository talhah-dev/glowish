import User from "../../../../models/User";
import mongoDB from "../../../../lib/mongoDB";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await mongoDB();

        // Parse the incoming request body
        const { email, password } = await req.json();

        // Validate request data
        if (!email || !password) {
            return NextResponse.json(
                {
                    error: "Invalid request",
                    message: "Both email and password are required"
                },
                { status: 400 }
            );
        }

        // Check if the user exists
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return NextResponse.json(
                {
                    error: "Authentication error",
                    message: "Email not found. Please check your email and try again."
                },
                { status: 404 } // 404 Not Found is more appropriate than 400 for non-existing resources
            );
        }

        // Compare provided password with stored hash
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return NextResponse.json(
                {
                    error: "Authentication error",
                    message: "Invalid password. Please try again."
                },
                { status: 401 } // Unauthorized - Invalid credentials
            );
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: existingUser._id,
                email: existingUser.email,
                role: existingUser.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1y" } // Expiration time
        );

        // Prepare response and set the cookie
        const response = NextResponse.json({
            message: `Welcome back, ${existingUser.name}`,
            user: {
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role, // Example: sending user role
            },
        });

        // Set the token as an HTTP-only cookie for security
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only set Secure flag in production
            maxAge: 90 * 24 * 60 * 60, // 90 days in seconds
            path: "/",
        });

        return response;

    } catch (err) {
        console.error("Login error:", err);

        // Catch any unforeseen server errors
        return NextResponse.json(
            {
                error: "Server error",
                message: "An unexpected error occurred. Please try again later."
            },
            { status: 500 }
        );
    }
}
