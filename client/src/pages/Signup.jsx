import { useForm } from "react-hook-form";
import "../styles/css/style.css";

import { MdAlternateEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { MdOutlineStream } from "react-icons/md";
import { MdOutlineSubject } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { AiTwotoneRocket } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { BASE_URL } from "../utils/vars";

const initialFormData = {
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const Signup = () => {
  const [stream, setStream] = useState([]);
  const [subject, setSubject] = useState([]);

  const [formStateData, setFormStateData] = useState(initialFormData);

  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const navigate = useNavigate();

  const registerUser = async (data) => {
    const { name, email, stream, subject, password } = data;

    const registrationData = {
      name,
      email,
      password,
      stream,
      subject,
    };

    setFormStateData({ ...formStateData, isLoading: true, isError: false });

    fetch(`${BASE_URL}/student/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(registrationData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.error) {
          // alert(responseData.message);
          setFormStateData({
            ...formStateData,
            isLoading: false,
            isError: true,
          });

          toast({
            title: responseData.message,
            // description: "We've created your account for you.",
            status: "error",
            duration: 5000,
            position: "top-right",
            isClosable: true,
          });
        } else {
          setFormStateData({
            ...formStateData,
            isLoading: false,
            isSuccess: true,
          });

          toast({
            title: "SignUp Successful",
            description: "We've created your account for you.",
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

        toast({
          title: error,
          // description: "We've created your account for you.",
          status: "error",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });
        setFormStateData({ ...formStateData, isLoading: false, isError: true });
      });
  };

  const fetchStream = () => {
    fetch(`${BASE_URL}/streams/`)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setStream(responseData.data);
      })
      .catch((error) => console.log(error));
  };

  const fetchSubject = (streamId) => {
    fetch(`${BASE_URL}/subjects/stream/${streamId}`)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setSubject(responseData.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchStream();
  }, []);

  return (
    <div className="loginSignupContainer">
      <div className="wrapper">
        <div className="inner">
          <form onSubmit={handleSubmit(registerUser)}>
            <h3>Registration Form</h3>
            <div className="form-group">
              <div className="form-wrapper">
                <label htmlFor="">Name:</label>
                <div className="form-holder">
                  <i className="zmdi">
                    {" "}
                    <CiUser />
                  </i>
                  <input
                    type="text"
                    className="form-control"
                    {...register("name", {
                      required: true,
                    })}
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                </div>
                {errors.name?.type === "required" && (
                  <p role="alert">Name is required</p>
                )}
              </div>

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
            </div>
            <div className="form-group">
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
              <div className="form-wrapper">
                <label htmlFor="">Repeat Password:</label>
                <div className="form-holder">
                  <i className="zmdi ">
                    <MdOutlinePassword />
                  </i>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="********"
                    {...register("confirmPassword", {
                      required: true,
                      validate: (value) => {
                        const { password } = getValues();
                        return password === value || "Passwords should match!";
                      },
                    })}
                    aria-invalid={errors.confirmPassword ? "true" : "false"}
                  />
                </div>
                {errors.confirmPassword?.type === "required" && (
                  <p role="alert">Confirm password is required</p>
                )}
                {errors.confirmPassword && (
                  <p className="error">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <div className="form-group">
              <div className="form-wrapper">
                <label htmlFor="">Stream:</label>
                <div className="form-holder select">
                  <select
                    name="stream"
                    id="stream"
                    defaultValue={""}
                    className="form-control"
                    {...register("stream", { required: true })}
                    aria-invalid={errors.stream ? "true" : "false"}
                    onChange={(e) => fetchSubject(e.target.value)}
                  >
                    <option value="" disabled>
                      -select stream-
                    </option>

                    {stream.map((item) => {
                      return (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  <i className="zmdi ">
                    <MdOutlineStream />
                  </i>
                </div>
                {errors.stream?.type === "required" && (
                  <p role="alert">Stream is required</p>
                )}
              </div>

              <div className="form-wrapper">
                <label htmlFor="">Subject:</label>
                <div className="form-holder select">
                  <select
                    name="subject"
                    id="subject"
                    defaultValue={""}
                    className="form-control"
                    {...register("subject", { required: true })}
                    aria-invalid={errors.subject ? "true" : "false"}
                  >
                    <option value="" disabled>
                      -select subject-
                    </option>

                    {subject.map((item) => {
                      return (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  <i className="zmdi ">
                    <MdOutlineSubject />
                  </i>
                </div>
                {errors.subject?.type === "required" && (
                  <p role="alert">Subject is required</p>
                )}
              </div>
            </div>

            <div className="form-end">
              <div className="checkbox">
                <label>
                  <input type="checkbox" required /> I agree all statements in
                  Terms of service.
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="button-holder">
                <Button
                  type="submit"
                  isLoading={formStateData.isLoading}
                  loadingText="Loading"
                  colorScheme="teal"
                  variant="outline"
                  spinnerPlacement="start"
                >
                  <AiTwotoneRocket /> Register Now
                </Button>
              </div>
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
              <Link to={"/login"}>
                Already have an account? <span>Login</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { Signup };
