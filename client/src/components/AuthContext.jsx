import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [loginState, setLoginState] = useState({
    isLogedIn: false,
    token: null,
  });
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);

  const login = token => {
    setLoginState({ isLogedIn: true, token });
    setCookie("token", token, { path: "/" });
  };

  const logout = () => {
    setLoginState({ isLogedIn: false, token: null });
    removeCookie("token", { path: "/" });
  };

  useEffect(() => {
    const token = cookie.token;
    if (token) {
      setLoginState({ isLogedIn: true, token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loginState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
