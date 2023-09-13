import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivateRoutes(props) {
  const { Component } = props;

  const navigate = useNavigate();

  useEffect(() => {
    let login = localStorage.getItem("token");
    console.log(login);
    if (!login) {
      navigate("/sign-in");
    }
  });
  return (
    <div>
      <Component />
    </div>
  );
}
