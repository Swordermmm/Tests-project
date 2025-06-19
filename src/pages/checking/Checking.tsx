import { FC, useEffect, useState } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const Checking: FC = () => {
  async function getTests() {
    try {
      const response = await fetch(
        "https://constructor-dev-ed2c.onrender.com/api/v1/operationsOnTest/GetAllTests",
        {
          method: "GET",
          credentials: "include",
          headers: {
            accept: "*/*",
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

  async function Login() {
    const data = {
      email: "email@email.com",
      password: "12345",
    };

    try {
      const response = await fetch(
        `https://constructor-dev-ed2c.onrender.com/api/v1/Auth/LogIn`,
        {
          method: "POST",
          body: JSON.stringify(data),
          credentials: "include",
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
          credentials: "include",
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
    await getTests();
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
