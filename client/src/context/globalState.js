import React, { createContext, useContext, useState, useEffect } from "react";

const GlobalStateContext = createContext();
/**
 * upon login all variables isadmin, isloggedin and token are falsey.
 * upon page reload they become true
 * upon reload again they go back to false and then im logged out
 *
 */
export const GlobalStateProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [blogPost, setBlogPost] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedIsAdmin = localStorage.getItem("isAdmin") === "true";
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    console.log("storedIsAdmin", storedIsAdmin);
    console.log("storedIsLoggedIn", storedIsLoggedIn);
    console.log("storedToken", storedToken);

    if (storedToken) setToken(storedToken);
    if (storedIsAdmin) setIsAdmin(storedIsAdmin);
    if (storedIsLoggedIn) setIsLoggedIn(storedIsLoggedIn);
  }, []);

  useEffect(() => {
    console.log("blog post from global", blogPost);
  }, [blogPost, setBlogPost]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("token", token);

    if (user && user.role === "chief") {
      setIsAdmin(true);
      console.log("admin from if  block", isAdmin);
      localStorage.setItem("isAdmin", isAdmin);
    } else {
      setIsAdmin(false);
      localStorage.setItem("isAdmin", isAdmin);
    }
  }, [user, isAdmin]);

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
