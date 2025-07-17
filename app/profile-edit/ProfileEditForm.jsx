"use client";
import { Button, Input, Textarea, Select, SelectItem, Switch } from "@nextui-org/react";
import MyInput from "../components/MyInput";
import { useForm } from "react-hook-form";

const ProfileEditForm = () => {
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

  // Sample LinkedIn job titles (based on common and popular titles from 2025 trends)
  const jobTitles = [
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
    "Marketing Manager",
    "Sales Manager",
    "Financial Analyst",
    "Project Manager",
    "DevOps Engineer",
    "Cybersecurity Specialist",
    "AI/ML Specialist",
    "Digital Marketing Manager",
    "Data Engineer",
    "Customer Success Manager",
    "Business Development Manager",
    "Recruitment Manager",
    "Restaurant Specialist",
    "Dentist",
    "Dental Assistant",
    "Mental Health Practitioner",
    "Delivery Driver",
    // Add more as needed
  ];

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="sm:mb-5 mb-4 grid gap-4 md:grid-cols-2 grid-cols-1">
        <div className="w-full">
          <MyInput
            label={"First Name"}
            name={"fname"}
            type={"text"}
            defaultValue={""}
            placeholder={"First name..."}
            trigger={trigger}
            register={register}
            validations={{
              required: "First name is required",
              minLength: {
                value: 2,
                message: "First name must be at least 2 characters",
              },
            }}
            errors={errors}
          />
        </div>
        <div className="w-full">
          <MyInput
            label={"Last Name"}
            name={"lname"}
            type={"text"}
            defaultValue={""}
            placeholder={"Last name..."}
            trigger={trigger}
            register={register}
            validations={{
              required: "Last name is required",
              minLength: {
                value: 2,
                message: "Last name must be at least 2 characters",
              },
            }}
            errors={errors}
          />
        </div>
      </div>
      <div className="sm:mb-5 mb-4">
        <MyInput
          label={"Email"}
          name={"email"}
          type={"email"}
          defaultValue={"abdullahmorries@gmail.com"}
          placeholder={"your email..."}
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
        <label htmlFor="jobTitle" className="flex pb-2 text-base text-gray-900">
          Job Title
        </label>
        <Select
          id="jobTitle"
          placeholder="Select your job title..."
          defaultSelectedKeys={["CEO, Founder"]}
          {...register("jobTitle", {
            required: "Job title is required",
          })}
          classNames={{
            trigger:
              "w-full rounded-full text-gray-900 px-4 shadow-none !bg-transparent hover:!bg-transparent h-fit border border-gray-400 focus:border-[#000]",
            value: "text-base w-full leading-6 py-3",
            popoverContent: "rounded-2xl",
          }}
        >
          {jobTitles.map((title) => (
            <SelectItem key={title} value={title}>
              {title}
            </SelectItem>
          ))}
        </Select>
        {errors.jobTitle && (
          <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>
        )}
      </div>
      <div className="sm:mb-5 mb-4">
        <label
          htmlFor="aboutMe"
          className="flex pb-2 text-base text-gray-900"
        >
          About Me
        </label>
        <Textarea
          id="aboutMe"
          type="text"
          placeholder="About me..."
          defaultValue="I am a seasoned businessman with expertise in technology, dedicated to driving innovation and growth in the marketplace. Passionate about building strong, sustainable businesses and forging meaningful industry connections."
          disableAutosize
          {...register("aboutMe")}
          classNames={{
            inputWrapper:
              "w-full rounded-2xl text-gray-900 p-0 shadow-none !bg-transparent hover:!bg-transparent h-fit",
            input:
              "resize-y min-h-[150px] rounded-2xl text-base w-full leading-6 px-6 py-3 border border-gray-400 focus:border-[#000]",
          }}
        />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4">
        <div className="sm:mb-5 mb-4">
          <label htmlFor="portfolio" className="flex pb-2 text-base text-gray-900">
            My Portfolio - Website
          </label>
          <Input
            id="portfolio"
            type="text"
            placeholder="https://www.demooo.com/..."
            defaultValue="https://www.demooo.com/"
            {...register("portfolio")}
            classNames={{
              inputWrapper:
                "w-full rounded-full text-gray-900 px-0 shadow-none !bg-transparent hover:!bg-transparent h-fit",
              input:
                "text-base rounded-full w-full leading-6 px-6 py-3 border border-gray-400 focus:border-[#000]",
            }}
          />
        </div>
        <div className="sm:mb-5 mb-4">
          <label htmlFor="linkedin" className="flex pb-2 text-base text-gray-900">
            LinkedIn Profile
          </label>
          <Input
            id="linkedin"
            type="text"
            placeholder="https://www.linkedin.com/in/username..."
            {...register("linkedin")}
            classNames={{
              inputWrapper:
                "w-full rounded-full text-gray-900 px-0 shadow-none !bg-transparent hover:!bg-transparent h-fit",
              input:
                "text-base rounded-full w-full leading-6 px-6 py-3 border border-gray-400 focus:border-[#000]",
            }}
          />
        </div>
        <div className="sm:mb-5 mb-4">
          <label htmlFor="instagram" className="flex pb-2 text-base text-gray-900">
            Instagram
          </label>
          <Input
            id="instagram"
            type="text"
            placeholder="https://www.instagram.com/username..."
            {...register("instagram")}
            classNames={{
              inputWrapper:
                "w-full rounded-full text-gray-900 px-0 shadow-none !bg-transparent hover:!bg-transparent h-fit",
              input:
                "text-base rounded-full w-full leading-6 px-6 py-3 border border-gray-400 focus:border-[#000]",
            }}
          />
        </div>
        <div className="sm:mb-5 mb-4">
          <label htmlFor="facebook" className="flex pb-2 text-base text-gray-900">
            Facebook
          </label>
          <Input
            id="facebook"
            type="text"
            placeholder="https://www.facebook.com/username..."
            {...register("facebook")}
            classNames={{
              inputWrapper:
                "w-full rounded-full text-gray-900 px-0 shadow-none !bg-transparent hover:!bg-transparent h-fit",
              input:
                "text-base rounded-full w-full leading-6 px-6 py-3 border border-gray-400 focus:border-[#000]",
            }}
          />
        </div>
        <div className="sm:mb-5 mb-4">
          <label htmlFor="tiktok" className="flex pb-2 text-base text-gray-900">
            TikTok
          </label>
          <Input
            id="tiktok"
            type="text"
            placeholder="https://www.tiktok.com/@username..."
            {...register("tiktok")}
            classNames={{
              inputWrapper:
                "w-full rounded-full text-gray-900 px-0 shadow-none !bg-transparent hover:!bg-transparent h-fit",
              input:
                "text-base rounded-full w-full leading-6 px-6 py-3 border border-gray-400 focus:border-[#000]",
            }}
          />
        </div>
        <div className="sm:mb-5 mb-4">
          <label htmlFor="xprofile" className="flex pb-2 text-base text-gray-900">
            X Profile
          </label>
          <Input
            id="xprofile"
            type="text"
            placeholder="https://x.com/username..."
            {...register("xprofile")}
            classNames={{
              inputWrapper:
                "w-full rounded-full text-gray-900 px-0 shadow-none !bg-transparent hover:!bg-transparent h-fit",
              input:
                "text-base rounded-full w-full leading-6 px-6 py-3 border border-gray-400 focus:border-[#000]",
            }}
          />
        </div>
      </div>
      <div className="sm:mb-5 mb-4">
        <label htmlFor="bbcProfile" className="flex pb-2 text-base text-gray-900">
          BBC Profile
        </label>
        <Input
          id="bbcProfile"
          type="text"
          placeholder="Your BBC profile link..."
          {...register("bbcProfile")}
          classNames={{
            inputWrapper:
              "w-full rounded-full text-gray-900 px-0 shadow-none !bg-transparent hover:!bg-transparent h-fit",
            input:
              "text-base rounded-full w-full leading-6 px-6 py-3 border border-gray-400 focus:border-[#000]",
          }}
        />
        <Button
          type="button"
          variant="flat"
          className="mt-2 flex justify-center items-center text-base px-[22px] min-w-[30px] rounded-full"
          onClick={() => navigator.clipboard.writeText("Your BBC profile link")}
        >
          Copy BBC Profile Link
        </Button>
      </div>
      <div className="sm:mb-5 mb-4">
        <label htmlFor="idVerification" className="flex pb-2 text-base text-gray-900">
          ID Verification
        </label>
        <Input
          id="idVerification"
          type="text"
          placeholder="Upload or verify your ID..."
          {...register("idVerification")}
          classNames={{
            inputWrapper:
              "w-full rounded-full text-gray-900 px-0 shadow-none !bg-transparent hover:!bg-transparent h-fit",
            input:
              "text-base rounded-full w-full leading-6 px-6 py-3 border border-gray-400 focus:border-[#000]",
          }}
        />
        <p className="text-green-600 text-sm mt-1">You verified your identity</p>
      </div>
      <div className="sm:mb-5 mb-4">
        <label htmlFor="isPublic" className="flex pb-2 text-base text-gray-900">
          Profile Visibility
        </label>
        <div className="flex items-center gap-3">
          <Switch
            id="isPublic"
            {...register("isPublic")}
            defaultSelected={true}
            classNames={{
              wrapper: "bg-gray-300 group-data-[selected=true]:bg-zinc-600",
              thumb: "bg-white group-data-[selected=true]:bg-gray-200",
            }}
          />
          <span className="text-base text-gray-900">
            {register("isPublic").value ? "Public" : "Private"}
          </span>
        </div>
      </div>
      <div className="self-end flex gap-3">
        <Button
          type="button"
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
          Update Profile
        </Button>
      </div>
    </form>
  );
};

export default ProfileEditForm;