import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/myContext";
import { useGlobalState } from "../context/globalState";
const Guest = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useGlobalState();

  useEffect(() => {
    setIsLoggedIn(true);
    setUser("random_user");
  }, []);

  navigate("/blog");
  return <></>;
};

export default Guest;
