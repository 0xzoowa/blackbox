import React, { createContext, useContext, useState, useEffect } from "react";

const GlobalStateContext = createContext();
/**
 * potential problems
 * upon refresh token is removed
 * hence when you make a request to server reponse is unauthorized
 * work on proper global state
 */
export const GlobalStateProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [blogPost, setBlogPost] = useState([]);
  // const [t, setT] = useState("");
  // const [a, setA] = useState(false);
  // const [i, setI] = useState(false);
  const gt = localStorage.getItem("token");

  useEffect(() => {
    if (user && user.role === "chief") {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
      console.log("blog post from global", blogPost);
      // console.log("token global", token);
      // console.log("token ", gt);
    } else {
      setIsAdmin(false);
      localStorage.setItem("isAdmin", "false");
    }
  }, [user, token, isAdmin, isLoggedIn, blogPost, setBlogPost]);

  useEffect(() => {
    // Store auth data in localStorage
    setToken(localStorage.getItem("token"));

    setIsAdmin(localStorage.getItem("isAdmin"));
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  }, []);

  const logout = () => {
    setIsLoggedIn(false);
    setUser({});
    setToken("");
    setIsAdmin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isLoggedIn");
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
        logout,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
