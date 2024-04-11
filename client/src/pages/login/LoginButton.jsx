import { useEffect, useState } from "react";
import "./LoginButton.css"; // Import your CSS file
import PropTypes from "prop-types";

const LoginButton = ({ buttonText }) => {
  const [isBouncing, setIsBouncing] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const isHovered = false;

  const handleClick = () => {
    // Start the bounce animation by setting isBouncing to true
    setIsBouncing(true);

    // Stop the bounce animation after a certain duration
    setTimeout(() => {
      setIsBouncing(false);
    }, 500); // Adjust the duration of the bounce effect

    // Toggle the clicked state
    setIsClicked(true);
  };

  useEffect(() => {
    // Reset the isClicked state after a certain duration
    if (isClicked) {
      const timeout = setTimeout(() => {
        setIsClicked(false);
      }, 500); // Adjust the duration to return to the initial state
      return () => clearTimeout(timeout);
    }
  }, [isClicked]);
  return (
    <div>
      <button
        type="submit"
        className={`py-2 px-5 mb-4 mt-6 shadow-lg before:block before:-left-1 before:-top-1 before:bg-white before:absolute before:h-0 before:w-0 before:hover:w-[100%] before:hover:h-[100%] before:duration-500 before:-z-40 after:block after:-right-1 after:-bottom-1 after:bg-white after:absolute after:h-0 after:w-0 after:hover:w-[100%] after:hover:h-[100%] after:duration-500 after:-z-40 bg-white relative inline-block text-[#F36527] font-bold hover:text-white hover:bg-[#F36527] w-[248px] lg:w-[320px] login-button ${
          isBouncing ? "bounce" : ""
        }`}
        onClick={handleClick}>
        <span
          className={`${isHovered ? "text-white" : ""} ${
            isClicked ? "text-[#F36527]" : ""
          }`}>
          {buttonText}
        </span>
      </button>
    </div>
  );
};

LoginButton.propTypes = {
  buttonText: PropTypes.string,
};

export default LoginButton;
