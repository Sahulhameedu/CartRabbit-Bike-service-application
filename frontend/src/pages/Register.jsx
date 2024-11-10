import React from "react";
import { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import api from "../api";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const REGISTER_URL = "/auth/register";

// registration page

const RegisterPage = () => {
  const { register, token } = useAuth();
  const [name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !email || !role || !number || !password) {
      setError("All fields are required.");
      return;
    }

    if (!["owner", "customer"].includes(role)) {
      setError("Role must be 'owner' or 'customer'.");
      return;
    }

    try {
      const data = JSON.stringify({
        name: name,
        email: email,
        role: role,
        phone: number,
        password: password,
      });
      
      await register(REGISTER_URL, data);
      navigate("/");
      setError("");
    } catch (e) {
      console.log(e);

      setError("Failed to log in. Please try again.");
    }
  };

  return (
    <section>
      <h3 className="text-black">Register</h3>
      {error && <p className="text-red-500">{error}</p>}
      <form className="flex flex-col text-center gap-1" onSubmit={handleSubmit}>
        <label htmlFor="username">Username :</label>
        <input
          type="text"
          id="username"
          className="text-black"
          autoComplete="off"
          onChange={(e) => setUserName(e.target.value)}
          value={name}
          required
        />

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

        <label htmlFor="phone">Phone number :</label>
        <input
          type="number"
          id="phone"
          className="text-black"
          autoComplete="off"
          onChange={(e) => setNumber(e.target.value)}
          value={number}
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

        <label htmlFor="role">Role :</label>
        <select
          id="role"
          className="text-black"
          onChange={(e) => setRole(e.target.value)}
          value={role}
          required
        >
          <option value="">Select Role</option>
          <option value="owner">Owner</option>
          <option value="customer">Customer</option>
        </select>

        <button type="submit" className="bg-slate-950 px-3 py-2 text-white">
          Submit
        </button>
      </form>
      <Link to="/" className="underline text-xs">
        Go to Login
      </Link>
    </section>
  );
};

export default RegisterPage;
