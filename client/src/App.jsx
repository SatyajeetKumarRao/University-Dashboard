import "./App.css";

import { NavBar } from "../src/components/Navbar";
import { AllRoutes } from "../src/routes/AllRoutes";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth.isAuth) {
      const accessToken = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");
      const email = localStorage.getItem("email");
      const role = localStorage.getItem("role");

      if (accessToken && userId && email) {
        setAuth({
          isAuth: true,
          userId: userId,
          email: email,
          accessToken: accessToken,
          role: role,
        });
      }
    }
  }, []);

  return (
    <>
      <NavBar />
      <AllRoutes />
    </>
  );
}

export default App;
