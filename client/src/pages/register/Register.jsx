// Import necessary dependencies
import videoSource from "../../assets/video.mp4";
import { TbUser } from "react-icons/tb";
import { MdLockOutline } from "react-icons/md";
import { useState } from "react";
import SocialLogin from "../login/SocialLogin";
import LoginButton from "../login/LoginButton";
import { MdOutlineEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
  const [imageInfo, setImageInfo] = useState(null);
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const onSubmit = async (data) => {
    if (imageInfo) {
      const name = data?.name;
      const email = data?.email;
      const password = data?.password;
      const imageUrl = imageInfo;
      // console.log(name, email, password, imageUrl);

      createUser(email, password)
        .then(() => {
          // console.log(res.user);
          updateUserProfile(name, imageUrl).then(() => {
            const userInfo = {
              name: name,
              email: email,
              image: imageUrl,
              role: "user",
            };

            // console.log(userInfo);
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                toast.success("Account created successfully!");
                navigate("/");
              }
            });
          });
        })
        .catch((err) => toast.error(err.message));

      reset();
    }
  };

  const handleImageInfo = (url) => {
    console.log("Received image URL:", url);
    setImageInfo(url);
  };

  return (
    <div className="relative text-white">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full object-cover h-full lg:h-screen">
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60 h-full lg:h-screen"></div>

      {/* Login card */}
      <div className="lg:absolute h-full lg:h-screen inset-0 flex items-center justify-center p-6">
        <div className="relative z-10 flex flex-col items-center w-max lg:w-[460px] mx-auto py-6 border-[2px] backdrop-blur-md backdrop-saturate-200 rounded-3xl ">
          {/* Logo */}
          <Link
            to="/"
            className="relative text-2xl font-bold pb-4 mx-auto hover:scale-110 transition duration-300">
            TODO <span className="text-[#F36527]">APP</span>
          </Link>

          {/* Login Title */}
          <h1 className="text-2xl lg:text-3xl pt-8 pb-2">Create new account</h1>
          <p className="text-sm font-extralight text-gray-300 pb-6 w-4/5 lg:w-3/5 text-center">
            Enhance your experience in world of virtual reality
          </p>

          {/* Form element */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* User name */}
            <div className="relative">
              <span className="absolute top-3 text-xl left-0">
                <TbUser />
              </span>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  placeholder=""
                  className="peer h-full w-full border-b-2 pl-6 border-white bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal  outline outline-0 transition-all der-shown:border-[#F36527] focus:border-[#F36527] focus:outline-0 disabled:border- disabled:bg-blue-red-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                  type="text"
                  {...register("name", { required: true })}
                />
                <label className="after:content[''] pl-6 pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-[#F36527]after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-white peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white  peer-focus:after:border-[#F36527] after:pl-6 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-white peer-focus:after:scale-x-50">
                  Your Name
                </label>
              </div>
            </div>
            {errors.name && (
              <span className="text-[#F36527] text-sm">Name is required</span>
            )}

            {/* Email input */}
            <div className="relative mt-4">
              <span className="absolute top-3 text-xl left-0">
                <MdOutlineEmail />
              </span>
              <input
                className="peer h-full w-full border-b-2 pl-6 border-white bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal  outline outline-0 transition-all der-shown:border-[#F36527] focus:border-[#F36527] focus:outline-0 disabled:border- disabled:bg-blue-red-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                placeholder=""
                type="text"
                {...register("email", { required: true })}
              />
              <label className="after:content[''] pl-6 pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-[#F36527] after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-white peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white  peer-focus:after:border-[#F36527] after:pl-6  peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-white peer-focus:after:scale-x-50">
                Email
              </label>
            </div>
            {errors.email && (
              <span className="text-[#F36527] text-sm">Email is required</span>
            )}

            {/* Password input */}
            <div className="relative mt-4 ">
              <span className="absolute top-3 text-xl left-0">
                <MdLockOutline />
              </span>
              <input
                className="peer h-full w-full border-b-2 pl-6 border-white bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal  outline outline-0 transition-all der-shown:border-[#F36527] focus:border-[#F36527] focus:outline-0 disabled:border- disabled:bg-blue-red-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                placeholder=""
                type="password"
                {...register("password", { required: true })}
              />
              <label className="after:content[''] pl-6 pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-[#F36527] after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-white peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white  peer-focus:after:border-[#F36527] after:pl-6  peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-white peer-focus:after:scale-x-50">
                Password
              </label>
            </div>
            {errors.password && (
              <span className="text-[#F36527] text-sm">
                Password is required <br />
              </span>
            )}

            {/* Image input */}
            <div className="relative w-[252px] lg:w-[320px] mt-6 flex gap-2">
              <CloudinaryUploadWidget handleImageInfo={setImageInfo} />
              {imageInfo && (
                <p className="text-white text-sm font-light">
                  {imageInfo.slice(-10)}
                </p>
              )}
            </div>

            {/* Submit button */}
            <LoginButton buttonText="Register" />
          </form>

          {/* Login with text */}
          <div className="flex items-center pt-4 space-x-2">
            <div className="flex-1 h-px w-14 lg:w-32 bg-white"></div>
            <p className="text-sm ">Login with social accounts</p>
            <div className="flex-1 h-px bg-white"></div>
          </div>

          {/* Social icons */}
          <SocialLogin />

          {/* Sign up text */}
          <p className="text-sm text-center pt-6 gap-2 flex justify-center sm:px-6 ">
            Already has an account?
            <Link
              to="/login"
              className="underline hover:text-[#F36527] font-bold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
