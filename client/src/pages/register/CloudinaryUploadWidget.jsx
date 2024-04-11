import { useEffect, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import PropTypes from "prop-types";
import cloudinary from "cloudinary-core"; // Import cloudinary library

const CloudinaryUploadWidget = ({ handleImageInfo }) => {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const uwScript = document.getElementById("uw");

    if (typeof window !== "undefined" && !loaded && !uwScript) {
      const script = document.createElement("script");
      script.async = "";
      script.id = "uw";
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.onload = () => setLoaded(true);
      document.body.appendChild(script);
    }
  }, [loaded]);

  const processResults = async (error, result) => {
    if (error) {
      console.log("error", error);
    }
    if (result && result.event === "success") {
      const attachmentURL = await getImageAttachment(result.info.public_id);
      handleImageInfo(attachmentURL);
      // console.log(attachmentURL)
    }
  };

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "dwdxdtvez",
        uploadPreset: "test_preset",
        sources: [
          "local",
          "url",
          "google_drive",
          "unsplash",
          "camera",
          "dropbox",
          "istock",
          "shutterstock",
        ],
        multiple: location.pathname === "/register" ? false : true,
        folder: location.pathname === "/register" ? "users" : "images",
      },
      processResults
    );
  };

  return (
    <div onClick={uploadWidget}>
      {location.pathname !== "/" ? (
        <button
          id="upload_widget"
          className="inline-flex items-center gap-1 rounded-md border border-input rounded-r-none bg-white text-red-600 text-sm p-1 file:border-0 file:bg-blue-600 file:text-white file:text-sm">
          <MdOutlineFileUpload className="text-xl" />{" "}
          <span className="hover:font-bold duration-500">
            Upload Your Image
          </span>
        </button>
      ) : (
        <button className="relative inline-flex items-center justify-center p-4 px-16 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out border-[1px] rounded-full shadow-inner shadow-gray-300  group">
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-tr from-red-900 via-red-800 to-red-500  group-hover:translate-x-0 ease">
            <FaArrowRightLong className="text-2xl" />
          </span>
          <span className="absolute font-semibold flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
            Upload Photo
          </span>
          <span className="relative invisible">Button Text</span>
        </button>
      )}
    </div>
  );
};

CloudinaryUploadWidget.propTypes = {
  handleImageInfo: PropTypes.func,
};

export default CloudinaryUploadWidget;

// Define getImageAttachment function
export const getImageAttachment = async (id) => {
  const cl = cloudinary.Cloudinary.new({ cloud_name: "dwdxdtvez" }); // Initialize Cloudinary
  return await cl.url(id, { flags: "attachment:imgname" });
};
