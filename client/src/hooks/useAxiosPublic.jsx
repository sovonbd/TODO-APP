// import { Axios } from "axios";

import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://ec2-18-227-81-244.us-east-2.compute.amazonaws.com:5000",
  // baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
