"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MyInput from "../components/MyInput";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const LoginPage = () => {

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/auth/login", data);

      const role = response.data.user?.role;

      if (role === "admin") {
        router.push("/dashboard");
      } else if (role === "user") {
        router.push("/");
      } else {
        router.push("/");
      }

      dispatch(setUserData(response.data))

    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Something went wrong, please try again.");
    } finally {
      setLoading(false);
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
              height={118}
              width={200}
              alt="glowist logo"
              className="w-full"
            />
          </Link>
        </div>

        <div className="bg-white max-w-[570px] w-full mx-auto rounded-2xl 2sm:px-[50px] 2sm:py-[45px] p-[30px] relative border border-gray-400 z-10 lg:mt-0 mt-[30px]">
          <div>
            <h2 className="font-matter text-gray-900 font-bold sm:text-3xl 2sm:text-2xl text-[22px] mb-2">
              Login
            </h2>
            <p className="font-matter 2sm:text-base text-sm text-gray-800">
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
            </p>
            <div className="2sm:mt-4 mt-3">
              <form method="post" onSubmit={handleSubmit(onSubmit)}>
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
                    }}
                    errors={errors}
                  />
                </div>
                <div className="flex flex-wrap justify-between items-center cursor-pointer sm:mb-6 mb-5">
                  <p className="font-matter 2sm:text-base text-sm	text-gray-800">
                    No account?{" "}
                    <Link href="/register" className="hover:underline text-gray-900">
                      Register
                    </Link>
                  </p>
                  <Link
                    href="/forgot-password"
                    className="font-matter 2sm:text-base text-sm text-gray-900 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="w-full">
                  <button
                    type="submit"
                    disabled={loading}
                    aria-busy={loading}
                    className={`w-full flex items-center justify-center rounded-full 2sm:p-[12px] p-[10px] font-matter text-base border transition
                  ${loading
                        ? "bg-gray-700 text-white border-gray-700 opacity-80 cursor-not-allowed"
                        : "bg-gray-900 text-white border-gray-900 hover:bg-white hover:text-gray-900"
                      }`}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        {/* spinner */}
                        <LoaderCircle className="animate-spin text-white" />
                        <span>Logging in…</span>
                      </span>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </form>
            </div>
            {error && <p className="text-red-600 font-medium mb-3">{error}</p>} {/* Display error message */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
