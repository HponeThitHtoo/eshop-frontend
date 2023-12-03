import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "../components/Login/Login.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("user login useEffect", isAuthenticated);
    if (isAuthenticated === true) navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
