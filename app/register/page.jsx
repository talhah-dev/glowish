"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { InputOtp, Button } from "@heroui/react"; // HeroUI OTP + Button

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Loading flags for both API calls
  const [registerLoading, setRegisterLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const canRegister =
    form.name.trim() &&
    isValidEmail(form.email) &&
    form.number.trim() &&
    form.password.length >= 8;

  // STEP 1: Register and request OTP
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canRegister) return;

    setRegisterLoading(true);
    setMessage("");
    setError("");

    try {
      await axios.post("/api/auth/register", form);
      setOtpSent(true);
      setMessage("Verification code sent to your email.");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setRegisterLoading(false);
    }
  };

  // STEP 2: Verify OTP and create account
  const verifyOtp = async () => {
    if (otp.length !== 6) return;

    setVerifyLoading(true);
    setMessage("");
    setError("");

    try {
      await axios.post("/api/auth/verify", { code: otp, email: form.email });
      setMessage("Account successfully verified and created.");
      setOtpSent(false);
      setOtp("");
      setForm({ name: "", email: "", number: "", password: "" });
      router.push("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Verification failed");
    } finally {
      setVerifyLoading(false);
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
              {otpSent ? (
                "Enter the 6-digit code sent to your email."
              ) : (
                <>
                  By continuing, you agree to our{" "}
                  <Link
                    href="/terms-of-use"
                    className="text-gray-900 underline hover:no-underline"
                  >
                    Terms of use
                  </Link>{" "}
                  and acknowledge that you understand the{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-gray-900 underline hover:no-underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </>
              )}
            </p>

            {message && (
              <p className="text-green-600 font-medium mb-3">{message}</p>
            )}
            {error && <p className="text-red-600 font-medium mb-3">{error}</p>}

            {!otpSent ? (
              <form method="post" onSubmit={onSubmit}>
                <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4">
                  <div className="sm:mb-5 mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter name..."
                      className="w-full placeholder:text-zinc-400 rounded-xl border border-gray-300 p-3 focus:outline-none "
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="sm:mb-5 mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter email..."
                      className="w-full rounded-xl border border-gray-300 placeholder:text-zinc-400 p-3 focus:outline-none "
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className="sm:mb-5 mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Phone
                    </label>
                    <input
                      name="number"
                      type="tel"
                      value={form.number}
                      onChange={handleChange}
                      placeholder="Enter phone..."
                      className="w-full rounded-xl border border-gray-300 placeholder:text-zinc-400 p-3 focus:outline-none "
                      autoComplete="tel"
                      required
                    />
                  </div>

                  <div className="sm:mb-5 mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter password..."
                      className="w-full rounded-xl border border-gray-300 placeholder:text-zinc-400 p-3 focus:outline-none "
                      autoComplete="new-password"
                      required
                      minLength={8}
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      At least 8 characters.
                    </p>
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
                  <Button
                    type="submit"
                    className="w-full rounded-full 2sm:p-[12px] p-[10px] font-matter text-base bg-gray-900 text-white border border-gray-900 hover:bg-white hover:text-gray-900 transition"
                    isLoading={registerLoading}
                    isDisabled={!canRegister || registerLoading}
                  >
                    {registerLoading ? "Registering..." : "Register"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-5">
                {/* OTP */}
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
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;