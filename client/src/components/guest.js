import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/myContext";
const Guest = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(MyContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(MyContext);

  useEffect(() => {
    setIsLoggedIn(true);
    setUser("random_user");
  }, []);

  navigate("/blog");
  return <></>;
};

export default Guest;
