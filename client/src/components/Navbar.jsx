import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const username = localStorage.getItem("username");

    if (accessToken && username) {
      setAuth({
        ...auth,
        isAuth: true,
        username: username,
        accessToken: accessToken,
      });
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("refreshAccessToken");

    fetch("http://localhost:8080/users/logout", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + auth.accessToken,
      },
    })
      .then((respose) => respose.json())
      .then((responseData) => {
        console.log(responseData);
        setAuth({
          ...auth,
          isAuth: false,
          username: "",
          accessToken: "",
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <NavLink to={"/"}>Home</NavLink>
        {!auth.isAuth ? (
          <>
            <NavLink to={"/login"}>Login</NavLink>
            <NavLink to={"/signup"}>Signup</NavLink>
          </>
        ) : (
          ""
        )}
      </div>

      {auth.isAuth ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <p>{auth.username.toUpperCase()}</p>{" "}
          <button onClick={logoutUser}>logout</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export { Navbar };
