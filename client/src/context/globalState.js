import React, { createContext, useContext, useState, useEffect } from "react";

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [blogPost, setBlogPost] = useState([]);
  const [randomUser, setRandomUser] = useState({ role: "random" });
  const [baseUrl, setBaseUrl] = useState(
    process.env.REACT_APP_API_URL_PRODUCTION
    //process.env.REACT_APP_API_URL_DEVELOPMENT
  );

  // Initial load from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (storedIsLoggedIn) {
      setIsLoggedIn(true);

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
        setIsAdmin(storedUser.role === "chief");
      } // Handle guest user
      else if (storedUser.role === "random") {
        setUser(storedUser);
        setIsAdmin(false);
      }
    }
  }, []);

  // Update localStorage when authentication state changes
  useEffect(() => {
    if (isLoggedIn && token && user.role !== "random") {
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAdmin", isAdmin.toString());
      // console.log("token", token);
      // console.log("isLoggedIn", isLoggedIn);
      // console.log("isAdmin", isAdmin);
    } else if (isLoggedIn && user.role === "random") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("isAdmin", isAdmin.toString());
      localStorage.setItem("user", JSON.stringify(user));
      // console.log("token", token);
      // console.log("isLoggedIn", isLoggedIn);
      // console.log("isAdmin", isAdmin);
      // console.log("user", user);
    } else if (!isLoggedIn) {
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      localStorage.removeItem("isAdmin");
    }
  }, [isLoggedIn, token, user, isAdmin]);

  // Update isAdmin when user changes
  useEffect(() => {
    if (user?.role === "chief") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setIsLoggedIn(true);
  };

  const guestLogin = () => {
    setUser(randomUser);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setToken("");
    setIsAdmin(false);
  };

  return (
    <GlobalStateContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        token,
        setToken,
        isAdmin,
        setIsAdmin,
        blogPost,
        setBlogPost,
        login,
        logout,
        guestLogin,
        baseUrl,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
