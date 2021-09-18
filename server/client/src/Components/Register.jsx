import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Publish from "@material-ui/icons/Publish";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Register() {
  const history = useHistory();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value.toLocaleLowerCase() });
  };

  const submitHandler = async (e) => {
    //
    e.preventDefault();
    try {
      const { email, password, confirmPassword } = userData;

      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      if (response.status === 400) {
        toast.warning("Email Already Registered", {
          position: "top-center",
        });
      } else if (response.status === 403) {
        toast.error("Password Does Not match", {
          position: "top-center",
        });
      } else if (response.status === 401) {
        toast.warn("Fill All The Details", {
          position: "top-center",
        });
      } else {
        toast.success("Registration Done", {
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
        <h1>Register</h1>
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
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={inputHandler}
        />
        <h4>
          Already Registered <NavLink to="/login">(Login)</NavLink>
        </h4>
        <button type="submit" onClick={submitHandler}>
          <Publish />
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
