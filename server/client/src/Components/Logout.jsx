import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
function Logout() {
  const history = useHistory();
  const logoutUser = async () => {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 200) {
        history.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    logoutUser();
  });
  return (
    <div className="logout">
      <h1>Hope You Visit us Again</h1>
    </div>
  );
}

export default Logout;
