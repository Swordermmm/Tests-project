import { FC, useEffect, useState } from "react";
import axios from "axios";

export const Checking: FC = () => {
  async function getTest() {
    try {
      const response = await axios.get(
        "https://constructor-dev-ed2c.onrender.com/api/v1/operationsOnTest/GetAllTests"
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  async function Login() {
    const data = {
      email: "email@email.com",
      password: "12345",
    };

    try {
      const response = await fetch(
        "https://constructor-dev-ed2c.onrender.com/api/v1/Auth/LogIn",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      return response;
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  async function LogOut() {
    try {
      const response = await fetch(
        "https://constructor-dev-ed2c.onrender.com/api/v1/Auth/LogOut",
        {
          method: "POST",
          body: "",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      return response;
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  async function handleLogin() {
    await Login();
  }

  async function handleTests() {
    await getTest();
  }

  async function handleLogOut() {
    await LogOut();
  }

  return (
    <div>
      <button onClick={handleLogin}> Login </button>
      <button onClick={handleTests}> getAllTests </button>
      <button onClick={handleLogOut}> LogOut </button>
    </div>
  );
};
