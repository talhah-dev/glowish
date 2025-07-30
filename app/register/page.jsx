"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import MyInput from "../components/MyInput";

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        reset,
    } = useForm({
        mode: "onChange",
    });

    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill("")); // Keep OTP as an array for better manipulation
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Loading state for OTP verification

    const inputRefs = useRef([]); // To store references for each input field
    const router = useRouter(); // Next.js router to navigate

    // STEP 1: Register and request OTP
    const onSubmit = async (data) => {
        try {
            const response = await axios.post("/api/auth/register", data);
            setOtpSent(true);
            setMessage("Verification code sent to your email.");
            setError("");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
            setMessage("");
        }
    };

    // STEP 2: Verify OTP and create account
    const verifyOtp = async () => {
        setLoading(true); // Set loading to true when API call starts
        try {
            const response = await axios.post("/api/auth/verify", { code: otp.join("") }); // Join OTP array to string
            setMessage("Account successfully verified and created.");
            setError("");
            setOtpSent(false);
            reset(); // Clear form
            setOtp(Array(6).fill("")); // Reset OTP
            router.push("/login"); // Navigate to login page after successful OTP verification
        } catch (err) {
            setError(err.response?.data?.message || "Verification failed");
            setMessage("");
        } finally {
            setLoading(false); // Set loading to false when API call is completed
        }
    };

    // Handle OTP input change
    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (/^\d$/.test(value)) {
            const newOtp = [...otp]; // Clone the current OTP array
            newOtp[index] = value; // Set the digit at the correct index
            setOtp(newOtp);

            // Focus next input if the value is valid and not the last input
            if (index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    return (
        <main
            className="bg-[#F2F2F2] h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/assets/images/login-bg.png)" }}
        >
            <div className="h-screen overflow-auto grid justify-center items-center sm:p-5 p-3">
                <div className="lg:absolute lg:w-fit w-full xl:top-[40px] xl:right-[60px] lg:top-[30px] lg:right-[40px]">
                    <Link href="/" className="flex w-[118px] lg:m-0 mt-3 mx-auto">
                        <Image
                            src="/assets/images/logo.png"
                            alt="glowist logo"
                            width={200}
                            height={118}
                            className="w-full"
                        />
                    </Link>
                </div>

                <div className="bg-white max-w-5xl w-full mx-auto rounded-2xl 2sm:px-[50px] 2sm:py-[45px] p-[30px] relative border border-gray-400 z-10 lg:mt-0 mt-[30px]">
                    <div>
                        <h2 className="font-matter text-gray-900 font-bold sm:text-3xl 2sm:text-2xl text-[22px] mb-2">
                            {otpSent ? "Verify OTP" : "Register"}
                        </h2>
                        <p className="font-matter 2sm:text-base text-sm text-gray-800 mb-4">
                            {otpSent
                                ? "Enter the 6-digit code sent to your email."
                                : <>
                                    By continuing, you agree to our{" "}
                                    <Link href="/terms-of-use" className="text-gray-900 underline hover:no-underline">
                                        Terms of use
                                    </Link>{" "}
                                    and acknowledge that you understand the{" "}
                                    <Link href="/privacy-policy" className="text-gray-900 underline hover:no-underline">
                                        Privacy Policy
                                    </Link>.
                                </>
                            }
                        </p>

                        {message && <p className="text-green-600 font-medium mb-3">{message}</p>}
                        {error && <p className="text-red-600 font-medium mb-3">{error}</p>}

                        {!otpSent ? (
                            <form method="post" onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4">
                                    <div className="sm:mb-5 mb-4">
                                        <MyInput
                                            label={"Name"}
                                            name={"name"}
                                            type={"text"}
                                            defaultValue={""}
                                            placeholder={"Enter name..."}
                                            trigger={trigger}
                                            register={register}
                                            validations={{
                                                required: "Name is required",
                                            }}
                                            errors={errors}
                                        />
                                    </div>
                                    <div className="sm:mb-5 mb-4">
                                        <MyInput
                                            label={"Email"}
                                            name={"email"}
                                            type={"email"}
                                            defaultValue={""}
                                            placeholder={"Enter email..."}
                                            trigger={trigger}
                                            register={register}
                                            validations={{
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: "Enter a valid email",
                                                },
                                            }}
                                            errors={errors}
                                        />
                                    </div>
                                    <div className="sm:mb-5 mb-4">
                                        <MyInput
                                            label={"Phone"}
                                            name={"number"}
                                            type={"text"}
                                            defaultValue={""}
                                            placeholder={"Enter phone..."}
                                            trigger={trigger}
                                            register={register}
                                            validations={{
                                                required: "Phone is required",
                                            }}
                                            errors={errors}
                                        />
                                    </div>
                                    <div className="sm:mb-5 mb-4">
                                        <MyInput
                                            label={"Password"}
                                            name={"password"}
                                            type={"password"}
                                            defaultValue={""}
                                            placeholder={"Enter password..."}
                                            trigger={trigger}
                                            register={register}
                                            validations={{
                                                required: "Password is required",
                                                minLength: {
                                                    value: 8,
                                                    message: "Password must be at least 8 characters",
                                                },
                                                pattern: {
                                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                                    message: "Password must contain letters and numbers",
                                                },
                                            }}
                                            errors={errors}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap justify-between items-center cursor-pointer sm:mb-6 mb-5">
                                    <p className="font-matter 2sm:text-base text-sm text-gray-800">
                                        Already have an account?{" "}
                                        <Link href="/login" className="hover:underline text-gray-900">
                                            Login
                                        </Link>
                                    </p>
                                </div>
                                <div className="w-full">
                                    <button
                                        type="submit"
                                        className="w-full flex text-center justify-center text-white rounded-full 2sm:p-[12px] p-[10px] font-matter text-base bg-gray-900 border transition border-gray-900 hover:bg-white hover:border-gray-900 hover:text-gray-900"
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-2">
                                    {Array(6).fill().map((_, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            maxLength="1"
                                            value={otp[index] || ""}
                                            onChange={(e) => handleOtpChange(e, index)}
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            className="w-12 h-12 text-center text-2xl font-bold border border-gray-400 rounded-md"
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={verifyOtp}
                                    className="w-full flex text-center justify-center text-white rounded-full 2sm:p-[12px] p-[10px] font-matter text-base bg-gray-900 border transition border-gray-900 hover:bg-white hover:border-gray-900 hover:text-gray-900"
                                    disabled={loading} // Disable button while loading
                                >
                                    {loading ? (
                                        <div className="loader">Loading...</div> // Add a loading spinner or text
                                    ) : (
                                        "Verify OTP"
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default RegisterPage;