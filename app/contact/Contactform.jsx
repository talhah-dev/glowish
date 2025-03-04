"use client";
import React from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";

const Contactform = () => {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="sm:mb-5 mb-4">
        <label htmlFor="name" className="flex pb-2 text-base text-gray-900">
          Name
        </label>
        <Input
          id="name"
          type="text"
          placeholder="your name..."
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
          onBlur={() => trigger("name")}
          classNames={{
            inputWrapper:
              "w-full rounded-full text-gray-900 px-0 shadow-none !bg-white hover:!bg-white h-fit",
            input: `text-base rounded-full w-full leading-6 px-6 py-3 border ${
              errors.name
                ? "border-red-400 focus:border-red-400"
                : "border-gray-400 focus:border-[#0080004d]"
            }`,
          }}
        />
        {errors.name && (
          <p className="text-red-400 text-sm mt-0.5">{errors.name.message}</p>
        )}
      </div>
      <div className="sm:mb-5 mb-4">
        <label htmlFor="email" className="flex pb-2 text-base text-gray-900">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="your email..."
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
          })}
          onBlur={() => trigger("email")}
          classNames={{
            inputWrapper:
              "w-full rounded-full text-gray-900 px-0 shadow-none !bg-white hover:!bg-white h-fit",
            input: `text-base rounded-full w-full leading-6 px-6 py-3 border ${
              errors.email
                ? "border-red-400 focus:border-red-400"
                : "border-gray-400 focus:border-[#0080004d]"
            }`,
          }}
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-0.5">{errors.email.message}</p>
        )}
      </div>
      <div className="sm:mb-5 mb-4">
        <label htmlFor="Message" className="flex pb-2 text-base text-gray-900">
          Message
        </label>
        <Textarea
          id="Message"
          type="text"
          placeholder="your message..."
          disableAutosize
          {...register("message")}
          classNames={{
            inputWrapper:
              "w-full rounded-2xl text-gray-900 p-0 shadow-none !bg-transparent hover:!bg-transparent h-fit",
            input:
              "resize-y min-h-[150px] rounded-2xl text-base w-full leading-6 px-6 py-3  border border-gray-400 focus:border-[#0080004d]",
          }}
        />
      </div>
      <div>
        <Button
          type="submit"
          color="primary"
          className="flex justify-center items-center text-base px-[22px] min-w-[30px] rounded-full bg-gray-900"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Contactform;
