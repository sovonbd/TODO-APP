import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import facebookpng from "../../assets/facebook-96.png";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
  const { googleSignIn, githubSignIn, facebookSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const from = location.state?.from?.pathname || "/";
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        // console.log(res.user);
        const userInfo = {
          email: res.user?.email,
          name: res.user?.displayName,
          image: res.user?.photoURL,
        };
        // console.log(userInfo);
        axiosPublic.post("/users", userInfo).then(() => {
          // console.log(res.data);
        });
        toast.success("Successfully Logged in!");

        navigate(from, { replace: true });
      })
      .catch((err) => console.log(err));
  };

  const handleFacebookSignIn = async () => {
    await facebookSignIn()
      .then((res) => {
        // console.log(res.user);
        const userInfo = {
          email: res.user?.email,
          name: res.user?.displayName,
          image: res.user?.photoURL,
        };
        // console.log(userInfo);
        axiosPublic.post("/users", userInfo).then(() => {
          // console.log(res.data);
        });
        toast.success("Successfully Logged in!");

        navigate(from, { replace: true });
      })
      .catch((err) => console.log(err));
  };

  const handleGithubSignIn = () => {
    githubSignIn()
      .then((res) => {
        // console.log(res.user);
        const userInfo = {
          email: res.user?.email,
          name: res.user?.displayName,
          image: res.user?.photoURL,
        };
        // console.log(userInfo);
        axiosPublic.post("/users", userInfo).then(() => {
          // console.log(res.data);
        });
        toast.success("Successfully Logged in!");

        navigate(from, { replace: true });
      })
      .catch((err) => console.log(err));
  };

  const [googleHovered, setGoogleHovered] = useState(false);
  const [facebookHovered, setFacebookHovered] = useState(false);

  const handleGoogleMouseEnter = () => {
    setGoogleHovered(true);
  };

  const handleGoogleMouseLeave = () => {
    setGoogleHovered(false);
  };

  const handleFacebookMouseEnter = () => {
    setFacebookHovered(true);
  };

  const handleFacebookMouseLeave = () => {
    setFacebookHovered(false);
  };

  return (
    <div className="flex gap-8 justify-center pt-6 text-2xl text-white w-full">
      <button
        onClick={handleGoogleSignIn}
        className="icon-container"
        onMouseEnter={handleGoogleMouseEnter}
        onMouseLeave={handleGoogleMouseLeave}>
        {googleHovered ? (
          <FcGoogle className="hover:scale-[1.7] transition duration-500" />
        ) : (
          <FaGoogle />
        )}
      </button>
      <button
        onMouseEnter={handleFacebookMouseEnter}
        onMouseLeave={handleFacebookMouseLeave}
        onClick={handleFacebookSignIn}>
        {facebookHovered ? (
          <img
            src={facebookpng}
            className="w-6 hover:scale-[2] transition duration-500"></img>
        ) : (
          <FaFacebook />
        )}
      </button>

      <FaGithub
        onClick={handleGithubSignIn}
        className=" hover:scale-150 text-center cursor-pointer transition duration-300"
      />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default SocialLogin;
