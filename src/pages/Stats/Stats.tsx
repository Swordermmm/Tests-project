import { Header } from "../../components/Header";
import { FC } from "react";
import { useState, useEffect } from "react";

import data from "./data.json";
import styles from "./Stats.module.scss";

const headers = [
  { key: "name", label: "ФИО" },
  { key: "email", label: "Почта" },
  { key: "test", label: "Название теста" },
  { key: "result", label: "Результат" },
  { key: "score", label: "Баллы" },
  { key: "percentage", label: "Процент" },
];

const Stats: FC = () => {
  //  const { activeUserId, guestId } = useSelector(selectAuth);
  //  const id = activeUserId ?? guestId;

  const [name, setName]: [string, (name: string) => void] = useState("");
  const [email, setEmail]: [string, (email: string) => void] = useState("");
  const [test, setTest]: [string, (test: string) => void] = useState("");
  const [score, setScore]: [string, (score: string) => void] = useState("");
  const [percentage, setPercentage]: [string, (percentage: string) => void] =
    useState("");
  const [result, setResult]: [string, (result: string) => void] =
    useState("Прошёл");

  const [filteredSubjects, setFilters] = useState(data);

  useEffect(() => {
    if (data.length > 0) {
      let filteredData = [...data];
      if (name) {
        filteredData = filteredData.filter((subject) =>
          subject.name.toLowerCase().includes(name.toLowerCase())
        );
      }
      if (email) {
        filteredData = filteredData.filter((subject) =>
          subject.email.toLowerCase().includes(email.toLowerCase())
        );
      }
      if (test) {
        filteredData = filteredData.filter((subject) =>
          subject.test.toLowerCase().includes(test.toLowerCase())
        );
      }
      if (score) {
        filteredData = filteredData.filter(
          (subject) => subject.score === score
        );
      }
      if (percentage) {
        filteredData = filteredData.filter((subject) =>
          subject.percentage.startsWith(percentage)
        );
      }
      if (result) {
        if (result == "Прошёл") {
          filteredData = filteredData.sort((a, b) =>
            b.result.localeCompare(a.result)
          );
        } else {
          filteredData = filteredData.sort((a, b) =>
            a.result.localeCompare(b.result)
          );
        }
      }
      setFilters(filteredData);
    }
  }, [data, name, email, test, score, percentage, result]);

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
              <option value="Прошёл">Прошёл</option>
              <option value="Не прошёл">Не прошёл</option>
            </select>
          </div>
        </div>
        <div className={styles["inputs-row"]}>
          <div className={styles["input-container"]}>
            <label>Название теста</label>
            <input
              type="text"
              value={test}
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
              onChange={(e) => setScore(e.target.value)}
            ></input>
          </div>
          <div className={styles["input-container"]}>
            <label>Процент</label>
            <input
              type="text"
              value={percentage}
              className={styles["input-el percentage"]}
              onChange={(e) => setPercentage(e.target.value)}
            ></input>
          </div>
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
                <td>{subject.name}</td>
                <td>{subject.email}</td>
                <td>{subject.test}</td>
                <td>{subject.result}</td>
                <td>{subject.score}</td>
                <td>{subject.percentage}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Stats;
