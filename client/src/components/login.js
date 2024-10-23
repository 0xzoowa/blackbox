import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { MyContext } from "../context/myContext";
import axios from "axios";
import { useAlert } from "../context/alertProvider";
import { useGlobalState } from "../context/globalState";

const Login = () => {
  const navigate = useNavigate();
  const {
    login,
    setToken,
    setUser,
    setIsLoggedIn,
    isLoggedIn,
    token,
    user,
    setIsAdmin,
    isAdmin,
  } = useGlobalState();
  const { successAlert, errorAlert } = useAlert();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Login();
  };

  const Login = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      login(response.data.user, response.data.token);
      successAlert("Login successful");
      // successAlert("login successful");
      // setIsLoggedIn(true);
      // setToken(response.data.token);
      // setUser(response.data.user);

      navigate("/blog");
    } catch (error) {
      console.error("Error logging in:", error);
      errorAlert("error logging in");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px-56px)] bg-gray-100 dark:bg-gray-900 ">
      <div className="px-8 py-6 mt-4 text-left bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center text-purple-600 dark:text-purple-400">
          Login
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label
                className="block text-gray-700 dark:text-gray-300"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label
                className="block text-gray-700 dark:text-gray-300"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col items-center mt-6 p-8">
              <button className="w-full px-6 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                Login
              </button>
              {/* <Link
                to="/signup"
                className="mt-4 text-sm text-purple-600 hover:underline"
              >
                Don't have an account? Sign up
              </Link> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
