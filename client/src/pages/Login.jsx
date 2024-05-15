import { useForm } from "react-hook-form";
import "../styles/css/style.css";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

import { MdAlternateEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";

import { Button, useToast } from "@chakra-ui/react";
import { BASE_URL } from "../utils/vars";

const initialData = {
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { auth, setAuth } = useContext(AuthContext);

  const [formStateData, setFormStateData] = useState(initialData);

  const toast = useToast();

  const navigate = useNavigate();

  const loginUser = async (data) => {
    setFormStateData({ ...formStateData, isLoading: true, isError: false });

    fetch(`${BASE_URL}/student/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.error) {
          setFormStateData({
            ...formStateData,
            isLoading: false,
            isError: true,
          });

          // alert(responseData.message);
          toast({
            title: responseData.message,
            // description: "We've created your account for you.",
            status: "error",
            duration: 5000,
            position: "top-right",
            isClosable: true,
          });
        } else {
          // console.log(responseData);

          localStorage.setItem("accessToken", responseData.accessToken);
          localStorage.setItem("userId", responseData.data.userId);
          localStorage.setItem("email", responseData.data.email);
          localStorage.setItem("role", responseData.data.role);

          setAuth({
            ...auth,
            isAuth: true,
            userId: responseData.data.userId,
            email: responseData.data.email,
            role: responseData.data.role,
            accessToken: responseData.accessToken,
          });

          // alert("Login Successful");

          setFormStateData({
            ...formStateData,
            isLoading: false,
            isError: false,
            isSuccess: true,
          });

          toast({
            title: "Login Successful",
            // description: "We've created your account for you.",
            status: "success",
            duration: 5000,
            position: "top-right",
            isClosable: true,
          });

          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);

        setFormStateData({ ...formStateData, isLoading: false, isError: true });

        toast({
          title: error,
          status: "error",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });
      });
  };

  return (
    <div className="loginSignupContainer">
      <div className="wrapper">
        <div className="inner">
          <form onSubmit={handleSubmit(loginUser)}>
            <h3>Login Form</h3>

            <div className="form-wrapper">
              <label htmlFor="">Email:</label>
              <div className="form-holder">
                <i style={{ fontStyle: "normal", fontSize: "15px" }}>
                  <MdAlternateEmail />
                </i>
                <input
                  type="email"
                  className="form-control"
                  {...register("email", { required: true })}
                  aria-invalid={errors.email ? "true" : "false"}
                />
              </div>
              {errors.email?.type === "required" && (
                <p role="alert">Email is required</p>
              )}
            </div>

            <div className="form-wrapper">
              <label htmlFor="">Password:</label>
              <div className="form-holder">
                <i className="zmdi ">
                  <MdOutlinePassword />
                </i>
                <input
                  type="password"
                  className="form-control"
                  placeholder="********"
                  {...register("password", { required: true })}
                  aria-invalid={errors.password ? "true" : "false"}
                />
              </div>
              {errors.password?.type === "required" && (
                <p role="alert">Password is required</p>
              )}
            </div>

            <div className="form-end">
              <Button
                isLoading={formStateData.isLoading}
                type="submit"
                loadingText="Loading"
                colorScheme="teal"
                variant="outline"
                spinnerPlacement="start"
              >
                Login Now
              </Button>
            </div>
            <div
              style={{
                marginTop: "20px",
                textAlign: "center",
                fontSize: "14px",
                color: "#4299E1",
                fontWeight: "bold",
              }}
            >
              <Link to={"/signup"}>
                Don&apos;t have an account? <span>Signup</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { Login };
