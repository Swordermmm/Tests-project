import axios from "axios";

const API_URL = "https://64d4f6161bea58f0.mokky.dev/";

export const register = (email: string, password: string) => {
  return axios.post(API_URL + "signup", {
    email,
    password,
  });
};

  export async function login(email: string, password: string) {
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        "https://constructor-dev-ed2c.onrender.com/api/v1/Auth/LogIn",
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
      console.log(response)
      return response;
    } catch (error) {
      console.log(error);
      return "";
    }
  }

export const logout = () => {
  localStorage.removeItem("user");
};
