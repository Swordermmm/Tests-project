import { FC, useEffect, useState } from "react";
//import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import styles from "./CheckPage.module.scss";
import { Button } from "../../components/UI";

const headers = [
  { key: "title", label: "Название теста" },
  { key: "id", label: "Ссылка для проверки" },
];

interface ResponseRender {
  title: string;
  id: string | undefined;
}

const CheckPage: FC = () => {
  //  const { activeUserId, guestId } = useSelector(selectAuth);
  //  const id = activeUserId ?? guestId;
  const [tests, setTests] = useState<[]>([]);
  const [checks, setChecks] = useState<[]>([]);
  const navigate = useNavigate();

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
          json.filter((test) => test.manualCheck == true);
          console.log(json);
          setTests(json);
          getManualChecks(json);
        });
      return response;
    } catch (error) {
      return "";
    } finally {
    }
  }

  async function getManualChecks(json: any) {
    try {
      const response = await fetch(
        `https://constructor-dev-ed2c.onrender.com/api/v1/operationsOnTest/ManualCheck/${json[0].id}`,
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
          setChecks(json);
        });
      return response;
    } catch (error) {
      return "";
    } finally {
    }
  }

  const goCheckSolution = (user: string, testId: string) => {
    localStorage.setItem("test", JSON.stringify(user));
    navigate("/check/" + testId);
  };

  useEffect(() => {
    getTests();
  }, []);

  return (
    <div className={styles["wrapper"]}>
      <Header />
      <div className={styles["title"]}>Ручная проверка</div>
      <div className={styles["main"]}>
        <table>
          <thead>
            <tr>
              {headers.map((row) => {
                return <td key={row.key}>{row.label}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {checks.map((response: ResponseRender, index) => {
              return (
                <tr>
                  <td>{tests[0].title}</td>
                  <td>
                    <Button
                      onClick={() =>
                        goCheckSolution(checks[index].userid, tests[0].id)
                      }
                    >
                      Ручная проверка
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Outlet />
    </div>
  );
};

export default CheckPage;
