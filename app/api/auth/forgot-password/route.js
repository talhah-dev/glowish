import User from "../../../../models/User";
import mongoDB from "../../../../lib/mongoDB";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer"; // For sending emails

export async function POST(req) {
    try {
        await mongoDB();

        // Get email from request body
        const { email } = await req.json();

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Generate a password reset token
        const resetToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" } // Token will expire in 1 hour
        );

        // Save the reset token in the user's record (optional, for security reasons)
        user.resetToken = resetToken;
        await user.save();

        // Create a reset password URL
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

        // Set up the email transporter (using Gmail as an example)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // Your email password
            },
        });

        // Set up the email data
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            html: `<p>You requested a password reset. Click the link below to reset your password:</p>
             <a href="${resetUrl}">Reset Password</a>`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Password reset link sent to your email" });
    } catch (err) {
        console.error("Error sending password reset email:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}