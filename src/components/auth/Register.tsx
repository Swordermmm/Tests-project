import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { NavigateFunction, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { Button } from "../UI";

import IUser from "../../types/index";
import { register } from "../../apis/auth.api";

const Register: React.FC = () => {
  let navigate: NavigateFunction = useNavigate();

  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: IUser = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Недействительный адрес почты")
      .required("Данное поле не заполнено!"),
    password: Yup.string()
      .test(
        "len",
        "Длина пароля должна быть больше 6, но меньше 20.",
        (val: any) =>
          val && val.toString().length >= 6 && val.toString().length <= 20
      )
      .required("Данное поле не заполнено!"),
  });

  const handleRegister = (formValue: IUser) => {
    const { email, password } = formValue;

    register(email, password).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
        navigate("/login");
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
        setSuccessful(false);
      }
    );
  };

  return (
    <div className="container">
      <div className="col-md-12">
        <div className="card card-container">
          <label className="title">Регистрация</label>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            <Form>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Логин
                    </label>
                    <Field name="email" type="email" className="form-control" />
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
                      Регистрация
                    </Button>
                  </div>

                  <div className="form-group">
                    <Button to={"/login"} className="auth-btn">
                      Войти
                    </Button>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
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

export default Register;
