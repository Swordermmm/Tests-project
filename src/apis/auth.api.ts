  export async function register(email: string, password: string) {
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        "https://constructor-dev-ed2c.onrender.com/api/v1/Auth/Registration",
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
      return response;
    } catch (error) {
      return "";
    }
  }

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
      return response;
    } catch (error) {
      console.log(error);
      return "";
    }
  }

export const logout = () => {
  localStorage.removeItem("user");
};
