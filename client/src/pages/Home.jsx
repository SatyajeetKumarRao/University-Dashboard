import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <div>
      <h2>Home Page</h2>

      {auth.isAuth ? (
        <button
          onClick={() => {
            navigate("/users");
          }}
        >
          Show Users
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export { Home };
