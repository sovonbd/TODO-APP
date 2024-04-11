// Importing required modules and components
import { useState } from "react";
import Paypal from "./Paypal";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Todo from "../Todo/Todo";

// Defining the Subscription component
const Subscription = () => {
  // State to manage checkout status
  const [checkout, setCheckout] = useState(false);
  // Custom hook to get user information
  const { user } = useAuth();

  // Query to fetch subscription data
  const {
    data: subscription,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const result = await axios.get(
        `http://localhost:5000/subscriptions/${user?.email}`
      );
      return result.data;
    },
  });

  // If data is loading, display a loading indicator
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-dots loading-lg text-[#F36527] text-xl"></span>
      </div>
    );
  }

  // Function to handle selecting a plan
  const handleSelectPlan = () => {
    setCheckout(true);
  };

  // JSX for Subscription component
  return (
    <div>
      {/* Display payment prompt if subscription status is not completed */}
      {subscription?.status !== "COMPLETED" ? (
        <div
          className={`flex flex-col justify-center items-center gap-2 h-[50vh] ${
            checkout ? "hidden" : "flex"
          }`}>
          <p className="text-center">
            Before using the service please pay the one-time fee
          </p>
          {/* Button to initiate payment */}
          <button
            onClick={handleSelectPlan}
            className="btn btn-circle w-max bg-[#F36527] px-8 md:text-lg text-white normal-case border-[#F36527] hover:text-inherit transition duration-500 ease-in-out hover:bg-transparent hover:border-[#F36527] hover:border-2 mt-4 ">
            Pay Now $10
          </button>
        </div>
      ) : (
        // If subscription status is completed, display Todo component
        <Todo />
      )}

      {/* Display Paypal component for checkout */}
      {checkout && (
        <div className="flex justify-center items-start w-full py-10">
          <Paypal
            showPaypalButton={checkout}
            setCheckout={setCheckout}
            refetch={refetch}
          />
        </div>
      )}
    </div>
  );
};

// Exporting the Subscription component
export default Subscription;
