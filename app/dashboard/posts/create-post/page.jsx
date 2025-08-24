"use client";

import React, { useCallback, useMemo, useEffect, useState } from "react";
import {
  Button,
  Input,
  Textarea,
  RadioGroup,
  Radio,
  Switch,
  Chip,
  ToastProvider,
  addToast,
} from "@nextui-org/react";
import { ImagePlus, Video, UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useForm, Controller } from "react-hook-form";
import DashboardLayout from "../../../DashboardLayout";

export default function Page() {
  const {
    control,
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      mediaKind: "image", // "image" | "video"
      imageFile: [],
      videoFile: [],
      categories: "",
      postTitle: "",
      summary: "",
      tags: "",
      postContent: "",
      allowComments: true,
    },
  });

  const [intent, setIntent] = useState("publish"); // "draft" | "publish"

  const mediaKind = watch("mediaKind");
  const imageFiles = watch("imageFile");
  const videoFiles = watch("videoFile");

  const image = imageFiles && imageFiles.length ? imageFiles[0] : null;
  const video = videoFiles && videoFiles.length ? videoFiles[0] : null;

  const imagePreview = useMemo(() => (image ? URL.createObjectURL(image) : null), [image]);
  const videoPreview = useMemo(() => (video ? URL.createObjectURL(video) : null), [video]);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [imagePreview, videoPreview]);

  const onValid = async (data) => {
    // Build categories/tags arrays
    const categories = data.categories
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const tags = data.tags
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    // Build payload
    const form = new FormData();
    form.append("mediaKind", data.mediaKind);
    if (data.mediaKind === "image" && image) form.append("media", image);
    if (data.mediaKind === "video" && video) form.append("media", video);
    form.append("postTitle", data.postTitle);
    form.append("summary", data.summary || "");
    form.append("postContent", data.postContent);
    form.append("categories", JSON.stringify(categories));
    form.append("tags", JSON.stringify(tags));
    form.append("allowComments", JSON.stringify(!!data.allowComments));
    form.append("intent", intent); // draft | publish

    // TODO: replace with your API endpoint
    // const res = await fetch("/api/posts", { method: "POST", body: form });
    // if (!res.ok) throw new Error("Failed to create post");

    console.log("Submitting ->", {
      intent,
      mediaKind: data.mediaKind,
      file: data.mediaKind === "image" ? image : video,
      title: data.postTitle,
      summary: data.summary,
      content: data.postContent,
      categories,
      tags,
      allowComments: data.allowComments,
    });

    addToast({
      title: intent === "publish" ? "Post published" : "Draft saved",
      description:
        data.mediaKind === "image"
          ? "Your image post is ready."
          : "Your video post is ready.",
      color: "success",
      timeout: 3500,
    });

    reset({
      mediaKind: data.mediaKind,
      imageFile: [],
      videoFile: [],
      categories: "",
      postTitle: "",
      summary: "",
      tags: "",
      postContent: "",
      allowComments: true,
    });
  };

  const onInvalid = (errs) => {
    const first = Object.values(errs)[0];
    addToast({
      title: "Please fix the errors",
      description: first?.message || "Some required fields are missing.",
      color: "danger",
      timeout: 4000,
    });
  };

  return (
      <DashboardLayout>
        <div className="max-w-[900px] mx-auto w-full px-4 md:py-[40px] sm:py-[30px] py-[20px]">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onValid, onInvalid)}>
            {/* Media kind */}
            <div>
              <label className="block pb-2 font-matter text-base font-medium text-gray-900">
                Post Media
              </label>
              <Controller
                name="mediaKind"
                control={control}
                render={({ field }) => (
                  <RadioGroup orientation="horizontal" {...field}>
                    <Radio value="image" startContent={<ImagePlus size={18} />}>
                      Image
                    </Radio>
                    <Radio value="video" startContent={<Video size={18} />}>
                      Video
                    </Radio>
                  </RadioGroup>
                )}
              />
            </div>

            {/* Image uploader */}
            {mediaKind === "image" && (
              <Controller
                name="imageFile"
                control={control}
                rules={{
                  validate: {
                    required: (files) =>
                      (files && files.length === 1) || "Please select one image",
                    size: (files) =>
                      !files.length || files[0].size <= 5 * 1024 * 1024 || "Image must be ≤ 5MB",
                    type: (files) =>
                      !files.length ||
                      /^image\/(png|jpe?g|gif|webp|svg\+xml)$/i.test(files[0].type) ||
                      "Only PNG, JPG, JPEG, GIF, WEBP or SVG allowed",
                  },
                }}
                render={({ field: { onChange } }) => {
                  const onDrop = useCallback(
                    (accepted) => onChange(accepted.slice(0, 1)),
                    [onChange]
                  );
                  const { getRootProps, getInputProps, isDragActive } = useDropzone({
                    onDrop,
                    multiple: false,
                    accept: {
                      "image/png": [],
                      "image/jpeg": [],
                      "image/jpg": [],
                      "image/gif": [],
                      "image/webp": [],
                      "image/svg+xml": [],
                    },
                  });

                  return (
                    <div>
                      <div
                        {...getRootProps()}
                        className={`border border-dashed p-7 rounded-lg flex flex-col items-center justify-center cursor-pointer transition
                        ${isDragActive ? "border-blue-500" : "border-gray-300"}
                        ${errors.imageFile ? "border-red-400" : ""}`}
                      >
                        <input {...getInputProps()} />
                        {imagePreview ? (
                          <div className="w-full flex items-center gap-4">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="h-24 w-24 object-cover rounded-md border"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{image?.name}</p>
                              <p className="text-xs text-gray-500">
                                {(image?.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                              <Button
                                size="sm"
                                variant="flat"
                                className="mt-2"
                                onPress={(e) => {
                                  e.preventDefault();
                                  setValue("imageFile", []);
                                }}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <UploadCloud size={44} />
                            <h4 className="mt-2 font-matter md:text-base text-sm text-[#008000]">
                              Upload an image
                            </h4>
                            <p className="font-matter text-xs text-gray-800/50">
                              PNG, JPG, JPEG, GIF, WEBP, SVG (max 5MB)
                            </p>
                          </>
                        )}
                      </div>
                      {errors.imageFile && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.imageFile.message}
                        </p>
                      )}
                    </div>
                  );
                }}
              />
            )}

            {/* Video uploader */}
            {mediaKind === "video" && (
              <Controller
                name="videoFile"
                control={control}
                rules={{
                  validate: {
                    required: (files) =>
                      (files && files.length === 1) || "Please select one video",
                    size: (files) =>
                      !files.length || files[0].size <= 100 * 1024 * 1024 || "Video must be ≤ 100MB",
                    type: (files) =>
                      !files.length ||
                      /^(video\/mp4|video\/webm|video\/quicktime)$/i.test(files[0].type) ||
                      "Only MP4, WEBM or MOV allowed",
                  },
                }}
                render={({ field: { onChange } }) => {
                  const onDrop = useCallback(
                    (accepted) => onChange(accepted.slice(0, 1)),
                    [onChange]
                  );
                  const { getRootProps, getInputProps, isDragActive } = useDropzone({
                    onDrop,
                    multiple: false,
                    accept: {
                      "video/mp4": [],
                      "video/webm": [],
                      "video/quicktime": [],
                    },
                  });

                  return (
                    <div>
                      <div
                        {...getRootProps()}
                        className={`border border-dashed p-7 rounded-lg flex flex-col items-center justify-center cursor-pointer transition
                        ${isDragActive ? "border-blue-500" : "border-gray-300"}
                        ${errors.videoFile ? "border-red-400" : ""}`}
                      >
                        <input {...getInputProps()} />
                        {videoPreview ? (
                          <div className="w-full flex items-center gap-4">
                            <video
                              src={videoPreview}
                              className="h-28 rounded-md border"
                              controls
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{video?.name}</p>
                              <p className="text-xs text-gray-500">
                                {(video?.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                              <Button
                                size="sm"
                                variant="flat"
                                className="mt-2"
                                onPress={(e) => {
                                  e.preventDefault();
                                  setValue("videoFile", []);
                                }}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <UploadCloud size={44} />
                            <h4 className="mt-2 font-matter md:text-base text-sm text-[#008000]">
                              Upload a video
                            </h4>
                            <p className="font-matter text-xs text-gray-800/50">
                              MP4, WEBM, MOV (max 100MB)
                            </p>
                          </>
                        )}
                      </div>
                      {errors.videoFile && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.videoFile.message}
                        </p>
                      )}
                    </div>
                  );
                }}
              />
            )}

            {/* Title */}
            <div>
              <Input
                id="post-title"
                type="text"
                label="Post Title"
                labelPlacement="outside"
                placeholder="Enter post title here…"
                {...register("postTitle", { required: "Post title is required" })}
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
                <p className="text-red-400 text-sm mt-1">{errors.postTitle.message}</p>
              )}
            </div>

            {/* Summary / Deck (shown in the desktop cards under the title) */}
            <div>
              <Textarea
                id="summary"
                label="Summary"
                labelPlacement="outside"
                placeholder="Short intro shown in the card feed…"
                {...register("summary", { required: "Summary is required" })}
                onBlur={() => trigger("summary")}
                classNames={{
                  label: "pb-0 text-base font-medium text-gray-900",
                  inputWrapper:
                    "w-full rounded-2xl text-gray-900 px-4 py-2 shadow-none !bg-white hover:!bg-white h-fit border border-transparent focus-within:border-[#0080004d]",
                  input:
                    "resize-y min-h-[80px] text-base w-full leading-6 px-0 py-0 placeholder:font-matter placeholder:text-base placeholder:text-gray-800/50",
                }}
              />
              {errors.summary && (
                <p className="text-red-400 text-sm mt-1">{errors.summary.message}</p>
              )}
            </div>

            {/* Full content */}
            <div>
              <Textarea
                id="content"
                label="Post Content"
                labelPlacement="outside"
                placeholder="Write your post content here…"
                {...register("postContent", { required: "Post content is required" })}
                onBlur={() => trigger("postContent")}
                classNames={{
                  label: "pb-0 text-base font-medium text-gray-900",
                  inputWrapper:
                    "w-full rounded-2xl text-gray-900 px-4 py-2 shadow-none !bg-white hover:!bg-white h-fit border border-transparent focus-within:border-[#0080004d]",
                  input:
                    "resize-y min-h-[150px] text-base w-full leading-6 px-0 py-0 placeholder:font-matter placeholder:text-base placeholder:text-gray-800/50",
                }}
              />
              {errors.postContent && (
                <p className="text-red-400 text-sm mt-1">{errors.postContent.message}</p>
              )}
            </div>

            {/* Categories + Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  id="categories"
                  type="text"
                  label="Categories"
                  labelPlacement="outside"
                  placeholder="e.g. sports, tech"
                  {...register("categories", { required: "At least one category is required" })}
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
                  <p className="text-red-400 text-sm mt-1">{errors.categories.message}</p>
                )}
              </div>
              <div>
                <Input
                  id="tags"
                  type="text"
                  label="Tags / Hashtags"
                  labelPlacement="outside"
                  placeholder="e.g. #Prime, #Videos, #Events"
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
            </div>

            {/* Options */}
            <div className="flex items-center justify-between gap-4">
              <Controller
                name="allowComments"
                control={control}
                render={({ field }) => (
                  <Switch
                    {...field}
                    isSelected={field.value}
                    onValueChange={field.onChange}
                    size="sm"
                  >
                    Allow comments
                  </Switch>
                )}
              />
              <div className="flex gap-2">
                <Chip size="sm" variant="flat">
                  {mediaKind === "image" ? "Image Post" : "Video Post"}
                </Chip>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Button
                type="submit"
                variant="light"
                className="text-base px-[22px] min-w-[30px] rounded-full"
                isLoading={isSubmitting && intent === "draft"}
                onPress={() => setIntent("draft")}
              >
                Save draft
              </Button>
              <Button
                type="submit"
                className="text-base px-[22px] min-w-[30px] rounded-full bg-gray-900 text-white"
                isLoading={isSubmitting && intent === "publish"}
                onPress={() => setIntent("publish")}
              >
                Publish
              </Button>
            </div>
          </form>
        </div>
      </DashboardLayout>
  );
}