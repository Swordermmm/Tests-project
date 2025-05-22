import { FC } from "react";
//import { useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";

import { Header } from "../../components/Header";
import styles from "./MainPage.module.scss";
import { Button } from "../../components/UI";

const MainPage: FC = () => {
  //  const { activeUserId, guestId } = useSelector(selectAuth);
  //  const id = activeUserId ?? guestId;

  return (
    <>
      <Header />
      <div className={styles["title"]}>Главная страница</div>
      <div className={styles["main"]}>
        <Button className={styles["create-btn"]} to="/form/:id">
          Создать тест
        </Button>
      </div>
      <Outlet />
    </>
  );
};

export default MainPage;
