import { useState, useEffect } from "react";
import { login, register } from "../api/auth";
import { useNavigate } from "react-router-dom";

interface AuthState {
  user: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = (): AuthState => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser("Authenticated User"); 
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      const data = await login(username, password); 
      localStorage.setItem("token", data.token); 
      setUser(username); 
      setIsAuthenticated(true);
      navigate("/tasks");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleRegister = async (username: string, password: string) => {
    try {
      await register(username, password); 
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setUser(null); 
    setIsAuthenticated(false); 
    navigate("/login"); 
  };

  return {
    user,
    isAuthenticated,
    loading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
};
