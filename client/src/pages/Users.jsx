import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Users = () => {
  const { auth } = useContext(AuthContext);

  const [page, setPage] = useState(1);

  const [userData, setUserData] = useState({});

  const fetchData = () => {
    fetch(`http://localhost:8080/users/user?page=${page}$limit=5`, {
      headers: {
        Authorization: "Bearer " + auth.accessToken,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setUserData(responseData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const deleteUser = (id) => {
    fetch(`http://localhost:8080/users/user/${id}`, {
      method: "DELETE",

      headers: {
        Authorization: "Bearer " + auth.accessToken,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {userData.data &&
          userData.data.map((data) => {
            return (
              <div
                key={data._id}
                style={{
                  border: "1px solid",
                  width: "250px",
                  padding: "10px",
                }}
              >
                <p>Id : {data._id}</p>
                <p>Username : {data.username}</p>
                <p>Email : {data.email}</p>
                <p>Location : {data.location}</p>
                <p>Date of birth : {data.dob}</p>
                <p>Role : {data.role}</p>
                <button
                  onClick={() => {
                    deleteUser(data._id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          onClick={() => {
            setPage((prev) => Math.max(prev - 1, 1));
          }}
        >
          prev
        </button>
        <button
          onClick={() => {
            setPage((prev) => Math.min(prev + 1, userData.totalPages));
          }}
        >
          next
        </button>
      </div>
    </>
  );
};

export { Users };
