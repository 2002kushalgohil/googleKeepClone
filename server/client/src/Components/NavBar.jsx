import { useState } from "react";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  const [toggleBtn, setToggleBtn] = useState(false);

  return (
    <div id="nav_bar">
      <div id="nav_bar_Brand_Name">
        <div>
          <NavLink to="/">
            <h1>Google Keep</h1>
          </NavLink>
        </div>

        <h1
          id="hamburg_Icon"
          onClick={() => {
            setToggleBtn(!toggleBtn);
          }}
        >
          {toggleBtn ? "X" : "☰"}
        </h1>
      </div>

      <ul className={toggleBtn ? "nav_bar_Ul nav_bar_active" : "nav_bar_Ul"}>
        <li>
          <NavLink
            to="/logout"
            onClick={() => {
              setToggleBtn(false);
            }}
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

const NavBar2 = () => {
  const [toggleBtn, setToggleBtn] = useState(false);

  return (
    <div id="nav_bar">
      <div id="nav_bar_Brand_Name">
        <div>
          <NavLink to="/login">
            <h1>Google Keep</h1>
          </NavLink>
        </div>

        <h1
          id="hamburg_Icon"
          onClick={() => {
            setToggleBtn(!toggleBtn);
          }}
        >
          {toggleBtn ? "X" : "☰"}
        </h1>
      </div>

      <ul className={toggleBtn ? "nav_bar_Ul nav_bar_active" : "nav_bar_Ul"}>
        <li>
          <NavLink
            to="/register"
            onClick={() => {
              setToggleBtn(false);
            }}
          >
            Register
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            onClick={() => {
              setToggleBtn(false);
            }}
          >
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
export { NavBar2 };
