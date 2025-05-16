"use client";
import { Button, Input, Textarea } from "@nextui-org/react";
import MyInput from "../components/MyInput";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";

const AddDocuments = () => {
   const [file, setFile] = useState("");
    const fileInputRef = useRef("");
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
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="sm:mb-5 mb-4">
        <MyInput
          label={"Passport ID"}
          name={"passport"}
          type={"text"}
          placeholder={"0000 0000 0000"}
          trigger={trigger}
          register={register}
          validations={{
            required: "Position is required",
            minLength: {
              value: 2,
              message: "Position must be at least 2 characters",
            },
          }}
          errors={errors}
        />
      </div>
      <div className="sm:mb-5 mb-4">
        <label htmlFor="file" className="text-zinc-900 block">Upload File</label>

        <div
          className={`relative mt-2 text-zinc-300 font-semibold text-base rounded w-full h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed ${file ? "border-green-600 bg-green-900/10" : "border-zinc-300"
            } transition-all duration-300`}
          onClick={() => fileInputRef.current?.click()}
        >
          {file ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 mb-2 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.285 6.708l-11.285 11.285-5.285-5.285 1.414-1.414 3.871 3.871 9.871-9.871z" />
              </svg>
              <p className="text-sm font-medium text-green-400">File Attached!</p>
              <p className="text-xs mt-1 text-zinc-200">{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-3 fill-gray-700" viewBox="0 0 32 32">
                <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
              </svg>
              <p className="text-zinc-600">Click or drop to upload</p>
              <p className="text-xs font-normal text-zinc-500 mt-1">Max file size 10MB.</p>
            </>
          )}

          <input
            onChange={(e) => {
              const selected = e.target.files?.[0];
              if (selected) setFile(selected);
            }}
            type="file"
            id="file"
            ref={fileInputRef}
            className="hidden"
          />
        </div>
      </div>

      <div className="self-end flex gap-3">
        <Button
          type="submit"
          variant="flat"
          className="flex justify-center items-center text-base px-[22px] min-w-[30px] rounded-full"
        >
          Cancel
        </Button>
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

export default AddDocuments;
