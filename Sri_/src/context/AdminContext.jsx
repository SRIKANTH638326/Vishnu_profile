import React, { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("isAdmin") === "true";
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const login = (newToken) => {
    setIsAdmin(true);
    setToken(newToken);
    localStorage.setItem("isAdmin", "true");
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setIsAdmin(false);
    setToken(null);
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
  };

  return (
    <AdminContext.Provider value={{ isAdmin, token, setIsAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
