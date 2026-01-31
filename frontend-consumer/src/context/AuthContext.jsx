import { createContext, useState, } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // FIX: Check localStorage immediately during initialization (Lazy Init)
  // This prevents the "double render" warning you saw.
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Login Action
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout Action
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;