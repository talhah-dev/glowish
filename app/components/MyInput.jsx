import React from "react";
import { Input } from "@nextui-org/react";

const MyInput = ({
  label,
  name,
  type,
  defaultValue,
  placeholder,
  register,
  validations,
  trigger,
  errors,
}) => {
  return (
    <>
      <label htmlFor={name} className="flex pb-2 text-base text-gray-900 w-fit">
        {label}
      </label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onBlur={() => trigger(name)}
        {...register(name, validations)}
        classNames={{
          inputWrapper:
            "w-full rounded-full text-gray-900 px-0 shadow-none !bg-white hover:!bg-white h-fit",
          input: `text-base rounded-full w-full leading-6 px-6 py-3 border ${
            errors[name]
              ? "border-red-400 focus:border-red-400"
              : "border-gray-400 focus:border-[#0080004d]"
          }`,
        }}
      />
      {errors[name] && (
        <p className="text-red-400 text-sm mt-0.5">{errors[name].message}</p>
      )}
    </>
  );
};

export default MyInput;
