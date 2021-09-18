import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import NavBar, { NavBar2 } from "./Components/NavBar";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Home from "./Components/Home";
import NotFound from "./Components/NotFound";
function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/register">
          <NavBar2 />
          <Register />
        </Route>

        <Route exact path="/login">
          <NavBar2 />
          <Login />
        </Route>

        <Route exact path="/">
          <NavBar />
          <Home />
        </Route>

        <Route exact path="/logout">
          <NavBar2 />
          <Logout />
        </Route>

        <Route>
          <NavBar2 />
          <NotFound/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
