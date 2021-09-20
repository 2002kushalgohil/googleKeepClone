import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Publish from "@material-ui/icons/Publish";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  const history = useHistory();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value.toLocaleLowerCase() });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = userData;

      const response = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 400) {
        toast.error("Invalid Credientials", {
          position: "top-center",
        });
      } else if (response.status === 401) {
        toast.warn("Fill All The Details", {
          position: "top-center",
        });
      } else {
        toast.success("Login Successful", {
          position: "top-center",
        });
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div id="mainLoginAndRegister">
      <div>
        <h1>Login</h1>
      </div>

      <form className="loginAndRegisterFormDiv">
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={inputHandler}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={inputHandler}
        />
        <h4>
          Not Yet Registered <NavLink to="/register">(Register)</NavLink>
        </h4>
        <button type="submit" onClick={submitHandler}>
          <Publish />
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
