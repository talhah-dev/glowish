import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "../../../../models/User";
import mongoDB from "../../../../lib/mongoDB";

export async function GET() {
    try {
        await mongoDB();

        const token = cookies().get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "No token found" }, { status: 401 });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: `Welcome back, ${user.name}`,
            user,
        });
    } catch (err) {
        return NextResponse.json(
            { error: "Server error", message: "Something went wrong" },
            { status: 500 }
        );
    }
}
