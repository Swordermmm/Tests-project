import { FC } from "react";
//import { useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import styles from "./CheckPage.module.scss";
import { Button } from "../../components/UI";
import { v4 as uuid } from "uuid";

const headers = [
  { key: "name", label: "ФИО" },
  { key: "email", label: "Почта" },
  { key: "title", label: "Название теста" },
  { key: "id", label: "Ссылка для проверки" },
];

interface ResponseRender {
  name?: string;
  email?: string;
  title: string;
  id: string | undefined;
}

const responsesData = [
  JSON.parse(localStorage.getItem("formResponse") || '""'),
];

const CheckPage: FC = () => {
  //  const { activeUserId, guestId } = useSelector(selectAuth);
  //  const id = activeUserId ?? guestId;

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
            {responsesData.map((response: ResponseRender) => {
              return (
                <tr>
                  <td>{response.name}</td>
                  <td>{response.email}</td>
                  <td>{response.title}</td>
                  <td>
                    <Button to={"/check/" + response.id}>
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
