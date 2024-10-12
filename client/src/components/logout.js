import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/myContext";
const LogOut = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(MyContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(MyContext);
  const { token, setToken } = useContext(MyContext);
  const { isAdmin, setIsAdmin } = useContext(MyContext);

  useEffect(() => {
    setIsLoggedIn(false);
    setUser({});
    setIsAdmin(false);
    setToken("");
  }, []);

  navigate("/");
  return <></>;
};

export default LogOut;
