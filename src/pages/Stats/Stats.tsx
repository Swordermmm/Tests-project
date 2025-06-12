import { Header } from "../../components/Header";
import { FC } from "react";
import { useState, useEffect } from "react";

import styles from "./Stats.module.scss";

const headers = [
  { key: "name", label: "ФИО" },
  { key: "email", label: "Почта" },
  { key: "test", label: "Название теста" },
  { key: "result", label: "Результат" },
  { key: "score", label: "Баллы" },
];

interface Stat {
  fullName: string;
  email: string;
  testName: string;
  result: boolean;
  score: number;
}

const Stats: FC = () => {
  //  const { activeUserId, guestId } = useSelector(selectAuth);
  //  const id = activeUserId ?? guestId;

  const [name, setName]: [string, (name: string) => void] = useState("");
  const [email, setEmail]: [string, (email: string) => void] = useState("");
  const [testName, setTest]: [string, (test: string) => void] = useState("");
  const [score, setScore] = useState<number>(0);
  const [result, setResult] = useState<string>("false");
  const [loading, isLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<Stat[]>([]);
  const [filteredSubjects, setFilters] = useState<Stat[]>([]);

  async function getStats() {
    try {
      const response = await fetch(
        `https://constructor-dev-ed2c.onrender.com/api/v1/operationsOnTest/GetStatistic`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            accept: "*/*",
          },
        }
      )
        .then((response) => response.json())
        .then((json: Stat[]) => {
          setStats(json);
          setFilters(json);
        });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return "";
    } finally {
      isLoading(false);
    }
  }

  useEffect(() => {
    if (loading) {
      getStats();
    }
    console.log(stats);
    if (stats.length > 0) {
      let filteredData = [...stats];
      if (name) {
        filteredData = filteredData.filter((subject) =>
          subject.fullName.toLowerCase().includes(name.toLowerCase())
        );
      }
      if (email) {
        filteredData = filteredData.filter((subject) =>
          subject.email.toLowerCase().includes(email.toLowerCase())
        );
      }
      if (testName) {
        filteredData = filteredData.filter((subject) =>
          subject.testName.toLowerCase().includes(testName.toLowerCase())
        );
      }
      if (score) {
        filteredData = filteredData.filter(
          (subject) => subject.score === score
        );
      }
      if (result === "true") {
        filteredData = filteredData.filter(
          (subject) => subject.result === true
        );
      } else {
      }
      setFilters(filteredData);
    }
  }, [name, email, testName, score, result]);

  return (
    <div className={styles["stats-container"]}>
      <Header />
      <div className={styles["title"]}>Статистика</div>
      <div className={styles["inputs-container"]}>
        <div className={styles["inputs-row"]}>
          <div className={styles["input-container"]}>
            <label>ФИО</label>
            <input
              type="text"
              value={name}
              className={styles["name"]}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className={styles["input-container"]}>
            <label>Почта</label>
            <input
              type="text"
              value={email}
              className={styles["input-el email"]}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className={styles["input-container"]}>
            <label>Результат</label>
            <select
              value={result}
              className={styles["input-el result"]}
              onChange={(e) => setResult(e.target.value)}
            >
              <option value="true">Прошёл</option>
              <option value="false">Не прошёл</option>
            </select>
          </div>
        </div>
        <div className={styles["inputs-row"]}>
          <div className={styles["input-container"]}>
            <label>Название теста</label>
            <input
              type="text"
              value={testName}
              className={styles["input-el test"]}
              onChange={(e) => setTest(e.target.value)}
            ></input>
          </div>
          <div className={styles["input-container"]}>
            <label>Баллы</label>
            <input
              type="text"
              value={score}
              className={styles["input-el score"]}
              onChange={(e) => setScore(Number(e.target.value))}
            ></input>
          </div>
          <div className={styles["input-container"]}></div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            {headers.map((row) => {
              return <td key={row.key}>{row.label}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {filteredSubjects.map((subject) => {
            return (
              <tr>
                <td>{subject.fullName}</td>
                <td>{subject.email}</td>
                <td>{subject.testName}</td>
                <td>{`${subject.result ? "Прошёл" : "Не прошёл"}`}</td>
                <td>{subject.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Stats;
