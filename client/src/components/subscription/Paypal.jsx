// Importing required modules and components
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Link } from "react-router-dom";

// Defining the Paypal component
const Paypal = ({ showPaypalButton, setCheckout, refetch }) => {
  // State to store order details
  const [orderDetails, setOrderDetails] = useState(null);
  // Custom hook to get user information
  const { user } = useAuth();
  // Ref for Paypal button container
  const paypal = useRef();

  // Mutation using react-query to handle subscription creation
  const { mutate } = useMutation({
    mutationFn: async (item) => {
      const result = await axios.post(
        "http://localhost:5000/subscriptions",
        item
      );
      return result.data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        toast.success("Congrats, Purchase completed !!");
      }
    },
  });

  // useEffect to initialize and render Paypal button
  useEffect(() => {
    if (!showPaypalButton) return;

    window.paypal
      .Buttons({
        // Function to create order
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Thank you for purchasing",
                amount: {
                  currency_code: "CAD",
                  value: "10",
                },
              },
            ],
          });
        },
        // Function to handle order approval
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          const orderInfo = {
            orderId: order.id,
            createdTime: order.create_time,
            payerEmail: order.payer.email_address,
            payerName: `${order.payer.name.given_name} ${order.payer.name.surname}`,
            price: `${order.purchase_units[0].amount.value} ${order.purchase_units[0].amount.currency_code}`,
            status: order.status,
            user: user?.displayName,
            userEmail: user?.email,
          };

          setOrderDetails(orderInfo);
          mutate(orderInfo);
        },
        // Function to handle errors
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, [showPaypalButton, setCheckout, user?.displayName, user?.email, mutate]);

  // Function to handle button click
  const handleOnclick = () => {
    setCheckout(false);
    setOrderDetails(null);
    refetch();
  };

  // If Paypal button is not to be shown, return null
  if (!showPaypalButton) return null;

  // JSX for Paypal component
  return (
    <div className="w-full md:w-2/3 xl:w-1/2 relative z-0">
      {/* Display information for new users */}
      {!orderDetails && (
        <div className="text-xl mb-4  mx-auto overflow-x-auto">
          <div className="text-sm md:text-base">
            {/* Payment information */}
            <p className=" text-red-500 font-bold py-2 text-center lg:w-4/5">
              Use the following Information for payment and review the balance
            </p>
            <p>
              <span className="font-bold">Email:</span>{" "}
              sb-wolai30285130@personal.example.com
            </p>
            <p>
              <span className="font-bold">Password:</span> ?^Dgf/B3
            </p>

            {/* Balance checking information */}
            <p className="text-red-500 font-bold pt-3 pb-2 text-center lg:w-4/5">
              To check the balance, open{" "}
              <Link
                to="https://sandbox.paypal.com"
                className="underline"
                target="_blank">
                paypal sandbox{" "}
              </Link>
              in a new browser and use the following Information to login
            </p>
            <p>
              <span className="font-bold">Email:</span>{" "}
              sb-akoa529459416@business.example.com
            </p>
            <p>
              <span className="font-bold">Password:</span> ?^Dgf/53
            </p>
          </div>
          {/* Display order type and amount */}
          <div className="pt-6">
            <h1>
              <span className="font-bold">Order Type:</span> One time purchase
            </h1>
            <p>
              <span className="font-bold">Amount:</span> 10 CAD
            </p>
          </div>
        </div>
      )}
      {/* Paypal button container */}
      <div ref={paypal}></div>

      {/* Display order details */}
      {orderDetails && (
        <div className="text-base w-full mx-auto">
          <h1 className="text-2xl font-bold">Order Information</h1>
          <p>
            <span className="font-bold">Order id :</span>{" "}
            {orderDetails?.orderId}
          </p>
          <p>
            <span className="font-bold">Created at :</span>{" "}
            {orderDetails.createdTime}
          </p>
          <p>
            <span className="font-bold">Payment email :</span>{" "}
            {orderDetails.payerEmail}
          </p>
          <p>
            <span className="font-bold">Payee Name :</span>{" "}
            {orderDetails.payerName}
          </p>
          <p>
            <span className="font-bold">Payment amount :</span>{" "}
            {orderDetails.price}
          </p>
          <p>
            <span className="font-bold">User :</span> {orderDetails.user}
          </p>
          <p>
            <span className="font-bold">Status :</span>{" "}
            <span className="text-green-600">{orderDetails.status}</span>
          </p>
          {/* Button to go back */}
          <button
            onClick={handleOnclick}
            className="btn btn-sm  w-max bg-[#F36527] px-8 md:text-lg text-white normal-case border-[#F36527] hover:text-inherit transition duration-500 ease-in-out hover:bg-transparent hover:border-[#F36527] hover:border-2 mt-4 ">
            Go back
          </button>
        </div>
      )}
    </div>
  );
};

// PropTypes for Paypal component
Paypal.propTypes = {
  showPaypalButton: PropTypes.bool.isRequired,
  setCheckout: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

// Exporting the Paypal component
export default Paypal;
