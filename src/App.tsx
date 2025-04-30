import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import * as AuthService from "./apis/auth.api";
import IUser from "./types/index";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import MainPage from "./pages/MainPage/MainPage";
import Stats from "./pages/Stats/Stats";

import EventBus from "./components/base/Events";

function App() {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", logOut);

    return () => {
      EventBus.remove("logout", logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  );
}

export default App;
