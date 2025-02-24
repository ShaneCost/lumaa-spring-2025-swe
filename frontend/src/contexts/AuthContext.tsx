import React, { createContext, useState, useEffect } from "react";

interface AuthContextProps {
  user: string | null;
  setUser: (user: string | null) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user"));

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
