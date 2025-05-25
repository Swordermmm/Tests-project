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
  { key: "percentage", label: "Процент" },
];

const Stats: FC = () => {
  //  const { activeUserId, guestId } = useSelector(selectAuth);
  //  const id = activeUserId ?? guestId;

  const [name, setName]: [string, (name: string) => void] = useState("");
  const [email, setEmail]: [string, (email: string) => void] = useState("");
  const [title, setTest]: [string, (test: string) => void] = useState("");
  const [score, setScore]: [string, (score: string) => void] = useState("");
  const [percentage, setPercentage]: [string, (percentage: string) => void] =
    useState("");
  const [result, setResult]: [string, (result: string) => void] =
    useState("Прошёл");

  const responseData = JSON.parse(localStorage.getItem("formResponse") || '""');

  const newResult = () => {
    let word: string;
    if (
      responseData.isChecked &&
      responseData.score >= responseData.scoreToPass
    ) {
      word = "Прошёл";
    } else {
      word = "Не прошёл";
    }
    return word;
  };

  let newscore: number;
  let newresult = newResult();
  if (responseData) {
    newscore = (responseData.score / responseData.answers.length) * 100;
  } else {
    newscore = 0;
  }

  let filteredAnswers = [
    {
      name: "placeholder",
      email: "placeholder",
      title: responseData.title,
      result: newresult,
      score: responseData.score,
      percentage: `${newscore}`,
    },
  ];

  const [filteredSubjects, setFilters] = useState(filteredAnswers);

  useEffect(() => {
    if (filteredAnswers.length > 0) {
      let filteredData = [...filteredAnswers];
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
      if (title) {
        filteredData = filteredData.filter((subject) =>
          subject.title.toLowerCase().includes(title.toLowerCase())
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
  }, [name, email, title, score, percentage, result]);

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
              value={title}
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
                <td>{subject.title}</td>
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
