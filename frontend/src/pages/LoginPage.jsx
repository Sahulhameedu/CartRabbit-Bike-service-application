import React from "react";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const LOGIN_URL = "/auth/login";

// Login page 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, role } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const data = JSON.stringify({
        email: email,
        password: password,
      });
      await login(LOGIN_URL, data);
      role === "customer" ? navigate("customer") : navigate("owner");
      setError("");
    } catch (e) {
      console.log(e);

      setError("Failed to log in. Please try again.");
    }
  };

  return (
    <section>
      <h3 className="text-black">Login</h3>
      {error && <p className="text-red-500">{error}</p>}
      <form className="flex flex-col text-center gap-1" onSubmit={handleSubmit}>
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          className="text-black"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <label htmlFor="password">Password :</label>
        <input
          type="password"
          id="password"
          className="text-black"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button type="submit" className="bg-slate-950 px-3 py-2 text-white">
          Submit
        </button>
      </form>
      <Link to="register" className="underline text-xs">
        Go to Register
      </Link>
    </section>
  );
};

export default LoginPage;
