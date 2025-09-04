import nodemailer from "nodemailer";

const EmailCode = async (email, code) => {
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

export default EmailCode;