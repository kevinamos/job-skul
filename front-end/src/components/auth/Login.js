import React from "react";
import axios from "axios";
import { useEffect } from "react";
const Login = () => {
  useEffect(() => {
    axios
      .post(
        " http://127.0.0.1:5000/api/users/",
        JSON.stringify({
          name: "kev",
          age: "20"
        }),
        {
          ContentType: "application/x-www-form-urlencoded",
          Accept: "application/json"
        }
      )
      .then(response => {
        console.log(response.statusText);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);
  return <div>Login</div>;
};

export default Login;
