import { FC } from "react";
//import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import styles from "./MainPage.module.scss";
import { Button } from "../../components/UI";
import { v4 as uuid } from "uuid";

const MainPage: FC = () => {
  //  const { activeUserId, guestId } = useSelector(selectAuth);
  //  const id = activeUserId ?? guestId;

  let navigate = useNavigate();
  const handleCreateForm = () => {
    const id = uuid();
    navigate("/form/" + id);
  };
  return (
    <>
      <Header />
      <div className={styles["title"]}>Главная страница</div>
      <div className={styles["main"]}>
        <Button className={styles["create-btn"]} onClick={handleCreateForm}>
          Создать тест
        </Button>
      </div>
      <Outlet />
    </>
  );
};

export default MainPage;
