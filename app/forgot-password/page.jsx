"use client";
import React, { useState } from "react";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { Button } from "@nextui-org/react";
import { InputOtp } from "@heroui/react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    // steps
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState("");
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);

    // reset step
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [resetLoading, setResetLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("/api/auth/forgot-password", { email });
            toast.success("OTP sent to your email");
            setShowOtp(true);
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        if (otp.length !== 6) return;
        setVerifyLoading(true);
        try {
            const res = await axios.post("/api/auth/forgot-password-verify", { email, otp });
            if (res.status === 200) {
                toast.success(res.data.message || "OTP verified");
                setIsOtpVerified(true); // ➜ now show new password fields
            } else {
                toast.error(res.data.message || "Invalid OTP");
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "Verification failed");
        } finally {
            setVerifyLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!isOtpVerified) return;
        if (newPassword.length < 8) return toast.error("Password must be at least 8 characters");
        if (newPassword !== confirmPassword) return toast.error("Passwords do not match");

        setResetLoading(true);
        try {
            const res = await axios.post("/api/auth/reset-password", { email, otp, newPassword });
            if (res.status === 200) {
                toast.success(res.data.message || "Password reset successful");
                router.push("/login");
            } else {
                toast.error(res.data.message || "Reset failed");
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "Reset failed");
        } finally {
            setResetLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl border border-gray-300 p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password</h1>
                <p className="text-sm text-gray-700 mb-6">
                    {showOtp
                        ? isOtpVerified
                            ? "Enter a new password for your account."
                            : "Enter the 6-digit code sent to your email."
                        : "Enter your account email. We’ll send you instructions to reset your password."}
                </p>

                {/* Step 1: Email form */}
                {!showOtp && (
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full placeholder:text-zinc-400 rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !email}
                            aria-busy={loading}
                            className={`w-full flex items-center justify-center rounded-full p-3 text-base border transition
                ${loading
                                    ? "bg-gray-700 text-white border-gray-700 opacity-80 cursor-not-allowed"
                                    : "bg-gray-900 text-white border-gray-900 hover:bg-white hover:text-gray-900"
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <LoaderCircle className="animate-spin text-white" />
                                    <span>Sending…</span>
                                </span>
                            ) : (
                                "Send"
                            )}
                        </button>
                    </form>
                )}

                {/* Step 2: OTP */}
                {showOtp && !isOtpVerified && (
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <InputOtp
                                autoFocus
                                length={6}
                                value={otp}
                                onValueChange={(v) => setOtp((v || "").replace(/\D/g, ""))}
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                className="flex gap-3"
                                variant="bordered"
                                classNames={{
                                    base: "justify-center",
                                    segment:
                                        "rounded-xl border border-default-300 bg-white transition " +
                                        "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30 " +
                                        "data-[active=true]:border-primary data-[active=true]:ring-2 data-[active=true]:ring-primary/30",
                                    input: "text-2xl font-semibold text-center",
                                }}
                                aria-label="One-time password"
                            />
                        </div>

                        <Button
                            className="rounded-full"
                            onPress={verifyOtp}
                            isDisabled={otp.length !== 6 || verifyLoading}
                            isLoading={verifyLoading}
                        >
                            {verifyLoading ? "Verifying..." : "Verify OTP"}
                        </Button>

                        <button
                            type="button"
                            onClick={() => setShowOtp(false)}
                            className="text-sm text-gray-700 underline"
                        >
                            Change email
                        </button>
                    </div>
                )}

                {/* Step 3: New Password */}
                {showOtp && isOtpVerified && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                minLength={8}
                                required
                            />
                            <p className="text-xs text-gray-600 mt-1">At least 8 characters.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Re-enter new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                minLength={8}
                                required
                            />
                        </div>

                        <Button
                            className="rounded-full"
                            onPress={handleResetPassword}
                            isDisabled={
                                resetLoading ||
                                newPassword.length < 8 ||
                                confirmPassword.length < 8
                            }
                            isLoading={resetLoading}
                        >
                            {resetLoading ? "Resetting…" : "Reset Password"}
                        </Button>
                    </div>
                )}

                <div className="mt-6 text-sm text-gray-800">
                    <Link href="/login" className="underline hover:no-underline">
                        Back to Login
                    </Link>
                </div>
            </div>
        </main>
    );
}