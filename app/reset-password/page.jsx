import React, { useState } from "react";
import axios from "axios";
import MyInput from "../components/MyInput";
import { useRouter } from "next/navigation";

const ResetPasswordPage = () => {
    const [step, setStep] = useState(1); // Manage steps: 1 = email, 2 = OTP, 3 = new password
    const [email, setEmail] = useState(""); // Store email
    const [otp, setOtp] = useState(""); // Store OTP
    const [newPassword, setNewPassword] = useState(""); // Store new password
    const [error, setError] = useState(""); // Error state
    const [loading, setLoading] = useState(false); // Loading state
    const [successMessage, setSuccessMessage] = useState(""); // Success message after password change
    const [otpSent, setOtpSent] = useState(false); // Flag to track if OTP was sent
    const [token, setToken] = useState(""); // Store reset token for OTP verification
    const router = useRouter();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("/api/auth/forgot-password", { email });
            setSuccessMessage(response.data.message);
            setOtpSent(true);
            setStep(2); // Move to OTP step
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong, please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("/api/auth/verify-otp", { email, otp });
            setToken(response.data.token); // Save the valid token for the next step
            setStep(3); // Move to new password step
        } catch (err) {
            setError(err.response?.data?.message || "Invalid OTP, please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleNewPasswordSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("/api/auth/reset-password", { token, newPassword });
            setSuccessMessage(response.data.message);
            router.push("/login"); // Redirect to login page after successful password reset
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong, please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="bg-[#F2F2F2] h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/assets/images/login-bg.png)" }}>
            <div className="h-screen overflow-auto grid justify-center items-center sm:p-5 p-3">
                <div className="bg-white max-w-[570px] w-full mx-auto rounded-2xl 2sm:px-[50px] 2sm:py-[45px] p-[30px] relative border border-gray-400 z-10 lg:mt-0 mt-[30px]">
                    <div>
                        {step === 1 && (
                            <div>
                                <h2 className="font-matter text-gray-900 font-bold sm:text-3xl 2sm:text-2xl text-[22px] mb-2">
                                    Forgot Password
                                </h2>
                                <p className="font-matter 2sm:text-base text-sm text-gray-800 mb-4">
                                    Enter your email to receive a reset link.
                                </p>
                                <form onSubmit={handleEmailSubmit}>
                                    <div className="sm:mb-5 mb-4">
                                        <MyInput
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            validations={{
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: "Enter a valid email",
                                                },
                                            }}
                                            errors={error}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <button
                                            type="submit"
                                            className="w-full flex text-center justify-center text-white rounded-full 2sm:p-[12px] p-[10px] font-matter text-base bg-gray-900 border transition border-gray-900 hover:bg-white hover:border-gray-900 hover:text-gray-900"
                                            disabled={loading}
                                        >
                                            {loading ? "Sending..." : "Send Reset Link"}
                                        </button>
                                    </div>
                                </form>
                                {error && <p className="text-red-600 font-medium mb-3">{error}</p>}
                                {successMessage && <p className="text-green-600 font-medium mb-3">{successMessage}</p>}
                            </div>
                        )}

                        {step === 2 && otpSent && (
                            <div>
                                <h2 className="font-matter text-gray-900 font-bold sm:text-3xl 2sm:text-2xl text-[22px] mb-2">
                                    Enter OTP
                                </h2>
                                <p className="font-matter 2sm:text-base text-sm text-gray-800 mb-4">
                                    A 6-digit OTP was sent to your email. Please enter it below.
                                </p>
                                <form onSubmit={handleOtpSubmit}>
                                    <div className="sm:mb-5 mb-4">
                                        <MyInput
                                            label="OTP"
                                            name="otp"
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            maxLength={6}
                                            validations={{
                                                required: "OTP is required",
                                                pattern: {
                                                    value: /^[0-9]{6}$/,
                                                    message: "Enter a valid 6-digit OTP",
                                                },
                                            }}
                                            errors={error}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <button
                                            type="submit"
                                            className="w-full flex text-center justify-center text-white rounded-full 2sm:p-[12px] p-[10px] font-matter text-base bg-gray-900 border transition border-gray-900 hover:bg-white hover:border-gray-900 hover:text-gray-900"
                                            disabled={loading}
                                        >
                                            {loading ? "Verifying..." : "Verify OTP"}
                                        </button>
                                    </div>
                                </form>
                                {error && <p className="text-red-600 font-medium mb-3">{error}</p>}
                            </div>
                        )}

                        {step === 3 && (
                            <div>
                                <h2 className="font-matter text-gray-900 font-bold sm:text-3xl 2sm:text-2xl text-[22px] mb-2">
                                    Reset Password
                                </h2>
                                <p className="font-matter 2sm:text-base text-sm text-gray-800 mb-4">
                                    Enter a new password.
                                </p>
                                <form onSubmit={handleNewPasswordSubmit}>
                                    <div className="sm:mb-5 mb-4">
                                        <MyInput
                                            label="New Password"
                                            name="newPassword"
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            validations={{
                                                required: "Password is required",
                                                minLength: {
                                                    value: 8,
                                                    message: "Password must be at least 8 characters",
                                                },
                                            }}
                                            errors={error}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <button
                                            type="submit"
                                            className="w-full flex text-center justify-center text-white rounded-full 2sm:p-[12px] p-[10px] font-matter text-base bg-gray-900 border transition border-gray-900 hover:bg-white hover:border-gray-900 hover:text-gray-900"
                                            disabled={loading}
                                        >
                                            {loading ? "Saving..." : "Reset Password"}
                                        </button>
                                    </div>
                                </form>
                                {error && <p className="text-red-600 font-medium mb-3">{error}</p>}
                                {successMessage && <p className="text-green-600 font-medium mb-3">{successMessage}</p>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ResetPasswordPage;