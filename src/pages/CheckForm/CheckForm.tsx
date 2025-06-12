import { useParams, useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { ITest } from "../Test/formRender";

import styles from "./CheckForm.module.scss";

const CheckForm: FC = () => {
  const params = useParams();
  const [mark, setMark] = useState<number>(0);
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
      console.log(error);
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
        .then((data) => setChecks(data));
      return response;
    } catch (error) {
      console.log(error);
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
      console.log(error);
      return "";
    }
  }

  useEffect(() => {
    getTest();
    getManualChecks();
  }, []);

  //Функция отвечает за все значения проверки
  const handleCorrectChange = (number: string, id: any) => {
    setMark((prevMark) => (prevMark = Number(number)));
  };

  // Отвечает за сохранение проверки
  const handleCheckSubmit: any = (e: any) => {
    e.preventDefault();
    const checkedResponse = {
      userId: checks[0].userid,
      markedQuestions: [
        {
          questionId: checks[0].questionToCheckDtos[0].questionId,
          mark: mark,
        },
      ],
    };
    postManualChecks([checkedResponse]);
    console.log(checkedResponse);
    navigate("/check");
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
                        handleCorrectChange(e.target.value, e.target.name)
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
                        handleCorrectChange(e.target.value, e.target.name)
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
