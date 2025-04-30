import React, { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../../apis/auth.api";
import { Button } from "../UI";

import "./Auth.module.scss";

type Props = {};

const Login: React.FC<Props> = () => {
  let navigate: NavigateFunction = useNavigate();

  const [message, setMessage] = useState<string>("");

  const initialValues: {
    email: string;
    password: string;
  } = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Данное поле не заполнено!"),
    password: Yup.string().required("Данное поле не заполнено!"),
  });

  const handleLogin = (formValue: { email: string; password: string }) => {
    const { email, password } = formValue;

    setMessage("");

    login(email, password).then(
      () => {
        navigate("/main");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="container">
      <div className="col-md-12">
        <div className="card card-container">
          <label className="title">Авторизация</label>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Логин
                </label>
                <Field name="email" type="text" className="form-control" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Пароль
                </label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <Button type="submit" className="auth-btn">
                  Войти
                </Button>
              </div>

              <div className="form-group">
                <Button to={"/register"} className="auth-btn">
                  Регистрация
                </Button>
              </div>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
