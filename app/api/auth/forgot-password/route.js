import User from "../../../../models/User";
import mongoDB from "../../../../lib/mongoDB";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer"; // For sending emails
import crypto from "crypto"; // To generate a random OTP

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

        // Generate a 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString(); // Generate random OTP

        // Set OTP expiration time (e.g., 10 minutes)
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);

        // Save the OTP and its expiration to the user's record
        user.resetOtp = otp;
        user.resetOtpExpiry = otpExpiry;
        await user.save();

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
            subject: "Password Reset OTP",
            html: `<p>You requested a password reset. Here is your OTP: <strong>${otp}</strong></p>
            <p>It will expire in 10 minutes.</p>`,
        };

        // Send the OTP via email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "OTP sent to your email" });
    } catch (err) {
        console.error("Error sending password reset OTP:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
