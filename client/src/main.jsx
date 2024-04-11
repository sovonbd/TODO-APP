import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AuthProvider from "./provider/AuthProvider";
import Dashboard from "./pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AboutUs from "./pages/aboutUs/AboutUs";
import ChatApp from "./pages/customerService/chat/ChatApp";
import ChatBox from "./pages/customerService/chat/ChatBox";
import axios from "axios";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "aboutus",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/chat",
        element: (
          <PrivateRoute>
            <ChatApp />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/chat/:id",
            loader: ({ params }) =>
              axios.get(`http://localhost:5000/user/${params.id}`),
            element: (
              <PrivateRoute>
                <ChatBox></ChatBox>
              </PrivateRoute>
            ),
          },
        ],
      },

      // mobile device handle rout
      {
        path: "/mchat/:id",
        loader: ({ params }) =>
          axios.get(`http://localhost:5000/user/${params.id}`),
        element: (
          <PrivateRoute>
            <ChatBox></ChatBox>
          </PrivateRoute>
        ),
      },

      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </QueryClientProvider>
);
