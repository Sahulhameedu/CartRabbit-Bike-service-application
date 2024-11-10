import { createContext, useState, useEffect } from "react";
import api from "../api";

//Create context for auth

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [token, setToken] = useState(localStorage.getItem("jwtToken") || null);

  const register = async (url, credentials) => {
    try {
      const response = await api.post(url, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (e) {
      throw `error : ${e}`;
    }
  };

  const login = async (url, credentials) => {
    try {
      const response = await api.post(url, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.data;
      if (data.token) {
        localStorage.setItem("jwtToken", data.token);
        localStorage.setItem("role", data.role); // Store role in localStorage
        setToken(data.token);
        setRole(data.role);
      }
    } catch (e) {
      throw `error : ${e}`;
    }
  };

  const logout = () => {
    setRole(null);
    setToken(null);
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("role"); // Clear role from storage
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    const storedRole = localStorage.getItem("role");
    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ role, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

