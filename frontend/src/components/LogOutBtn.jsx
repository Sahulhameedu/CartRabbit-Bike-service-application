import React from "react";

// Reusable logout button

import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

function LogOutBtn() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
        className="bg-red-700 px-2 py-1 rounded-md"
      >
        Logout
      </button>
    </>
  );
}

export default LogOutBtn;
