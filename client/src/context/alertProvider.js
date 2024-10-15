import React, { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create a Context for the Alert system
const AlertContext = createContext();

// Custom AlertProvider component to wrap the entire app
export const AlertProvider = ({ children }) => {
  // Success alert function
  const successAlert = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      progressStyle: {
        backgroundColor: "purple",
      },
    });
  };

  // Error alert function
  const errorAlert = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      progressStyle: {
        backgroundColor: "purple",
      },
    });
  };

  return (
    <AlertContext.Provider value={{ successAlert, errorAlert }}>
      {/* ToastContainer to display the alerts */}
      <ToastContainer />
      {children}
    </AlertContext.Provider>
  );
};

// Custom hook to use the AlertContext in any component
export const useAlert = () => {
  return useContext(AlertContext);
};
