import axios from "axios";
import { AuthResponse } from "../types/auth";

const API_URL = "http://localhost:5001";

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, { username, password });
  return response.data;
};

export const register = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, { username, password });
  return response.data;
};


