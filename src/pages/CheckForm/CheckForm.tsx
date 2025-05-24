import { useParams, useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { Timer } from "../../components/UI";

import styles from "./CheckForm.module.scss";

interface Answer {
  id: string;
  questionText: string;
  answerType: string;
  answer: string;
  options?: string[];
}

interface responseData {
  title: string;
  desc: string;
  id: string | undefined;
  questions: Answer[];
}

const CheckForm: FC = () => {
  const params = useParams();
  const [values, setValues] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const sumValues = Object.values(values);
    const sum = sumValues.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    setScore(sum);
  }, [values, score]);

  const handleCorrectChange = (number: string, id: any) => {
    let name = id;
    let value = parseInt(number);
    const newValues = {
      ...values,
      [name]: value,
    };
    setValues(newValues);
  };

  const handleCheckSubmit: any = (e: any) => {
    e.preventDefault();
    const checkedResponse = {
      id: filteredData.id,
      score: score,
      isChecked: true,
    };
    localStorage.setItem("checkedResponse", JSON.stringify(checkedResponse));
    navigate("/check");
  };

  const responseData = [
    JSON.parse(localStorage.getItem("formResponse") || '""'),
  ];
  const filteredData = responseData.find(
    (response) => response.id === params.id
  );

  return (
    <div className={styles["wrapper"]}>
      <form onSubmit={handleCheckSubmit}>
        <div className={styles["test-name-container"]}>
          <div className={styles["form-title"]}>{filteredData?.title}</div>
          <div className={styles["form-desc"]}>
            Описание: {filteredData?.desc}
          </div>
          <Timer time={600}></Timer>
        </div>
        {filteredData?.answers?.map((answer: any, index: any) => (
          <div className={styles["question-container"]}>
            <div className={styles["question-title"]}>
              {index + 1}. {answer.questionText}
            </div>
            <hr />
            <div className={styles["question-options"]}>
              <div>
                {answer.answerType === "input" && (
                  <input type="text" value={answer.answer} disabled></input>
                )}
                {answer.answerType === "radio" &&
                  answer.options?.map((option: any) => (
                    <div className={styles["option-container"]}>
                      {answer.answer === option ? (
                        <input
                          type="radio"
                          name={`${index}-option`}
                          value={option}
                          defaultChecked
                          disabled
                        />
                      ) : (
                        <input
                          type="radio"
                          name={index}
                          value={option}
                          disabled
                        />
                      )}
                      <label>{option}</label>
                    </div>
                  ))}
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
        <hr />
        <label>
          Баллы: {score}/{filteredData.answers.length}
        </label>
        <label>Статус: Прошёл</label>
        <hr />
        <label>
          <input type="submit" value="Закончить проверку" />
        </label>
      </form>
    </div>
  );
};

export default CheckForm;
