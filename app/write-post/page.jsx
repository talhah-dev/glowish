"use client";
import { Button, Input, Textarea } from "@nextui-org/react";
import { ImagePlus } from "lucide-react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";

const WritePost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    control,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  console.log(errors);

  return (
    <main>
      <div className="max-w-[800px] mx-auto w-full px-4 md:py-[40px] sm:py-[30px] py-[20px]">
        <form
          className="flex flex-col gap-6"
          method="post"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="featured-image"
              className="block pb-2 font-matter text-base font-medium text-gray-900"
            >
              Featured Image
            </label>
            <Controller
              name="file"
              control={control}
              defaultValue={[]}
              rules={{
                required: "file is required",
                //   file size vlaidation if required //
                // validate: {
                //   lessThan2MB: (files) =>
                //     (files.length > 0 && files[0].size < 2 * 1024 * 1024) ||
                //     "File size should be less than 2MB",
                // },
              }}
              render={({ field: { onChange } }) => {
                const onDrop = useCallback(
                  (acceptedFiles) => {
                    onChange(acceptedFiles);
                  },
                  [onChange]
                );

                const { getRootProps, getInputProps, isDragActive } =
                  useDropzone({ onDrop });

                return (
                  <div>
                    <div
                      {...getRootProps()}
                      className={`border border-dashed border-gray-300 p-7 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 ${
                        isDragActive
                          ? "border-blue-500"
                          : errors.file
                          ? "border-red-400"
                          : "border-gray-300"
                      }`}
                    >
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>Drop the files here...</p>
                      ) : (
                        <>
                          <ImagePlus
                            size={44}
                            stroke="#646464"
                            strokeWidth={1}
                          />
                          <h4 className="mt-2 font-matter md:text-base text-sm text-[#008000]">
                            Upload a file
                          </h4>
                          <p class="font-matter text-xs text-gray-800/50">
                            PNG, JPG, GIF, WEBP, SVG...
                          </p>
                        </>
                      )}
                    </div>
                    {errors.file && (
                      <p className="text-red-400 text-sm mt-0.5">
                        {errors.file.message}
                      </p>
                    )}
                  </div>
                );
              }}
            />
          </div>
          <div>
            <Input
              id="categories"
              type="text"
              label="Add categories"
              labelPlacement="outside"
              placeholder="Enter categories..."
              {...register("categories", {
                required: "category is required",
              })}
              onBlur={() => trigger("categories")}
              classNames={{
                label: "pb-0 text-base font-medium text-gray-900",
                inputWrapper:
                  "w-full rounded-full text-gray-900 px-0 shadow-none !bg-white hover:!bg-white h-fit",
                input: `text-base w-full leading-6 px-0 py-2 border-b placeholder:font-matter placeholder:text-base placeholder:text-gray-800/50 ${
                  errors.categories
                    ? "border-red-400 focus:border-red-400"
                    : "border-gray-400 focus:border-[#0080004d]"
                }`,
              }}
            />
            {errors.categories && (
              <p className="text-red-400 text-sm mt-0.5">
                {errors.categories.message}
              </p>
            )}
          </div>
          <div>
            <Input
              id="post-title"
              type="text"
              label="New Post Title"
              labelPlacement="outside"
              placeholder="Enter post title here..."
              {...register("postTitle", {
                required: "post title is required",
              })}
              onBlur={() => trigger("postTitle")}
              classNames={{
                label: "pb-0 text-base font-medium text-gray-900",
                inputWrapper:
                  "w-full rounded-full text-gray-900 px-0 shadow-none !bg-white hover:!bg-white h-fit",
                input: `text-base w-full leading-6 px-0 py-2 border-b placeholder:font-matter placeholder:text-base placeholder:text-gray-800/50 ${
                  errors.postTitle
                    ? "border-red-400 focus:border-red-400"
                    : "border-gray-400 focus:border-[#0080004d]"
                }`,
              }}
            />
            {errors.postTitle && (
              <p className="text-red-400 text-sm mt-0.5">
                {errors.postTitle.message}
              </p>
            )}
          </div>
          <div>
            <Input
              id="tags"
              type="text"
              label="Add Tags"
              labelPlacement="outside"
              placeholder="Enter tags..."
              {...register("tags")}
              classNames={{
                label: "pb-0 text-base font-medium text-gray-900",
                inputWrapper:
                  "w-full rounded-full text-gray-900 px-0 shadow-none !bg-white hover:!bg-white h-fit",
                input:
                  "text-base w-full leading-6 px-0 py-2 border-b placeholder:font-matter placeholder:text-base placeholder:text-gray-800/50 border-gray-400 focus:border-[#0080004d]",
              }}
            />
          </div>
          <div>
            <Textarea
              id="content"
              type="text"
              label="Post Content"
              labelPlacement="outside"
              placeholder="Write your post content here..."
              {...register("postContent")}
              classNames={{
                label: "pb-0 text-base font-medium text-gray-900",
                inputWrapper:
                  "w-full rounded-full text-gray-900 px-0 shadow-none !bg-white hover:!bg-white h-fit",
                input:
                  "resize-y min-h-[150px] text-base w-full leading-6 px-0 py-2 border-b placeholder:font-matter placeholder:text-base placeholder:text-gray-800/50 border-gray-400 focus:border-[#0080004d]",
              }}
            />
          </div>
          {/* Form actions */}
          <div className="flex justify-end gap-4">
            <Button
              type="submit"
              variant="light"
              className="text-base px-[22px] min-w-[30px] rounded-full"
            >
              Save draft
            </Button>
            <Button
              type="submit"
              className="text-base px-[22px] min-w-[30px] rounded-full bg-gray-900 text-white"
            >
              Publish
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default WritePost;
