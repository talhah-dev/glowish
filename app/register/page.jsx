"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import MyInput from "../components/MyInput";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm({
        mode: "onChange",
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    console.log(errors);

    return (
        <main
            className="bg-[#F2F2F2] h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/assets/images/login-bg.png)" }}
        >
            <div className="h-screen overflow-auto grid justify-center items-center sm:p-5 p-3">
                <div className="lg:absolute lg:w-fit w-full xl:top-[40px] xl:right-[60px] lg:top-[30px] lg:right-[40px]">
                    <Link href="/" className="flex w-[118px] lg:m-0 mt-3 mx-auto">
                        <Image
                            height="118"
                            width="200"
                            src="/assets/images/logo.png"
                            alt="glowist logo"
                            className="w-full"
                        />
                    </Link>
                </div>

                <div className="bg-white max-w-5xl w-full mx-auto rounded-2xl 2sm:px-[50px] 2sm:py-[45px] p-[30px] relative border border-gray-400 z-10 lg:mt-0 mt-[30px]">
                    <div>
                        {/* <!-- Login --> */}
                        <div>
                            <h2 className="font-matter text-gray-900 font-bold sm:text-3xl 2sm:text-2xl text-[22px] mb-2">
                                Register
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
                            <div className="2sm:mt-9 mt-6">
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
                                        {/* phone */}
                                        <div className="sm:mb-5 mb-4">
                                            <MyInput
                                                label={"Phone"}
                                                name={"phone"}
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
                                        <p className="font-matter 2sm:text-base text-sm	text-gray-800">
                                            Already have an account?{" "}
                                            <Link href="/login" className="hover:underline text-gray-900">
                                                Login
                                            </Link>
                                        </p>
                                    </div>
                                    <div className="w-full">
                                        <Link
                                            href="/"
                                            className="w-full flex text-center justify-center text-white rounded-full 2sm:p-[12px] p-[10px] font-matter text-base bg-gray-900 border transition border-gray-900 hover:bg-white hover:border-gray-900 hover:text-gray-900"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* <!-- Login --> */}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default RegisterPage;
