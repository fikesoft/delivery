import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user?: {
    username: string;
    
  };
}

interface AuthContextProps {
  auth: AuthState;
  login: (userData: { username: string; isAdmin: boolean }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    isAdmin: false,
  });

  const login = (userData: { username: string; isAdmin: boolean }) => {
    setAuth({
      isAuthenticated: true,
      isAdmin: userData.isAdmin,
      user: { username: userData.username },
    });
    // You might want to also store a token in localStorage here
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, isAdmin: false });
    localStorage.clear()
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
