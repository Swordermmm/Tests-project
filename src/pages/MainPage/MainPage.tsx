import { FC, useEffect, useState } from "react";
//import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import styles from "./MainPage.module.scss";
import { Button } from "../../components/UI";
import { v4 as uuid } from "uuid";
import { Form } from "../TestConstructor/TestConstructor";

interface Test extends Form {
  id: string;
}

const MainPage: FC = () => {
  //  const { activeUserId, guestId } = useSelector(selectAuth);
  //  const id = activeUserId ?? guestId;
  const [tests, setTests] = useState([]);

  let navigate = useNavigate();
  const handleCreateForm = () => {
    const id = uuid();
    navigate("/form/" + id);
  };

  const handleLookForm = (form: Test) => {
    navigate("/form/" + form.id);
  };

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
      )
        .then((response) => response.json())
        .then((json) => {
          setTests(json);
        });
      return response;
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  async function deleteTest(testId: string) {
    try {
      const response = await fetch(
        `https://constructor-dev-ed2c.onrender.com/api/v1/operationsOnTest/Delete/${testId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            accept: "*/*",
          },
        }
      );
      getTests();
      return response;
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  useEffect(() => {
    getTests();
  }, []);

  return (
    <div className={styles["main-container"]}>
      <Header />
      <div className={styles["title"]}>Главная страница</div>
      {!tests && (
        <div className={styles["main-empty"]}>
          <Button className={styles["create-btn"]} onClick={handleCreateForm}>
            Создать тест
          </Button>
        </div>
      )}
      {tests && (
        <div className={styles["main-full"]}>
          <div className={styles["main-tests"]}>
            {tests.map((form: Test) => (
              <div className={styles["test-card"]}>
                <div>Название: {form.title}</div>
                <Button
                  onClick={() => deleteTest(form.id)}
                  className={styles["delete-btn"]}
                >
                  Удалить тест
                </Button>
                <Button
                  to={`http://localhost:5173/test/${form.id}`}
                  className={styles["test-btn"]}
                >
                  Переход на тест
                </Button>
                <Button
                  onClick={() => handleLookForm(form)}
                  className={styles["test-btn"]}
                >
                  Редактировать
                </Button>
              </div>
            ))}
          </div>
          <Button className={styles["create-btn"]} onClick={handleCreateForm}>
            Создать тест
          </Button>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default MainPage;
