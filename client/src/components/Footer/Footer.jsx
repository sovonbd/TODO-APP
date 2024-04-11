// Importing required modules and components from react and react-icons
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaTwitter } from "react-icons/fa";

// Defining the Footer component
const Footer = () => {
  return (
    // Wrapper div with margin-top
    <div className="mt-64">
      {/* Footer section */}
      <footer className="footer footer-center gap-3 p-10 bg-[#F36527] text-primary-content">
        {/* Sidebar section */}
        <aside>
          {/* Link to homepage */}
          <Link to="/" className="text-xl font-bold text-white">
            TODO
          </Link>
          {/* Company name and description */}
          <p className="font-bold text-white">
            TODO Technologies Inc. <br />
            Providing the services since 2000
          </p>
          {/* Copyright information */}
          <p className="text-white">Copyright © 2023 - All right reserved</p>
        </aside>
        {/* Navigation section */}
        <nav>
          {/* Social media icons with links */}
          <div className="grid grid-flow-col gap-4 text-2xl text-white">
            {/* Facebook icon */}
            <a href="https://www.facebook.com/">
              <FaFacebookF className="hover:scale-125 hover:duration-300"></FaFacebookF>
            </a>
            {/* YouTube icon */}
            <a href="https://www.youtube.com/">
              <FaYoutube className="hover:scale-125 hover:duration-300"></FaYoutube>
            </a>
            {/* Twitter icon */}
            <a href="https://twitter.com/?lang=en">
              <FaTwitter className="hover:scale-125 hover:duration-300"></FaTwitter>
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

// Exporting the Footer component
export default Footer;
