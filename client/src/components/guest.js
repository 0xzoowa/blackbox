import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../context/globalState";
import { useAlert } from "../context/alertProvider";

const Guest = () => {
  const navigate = useNavigate();
  const { guestLogin, isLoggedIn } = useGlobalState();
  const { successAlert } = useAlert();

  useEffect(() => {
    if (isLoggedIn) {
      successAlert("you're already logged in");
    } else {
      guestLogin();
      successAlert("Logged in as guest");
    }
    navigate("/blog");
  }, []);

  return null;
};

export default Guest;
