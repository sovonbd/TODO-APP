import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigation } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import SkeletonUser from "./SkeletonUser";
import ChatUser from "./ChatUser";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import userHead from "../../../assets/user-head.png";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const ChatApp = () => {
  const { user, logOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState([]);
  const navigation = useNavigation();
  const [isShowProfile, setShowProfile] = useState(false);
  const axiosPublic = useAxiosPublic();

  const fetchData = () => {
    axiosPublic.get("/users").then(({ data }) => {
      const filterData = data.filter((singledata) => {
        return user?.email !== singledata.email;
      });
      setDatas(filterData);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const serachUser = (searchTxt) => {
    axiosPublic.get(`/users/${searchTxt}`).then(({ data }) => {
      const filterData = data.filter((singledata) => {
        return user.email !== singledata.email;
      });
      setDatas(filterData);
    });
  };

  const onSearch = (e) => {
    const txt = e.target.value;
    if (txt) {
      serachUser(txt);
    } else {
      fetchData();
    }
  };

  return (
    <div className="w-full mx-auto relative z-0 py-5">
      <div className="md:grid grid-cols-1 md:grid-cols-5 lg:grid-cols-4 hidden">
        {/* large device handle */}
        <div className="lg:col-span-1 md:col-span-2 users-scroll overflow-y-auto px-1 shadow-xl border-r ">
          <div className="flex items-center justify-between gap-x-3 p-4 sticky top-0 bg-[#F36527] z-50">
            <div className="relative">
              <div
                className="w-12 h-12 avatar online cursor-pointer"
                onClick={() => setShowProfile(!isShowProfile)}>
                <img
                  className="h-12 w-12 rounded-full"
                  src={
                    user?.photoURL !== null
                      ? `${user?.photoURL}`
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"
                  }
                  alt="img"
                />
              </div>

              <div
                className={`w-[250px] bg-[#F36527] absolute left-0 z-50 rounded shadow-md shadow-[#121C22]  duration-300 ${
                  isShowProfile ? "top-12 h-auto" : "top-16 h-0 overflow-hidden"
                }`}>
                <div className="p-3">
                  <div className="flex flex-row flex-shrink items-center gap-x-2 text-base font-medium whitespace-nowrap border-b border-gray-700 pb-2">
                    <div className="avatar z-40">
                      <div className="w-10 h-10 rounded-full z-40">
                        <img
                          className="z-40"
                          src={
                            user?.photoURL !== null
                              ? `${user?.photoURL}`
                              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"
                          }
                          alt="img"
                        />
                      </div>
                    </div>

                    <span className="truncate">
                      <h3 className="text-white text-base truncate">
                        {user?.displayName}
                      </h3>
                      <p className="truncate text-white text-sm">
                        {user?.email}
                      </p>
                    </span>
                  </div>

                  <Link
                    to="/"
                    className="flex items-center gap-x-2 p-2 relative group cursor-pointer">
                    <FaRegUser className="text-white font-bold z-30"></FaRegUser>
                    <p className="z-30 text-base text-white">Profile</p>
                    <span className="absolute bg-primaryColor top-0 left-0 h-[40px] w-0 z-20 group-hover:w-full duration-200 rounded"></span>
                  </Link>

                  <Link
                    to="/"
                    className="flex items-center gap-x-2 p-2 relative group cursor-pointer"
                    onClick={logOut}>
                    <MdLogout className="text-white z-30 font-bold"></MdLogout>
                    <p className="z-30 text-white">SignOut</p>
                    <span className="absolute bg-primaryColor top-0 left-0 h-[40px] w-0 z-20 group-hover:w-full duration-200 rounded"></span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <IoSearchOutline className="text-gray-500 text-2xl"></IoSearchOutline>
              </span>

              <input
                onChange={onSearch}
                type="search"
                name="q"
                className="py-2 text-sm text-black bg-white rounded-md pl-10 pr-2 focus:outline-none w-full"
                placeholder="Search..."
                autoComplete="off"
              />
            </div>
          </div>

          {/* <img
            className="h-32 mx-auto -mt-2"
            src={}
            alt="chat photo"
          /> */}
          <div className="border-t border-t-gray-700 rounded-b-2xl">
            {loading ? (
              <div className="px-3 mt-5">
                <SkeletonUser></SkeletonUser>
              </div>
            ) : (
              <div>
                {user?.email === "admin@admin.com" ? (
                  <div>
                    {datas.map((data) => {
                      return (
                        <div key={data._id} className="flex flex-col gap-y-10">
                          <ChatUser data={data}></ChatUser>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  datas
                    .filter((item) => item.role === "admin")
                    .map((item) => (
                      <div key={item._id} className="flex flex-col gap-y-10">
                        <ChatUser data={item}></ChatUser>
                      </div>
                    ))
                )}
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-3 lg:col-span-3]">
          {navigation.state === "loading" ? (
            <div className="min-h-[90vh] flex justify-center items-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <Outlet></Outlet>
          )}
        </div>
      </div>

      {/* mobile device handle */}
      <div className="md:hidden">
        <div className=" lg:col-span-1 bg-white h-screen users-scroll overflow-y-auto px-1 shadow-xl">
          <div className="flex items-center justify-between gap-x-3 p-4 sticky z-50 top-0 bg-[#F36527]">
            <div className="relative">
              <div
                className="w-12 h-12 avatar online cursor-pointer"
                onClick={() => setShowProfile(!isShowProfile)}>
                <img
                  className="h-12 w-12 rounded-full"
                  src={
                    user?.photoURL !== null
                      ? `${user?.photoURL}`
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"
                  }
                  alt="img"
                />
              </div>

              <div
                className={`w-[270px] bg-[#F36527] absolute left-0 z-50 rounded shadow-md shadow-[#121C22]  duration-300 ${
                  isShowProfile ? "top-12 h-auto" : "top-16 h-0 overflow-hidden"
                }`}>
                <div className="p-3">
                  <div className="flex flex-row flex-shrink items-center gap-1 text-base font-medium whitespace-nowrap border-b border-white pb-2">
                    <div className="avatar z-40">
                      <div className="w-10 h-10 rounded-full z-40">
                        <img
                          className="z-40"
                          src={
                            user?.photoURL !== null
                              ? `${user?.photoURL}`
                              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"
                          }
                          alt="img"
                        />
                      </div>
                    </div>

                    <span className="truncate">
                      <h3 className="truncate text-white text-base">
                        {user?.displayName}
                      </h3>
                      <p className="truncate text-white text-sm">
                        {user?.email}
                      </p>
                    </span>
                  </div>

                  <Link
                    to="/profile"
                    className="flex items-center gap-x-2 p-2 relative group cursor-pointer">
                    <FaRegUser className="text-white z-30 font-bold"></FaRegUser>
                    <p className="z-30 text-white">Profile</p>
                    <span className="absolute bg-[#1B262C] top-0 left-0 h-[40px] w-0 z-20 group-hover:w-full duration-200 rounded"></span>
                  </Link>

                  <Link
                    to="/"
                    className="flex items-center gap-x-2 p-2 relative group cursor-pointer"
                    onClick={logOut}>
                    <MdLogout className="text-white z-30 font-bold"></MdLogout>
                    <p className="z-30 text-white">SignOut</p>
                    <span className="absolute bg-[#1B262C] top-0 left-0 h-[40px] w-0 z-20 group-hover:w-full duration-200 rounded"></span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <IoSearchOutline className="text-gray-500 text-2xl"></IoSearchOutline>
              </span>

              <input
                onChange={onSearch}
                type="search"
                name="q"
                className="py-2 text-sm  bg-white rounded-md pl-10 pr-2 focus:outline-none w-full"
                placeholder="Search..."
                autoComplete="off"
              />
            </div>
          </div>

          {/* <img
            className="h-32 mx-auto -mt-2"
            src={chatPhoto}
            alt="chat photo"
          /> */}
          <div className="border-t border-t-gray-300 rounded-b-2xl">
            {loading ? (
              <div className="space-y-5 px-3 mt-5">
                <SkeletonUser></SkeletonUser>
              </div>
            ) : (
              <div>
                {datas.map((data) => {
                  return (
                    <div key={data._id} className="flex flex-col gap-y-10">
                      <NavLink
                        to={`/mchat/${data._id}`}
                        className={({ isActive }) =>
                          isActive
                            ? "flex flex-row gap-x-2 items-center px-3 py-2 shadow-lg bg-primaryColor text-white  duration-100 cursor-pointer rounded-md hover:bg-primaryColor my-1"
                            : "flex flex-row gap-x-2 items-center px-3 py-2 border-b border-b-gray-300 hover:text-white duration-100 cursor-pointer rounded-md hover:bg-primaryColor my-1"
                        }>
                        <div className="avatar z-0">
                          <div className="w-10 h-10 rounded-full z-0">
                            <img
                              className="z-0"
                              src={
                                (data?.photoUrl && `${data.photoUrl}`) ||
                                userHead
                              }
                              alt="img"
                            />
                          </div>
                        </div>
                        <h2 className="text-lg font-medium truncate">
                          {data.name}
                        </h2>
                      </NavLink>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
