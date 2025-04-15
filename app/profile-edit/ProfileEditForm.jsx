"use client";
import { Button, Input, Textarea } from "@nextui-org/react";
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

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="sm:mb-5 mb-4 flex 2sm:gap-4">
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
        <MyInput
          label={"Position"}
          name={"position"}
          type={"text"}
          defaultValue={"CEO, Founder"}
          placeholder={"your position..."}
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
        <label
          htmlFor="aboutInfo"
          className="flex pb-2 text-base text-gray-900"
        >
          About info
        </label>
        <Textarea
          id="aboutInfo"
          type="text"
          placeholder="About info..."
          defaultValue="I am a seasoned businessman with expertise in technology, dedicated to driving innovation and growth in the marketplace. Passionate about building strong, sustainable businesses and forging meaningful industry connections."
          disableAutosize
          {...register("aboutInfo")}
          classNames={{
            inputWrapper:
              "w-full rounded-2xl text-gray-900 p-0 shadow-none !bg-transparent hover:!bg-transparent h-fit",
            input:
              "resize-y min-h-[150px] rounded-2xl text-base w-full leading-6 px-6 py-3  border border-gray-400 focus:border-[#0080004d]",
          }}
        />
      </div>
      <div className="sm:mb-5 mb-4">
        <label htmlFor="website" className="flex pb-2 text-base text-gray-900">
          Website
        </label>
        <Input
          id="website"
          type="text"
          placeholder="https://www.demooo.com/..."
          defaultValue="https://www.demooo.com/"
          // startContent={<Globe />}
          {...register("website")}
          classNames={{
            inputWrapper:
              "w-full rounded-full text-gray-900 px-0 shadow-none !bg-transparent hover:!bg-transparent h-fit",
            input:
              "text-base rounded-full w-full leading-6 px-6 py-3 border border-gray-400 focus:border-[#0080004d]",
          }}
        />
      </div>
      <div className="sm:mb-5 mb-4">
        <label htmlFor="website" className="flex pb-2 text-base text-gray-900">
          Set as Pravite Profile
        </label>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" class="sr-only peer" />
          <div class="group peer ring-0 bg-gray-400  rounded-full outline-none duration-300 after:duration-300 w-20 h-9 peer-checked:bg-zinc-300  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-7 after:w-7 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-[44px] peer-hover:after:scale-95">
            <svg class="absolute  top-1 left-12 stroke-gray-900 w-10 h-10" height="150" preserveAspectRatio="xMidYMid meet" viewBox="0 0 150 150" width="150" x="0" xmlns="http://www.w3.org/2000/svg" y="0">
              <path class="svg-fill-primary" d="M50,18A19.9,19.9,0,0,0,30,38v8a8,8,0,0,0-8,8V74a8,8,0,0,0,8,8H70a8,8,0,0,0,8-8V54a8,8,0,0,0-8-8H38V38a12,12,0,0,1,23.6-3,4,4,0,1,0,7.8-2A20.1,20.1,0,0,0,50,18Z">
              </path>
            </svg>
            <svg class="absolute top-1 left-1 stroke-gray-900  w-10 h-10" height="150" preserveAspectRatio="xMidYMid meet" viewBox="0 0 150 150" width="150" x="0" xmlns="http://www.w3.org/2000/svg" y="0">
              <path d="M30,46V38a20,20,0,0,1,40,0v8a8,8,0,0,1,8,8V74a8,8,0,0,1-8,8H30a8,8,0,0,1-8-8V54A8,8,0,0,1,30,46Zm32-8v8H38V38a12,12,0,0,1,24,0Z" fill-rule="evenodd">
              </path>
            </svg>
          </div>
        </label>


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
          Update Profile
        </Button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
