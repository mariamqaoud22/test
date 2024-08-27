import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export default function AuthContext({ children }) {
  const [token, setToken] = useState(localStorage.getItem("tkn"));

  useEffect(() => {
    const userToken = localStorage.getItem("tkn");
    if (userToken != null) {
      setToken(userToken);
    }
  }, []);
  //  console.log(token);

  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
}
