// Import necessary dependencies
import videoSource from "../../assets/video.mp4";
import { Link, useNavigate } from "react-router-dom";
import { TbUser } from "react-icons/tb";
import { MdLockOutline } from "react-icons/md";
import LoginButton from "./LoginButton";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

// Define the Login component
const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;

    signIn(email, password)
      .then((res) => {
        // console.log(res.user);
        toast.success(`Welcome back ${res.user.displayName}!`);
        navigate("/");
        reset();
      })
      .catch((err) => toast.error(err.message));
  };

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
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
        <div className="relative z-10 flex flex-col items-center w-max lg:w-[460px] mx-auto py-10 border-[2px] backdrop-blur-md backdrop-saturate-200 rounded-3xl ">
          {/* Logo */}
          <Link
            to="/"
            className="relative text-2xl font-bold pb-4 mx-auto hover:scale-110 transition duration-300">
            TODO <span className="text-[#F36527]">APP</span>
          </Link>

          {/* Login Title */}
          <h1 className="text-2xl lg:text-3xl pt-8 pb-4">Welcome Back!</h1>
          <p className="text font-extralight text-white pb-6 w-4/5 lg:w-3/5 text-center">
            Please login to continue with us
          </p>

          {/* Form element */}
          <form onSubmit={handleSubmit(onSubmit)} className="px-5 lg:p-0">
            {/* Email input */}
            <div className="relative mt-4">
              <span className="absolute top-3 text-xl left-0">
                <TbUser />
              </span>
              <input
                className="peer h-full w-full border-b-2 pl-6 border-white bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal  outline outline-0 transition-all der-shown:border-[#F36527] focus:border-[#F36527] focus:outline-0 disabled:border- disabled:bg-blue-red-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                placeholder=""
                type="text"
                {...register("email", { required: true })}
              />
              <label className="after:content[''] pl-6 pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-[#F36527] after:transition-transform after:duration-500 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-white peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white  peer-focus:after:border-[#F36527] after:pl-6  peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-white peer-focus:after:scale-x-50">
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

            {/* Remember & Forgot Password option */}
            <div className="flex justify-center lg:justify-between w-full lg:w-80 pt-6">
              <label className="flex items-center cursor-pointer">
                <span className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={rememberMe}
                    onChange={handleCheckboxChange}
                  />
                  <span className="block bg-white border-2  w-4 h-4 rounded-sm focus:ring-2 focus:ring-[#F36527] ring-offset-0"></span>
                  {rememberMe && (
                    <FaCheck className="absolute left-0 top-0 ml-0.5 mt-0.5 w-3 h-3 fill-current text-[#F36527] pointer-events-none font-bold" />
                  )}
                </span>
                <span className="ml-2 text-sm text-white">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-white text-sm hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Submit button */}
            <LoginButton buttonText="Login" />
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
            Don&apos;t have an account?
            <Link
              to="/register"
              className="underline hover:text-[#F36527] font-bold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Export the Login component
export default Login;
