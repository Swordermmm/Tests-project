import { useParams, useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { ITest } from "../Test/formRender";

import styles from "./CheckForm.module.scss";

const CheckForm: FC = () => {
  const params = useParams();
  const [mark, setMark] = useState<number[]>([]);
  const [checks, setChecks] = useState<[]>([]);
  const [form, setForm] = useState<ITest>({
    isActive: true,
    manualCheck: false,
    title: "",
    description: "",
    startAt: "",
    endAt: "",
    scoreToPass: 0,
    timerInSeconds: 0,
    questions: [
      { id: "", testId: "", questionText: "", type: "", answers: {} },
    ],
  });
  const [loading, isLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const user: string = JSON.parse(localStorage.getItem("test"));

  async function getTest() {
    try {
      const response = await fetch(
        `https://constructor-dev-ed2c.onrender.com/api/v1/operationsOnTest/UserGetTest/${params.id}`,
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
          setForm(json);
        });
      return response;
    } catch (error) {
      return "";
    } finally {
    }
  }

  async function getManualChecks() {
    try {
      const response = await fetch(
        `https://constructor-dev-ed2c.onrender.com/api/v1/operationsOnTest/ManualCheck/${params.id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            accept: "*/*",
          },
        }
      )
        .then((response) => response.json())
        .then((json) => json.filter((check) => check.userid == user))
        .then((data) => {
          setChecks(data);
          for (var item in data[0].questionToCheckDtos) {
            setMark((prevMark) => [...prevMark, 0]);
          }
        });
      return response;
    } catch (error) {
      return "";
    } finally {
      isLoading(false);
    }
  }

  async function postManualChecks(checkedResponse: any) {
    try {
      const response = await fetch(
        `https://constructor-dev-ed2c.onrender.com/api/v1/operationsOnTest/ManualCheck/${params.id}`,
        {
          method: "Post",
          credentials: "include",
          body: JSON.stringify(checkedResponse),
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      return "";
    }
  }

  useEffect(() => {
    getTest();
    getManualChecks();
  }, []);

  //Функция отвечает за все значения проверки
  const handleCorrectChange = (number: string, id: any, ind: number) => {
    setMark((prevMark) =>
      prevMark.map((mark, index) =>
        ind == index ? (mark = Number(number)) : mark
      )
    );
    console.log(mark);
  };

  // Отвечает за сохранение проверки
  const handleCheckSubmit: any = (e: any) => {
    e.preventDefault();
    let markedQuestions: any = [];
    let index: number = 0;
    for (var question of checks[0].questionToCheckDtos) {
      let markedQuestion = {
        questionId: question.questionId,
        mark: mark[index],
      };
      markedQuestions.push(markedQuestion);
      index += 1;
    }
    const checkedResponse = {
      userId: checks[0].userid,
      markedQuestions: markedQuestions,
    };
    postManualChecks([checkedResponse]);
    navigate("/main");
  };
  if (!loading) {
    return (
      <div className={styles["wrapper"]}>
        <form onSubmit={handleCheckSubmit}>
          <div className={styles["test-name-container"]}>
            <div className={styles["form-title"]}>{form.title}</div>
            <div className={styles["form-desc"]}>
              Описание: {form.description}
            </div>
          </div>
          {checks[0].questionToCheckDtos.map((answer: any, index: any) => (
            <div className={styles["question-container"]}>
              <div className={styles["question-title"]}>
                {index + 1}. {answer.questionText}
              </div>
              <hr />
              <div className={styles["question-options"]}>
                <div>
                  <input type="text" value={answer.userAnswer} disabled></input>
                </div>
                <div className={styles["correct-radios"]}>
                  <div>
                    <input
                      type="radio"
                      name={index}
                      value={1}
                      onChange={(e) =>
                        handleCorrectChange(
                          e.target.value,
                          e.target.name,
                          index
                        )
                      }
                    />
                    <label>Верно</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name={index}
                      value={0}
                      onChange={(e) =>
                        handleCorrectChange(
                          e.target.value,
                          e.target.name,
                          index
                        )
                      }
                    />
                    <label>Неверно</label>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className={styles["submit-container"]}>
            <input type="submit" value="Закончить проверку" />
          </div>
        </form>
      </div>
    );
  } else {
    return <div> Загрузка </div>;
  }
};

export default CheckForm;
