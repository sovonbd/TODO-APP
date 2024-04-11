import { Outlet, useLocation } from "react-router-dom";
import Navmenu from "../components/Navmenu/Navmenu";
import Footer from "../components/Footer/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  const location = useLocation();
  return (
    <div>
      {location.pathname === "/login" || location.pathname === "/register" ? (
        <div>
          <Outlet></Outlet>
        </div>
      ) : (
        <div className="w-11/12 mx-auto">
          <Navmenu></Navmenu>
          <Outlet></Outlet>
          <Footer></Footer>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default MainLayout;
