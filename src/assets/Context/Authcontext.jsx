import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserid] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem('_id');

    if (token) {
        setIsLoggedIn(true);
        setUserRole(role);
        setUserid(userId);
      }
    
    
  }, []);

  const login = (role, userId) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserid(userId);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem('_id');
    setIsLoggedIn(false);
    setUserRole(null);
    setUserid(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}