import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { Modal } from "../../components/UI/Modal";

import { v4 as uuid } from "uuid";
import { Button } from "../../components/UI/Button";
import styles from "./TestConstructor.module.scss";
import DeleteIcon from "../../assets/delete-icon.svg";

import ITest from "../../types";

interface Question {
  questionText: string;
  type: number;
  answerOptions?: string[];
  createAnswer: { multipleAnswer?: string[]; singleAnswer?: string };
}

export interface Form {
  title: string;
  description: string;
  scoreToPass: number;
  timerInSeconds: string;
  startAt: string;
  endAt: string;
  messageAboutPassing: string;
  failureMessage: string;
  questions: Question[];
}

export const TestConstructor: FC = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [score, setScore] = useState(0);
  const [badMessage, setBadMessage] = useState("");
  const [goodMessage, setGoodMessage] = useState("");
  const [timer, setTimer] = useState(0);
  const param = useParams();
  const [showSaveButton, setShowSaveButton] = useState(false);

  const navigate = useNavigate();

  const dataTemplate: Form = {
    title: "",
    description: "",
    scoreToPass: 0,
    timerInSeconds: "0",
    startAt: "2025-05-23",
    endAt: "2025-05-26",
    messageAboutPassing: "",
    failureMessage: "",
    questions: [
      {
        questionText: "",
        type: 0,
        createAnswer: { multipleAnswer: [] },
      },
    ],
  };
  let forms = localStorage.getItem("forms") || "";
  let formsData: Form = dataTemplate;

  const [form, setForms] = useState<Form>({
    title: formsData.title,
    description: formsData.description,
    scoreToPass: formsData.scoreToPass,
    timerInSeconds: formsData.timerInSeconds,
    messageAboutPassing: formsData.messageAboutPassing,
    failureMessage: formsData.failureMessage,
    questions: formsData.questions,
    startAt: formsData.startAt,
    endAt: formsData.endAt,
  });

  interface timerValues {
    hours: number;
    minutes: number;
    seconds: number;
  }
  const [timerValues, setTimerValues] = useState<timerValues>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    localStorage.setItem("forms", JSON.stringify(form));
    setTimer(
      Object.values(timerValues).reduce((accumulator, value) => {
        return accumulator + value;
      })
    );
  }, [form, timerValues]);

  const handleQuestionTextChange = (questionId: number, value: string) => {
    setForms(
      (prevForm) =>
        (prevForm = {
          ...prevForm,
          questions: prevForm.questions.map((question, index) =>
            index === questionId
              ? { ...question, questionText: value }
              : question
          ),
        })
    );
  };

  const handleTitleTextChange = (value: string) => {
    setTitle(value);
    setForms(
      (prevForms) =>
        (prevForms = {
          ...prevForms,
          title: value,
        })
    );
  };

  const handleTimerChange = (value: number, word: string) => {
    let updatedValues: timerValues = { hours: 0, minutes: 0, seconds: 0 };
    if (word === "hours")
      updatedValues = {
        hours: value,
        minutes: timerValues.minutes,
        seconds: timerValues.seconds,
      };
    if (word === "minutes")
      updatedValues = {
        hours: timerValues.hours,
        minutes: value,
        seconds: timerValues.seconds,
      };
    if (word === "seconds")
      updatedValues = {
        hours: timerValues.hours,
        minutes: timerValues.minutes,
        seconds: value,
      };
    setTimerValues(updatedValues);

    let newTimer = Object.values(updatedValues).reduce((accumulator, value) => {
      return accumulator + value;
    });

    console.log(updatedValues, newTimer);

    setForms(
      (prevForms) =>
        (prevForms = {
          ...prevForms,
          timerInSeconds: String(newTimer),
        })
    );
  };

  const handleScoreChange = (value: number) => {
    setScore(value);
    setForms(
      (prevForms) =>
        (prevForms = {
          ...prevForms,
          scoreToPass: value,
        })
    );
  };

  const handleGoodMessageChange = (value: string) => {
    setGoodMessage(value);
    setForms(
      (prevForms) =>
        (prevForms = {
          ...prevForms,
          messageAboutPassing: value,
        })
    );
  };

  const handleBadMessageChange = (value: string) => {
    setBadMessage(value);
    setForms(
      (prevForms) =>
        (prevForms = {
          ...prevForms,
          failureMessage: value,
        })
    );
  };

  const handleDescTextChange = (value: string) => {
    setDesc(value);
    setForms(
      (prevForms) =>
        (prevForms = {
          ...prevForms,
          description: value,
        })
    );
  };

  const handleAnswerTypeChange = (questionId: number, value: number) => {
    if (value === 2) {
      setForms(
        (prevForms) =>
          (prevForms = {
            ...prevForms,
            questions: prevForms.questions.map((question, index) =>
              index === questionId
                ? {
                    ...question,
                    type: value,
                    answerOptions: [],
                    createAnswer: { multipleAnswer: [] },
                  }
                : question
            ),
          })
      );
    } else if (value === 4) {
      setForms(
        (prevForms) =>
          (prevForms = {
            ...prevForms,
            questions: prevForms.questions.map((question, index) =>
              index === questionId
                ? {
                    ...question,
                    type: value,
                    createAnswer: {},
                  }
                : question
            ),
          })
      );
    }
  };

  const handleOptionChange = (
    questionId: string,
    optionIndex: number,
    value: string
  ) => {
    console.log(form);
    setForms(
      (prevForms) =>
        (prevForms = {
          ...prevForms,
          questions: prevForms.questions.map((question) =>
            question.questionText === questionId
              ? {
                  ...question,
                  answerOptions: question.answerOptions.map((option, index) =>
                    index === optionIndex ? value : option
                  ),
                }
              : question
          ),
        })
    );
  };

  const handleMultipleAnswersChange = (
    questionId: string,
    optionIndex: number,
    isChecked: boolean
  ) => {
    console.log(form);
    if (isChecked) {
      setForms(
        (prevForms) =>
          (prevForms = {
            ...prevForms,
            questions: prevForms.questions.map((question) =>
              question.questionText === questionId
                ? {
                    ...question,
                    createAnswer: {
                      multipleAnswer: [
                        ...question.createAnswer.multipleAnswer,
                        question.answerOptions[optionIndex],
                      ].sort(),
                    },
                  }
                : question
            ),
          })
      );
    } else {
      setForms(
        (prevForms) =>
          (prevForms = {
            ...prevForms,
            questions: prevForms.questions.map((question) =>
              question.questionText === questionId
                ? {
                    ...question,
                    createAnswer: {
                      multipleAnswer: question.createAnswer.multipleAnswer
                        .filter((a) => a != question.answerOptions[optionIndex])
                        .sort(),
                    },
                  }
                : question
            ),
          })
      );
    }
  };

  const handleAnswerChange = (questionId: number, value: string) => {
    setForms(
      (prevForms) =>
        (prevForms = {
          ...prevForms,
          questions: prevForms.questions.map((question, index) =>
            index === questionId
              ? {
                  ...question,
                  createAnswer: { singleAnswer: value },
                }
              : {
                  ...question,
                  createAnswer: question.createAnswer,
                }
          ),
        })
    );
  };

  const handleAddOption = (questionId: string) => {
    setForms(
      (prevForms) =>
        (prevForms = {
          ...prevForms,
          questions: prevForms.questions.map((question) =>
            question.questionText === questionId
              ? { ...question, answerOptions: [...question.answerOptions, ""] }
              : question
          ),
        })
    );
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      questionText: "",
      type: 0,
      answerOptions: [],
      createAnswer: {},
    };
    setForms(
      (prevForms) =>
        (prevForms = {
          ...prevForms,
          questions: [...prevForms.questions, newQuestion],
        })
    );
  };

  const handleDeleteQuestion = (questionId: number) => {
    setForms(
      (prevForms) =>
        (prevForms = {
          ...prevForms,
          questions: prevForms.questions.filter(
            (q, index) => index !== questionId
          ),
        })
    );
  };

  const [showModal, toggleModal] = useState<boolean>(false);

  const handleToggleModal = () => {
    toggleModal(!showModal);
  };

  async function postTest(newForm: Form) {
    try {
      const response = await fetch(
        "https://constructor-dev-ed2c.onrender.com/api/v1/operationsOnTest/CreateTest",
        {
          method: "POST",
          body: JSON.stringify(newForm),
          credentials: "include",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      return response;
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  const handleSaveForm = () => {
    form.title = title;
    form.description = desc;
    form.timerInSeconds = String(timer);
    form.scoreToPass = score;
    form.failureMessage = badMessage;
    form.messageAboutPassing = goodMessage;

    const newForm = {
      title: form.title,
      description: form.description,
      scoreToPass: form.scoreToPass,
      timerInSeconds: String(form.timerInSeconds),
      startAt: form.startAt,
      endAt: form.endAt,
      messageAboutPassing: form.messageAboutPassing,
      failureMessage: form.failureMessage,
      questions: form.questions,
    };

    newForm.questions.map((question) =>
      question.type === 2
        ? (question.answerOptions = question.answerOptions
            ?.toString()
            .replace(new RegExp(",", "g"), " "))
        : question
    );
    console.log(newForm);
    postTest(newForm);
    navigate("/main");
    setShowSaveButton(true);
    handleToggleModal();
  };

  return (
    <>
      <Modal isOpen={showModal} toggle={handleToggleModal} isCrossNeeded={true}>
        <div className={styles["modal-block"]}>
          <div> Таймер </div>
          <div>
            <input
              className={styles["modal-input-number"]}
              placeholder="Часы"
              onChange={(e) =>
                handleTimerChange(parseInt(e.target.value) * 3600, "hours")
              }
            ></input>
            <input
              className={styles["modal-input-number"]}
              placeholder="Минуты"
              onChange={(e) =>
                handleTimerChange(parseInt(e.target.value) * 60, "minutes")
              }
            ></input>
            <input
              className={styles["modal-input-number"]}
              placeholder="Секунды"
              onChange={(e) =>
                handleTimerChange(parseInt(e.target.value), "seconds")
              }
            ></input>
          </div>
        </div>
        <div className={styles["modal-block"]}>
          <div>
            Добавление порога. Всего {form.questions.length}
            {2 <= form.questions.length && 4 >= form.questions.length
              ? " задания"
              : " заданий"}
          </div>
          <div>
            <input
              className={styles["modal-input-number"]}
              placeholder="Баллы"
              onChange={(e) => handleScoreChange(parseInt(e.target.value))}
            ></input>
          </div>
        </div>
        <div className={styles["modal-block"]}>
          <div>Сообщение для тех, кто не прошёл</div>
          <input
            className={styles["modal-input-message"]}
            placeholder="Введите сообщение"
            onChange={(e) => handleBadMessageChange(e.target.value)}
          ></input>
        </div>
        <div className={styles["modal-block"]}>
          <div>Сообщение для тех, кто прошёл</div>
          <input
            className={styles["modal-input-message"]}
            placeholder="Введите сообщение"
            onChange={(e) => handleGoodMessageChange(e.target.value)}
          ></input>
        </div>
        <div className={styles["modal-button-el"]}>
          <button onClick={() => handleSaveForm(form)}>
            Опубликовать тест
          </button>
        </div>
      </Modal>
      <div
        className={`${styles["constructor-container"]} ${
          showModal ? styles["display-none"] : styles["display-block"]
        }`}
      >
        <Header />
        <div className={styles["form-container"]}>
          <div className={styles["form-container"]}>
            <div className={styles["input-form-title"]}>
              Введите название теста
            </div>
            <input
              className={styles["question-form-top-name"]}
              value={form.title}
              type="text"
              placeholder="Название теста"
              onChange={(e) => handleTitleTextChange(e.target.value)}
            />
            <div className={styles["input-form-title"]}>
              Введите описание теста
            </div>
            <input
              className={styles["question-form-top-desc"]}
              value={form.description}
              type="text"
              placeholder="Описание теста"
              onChange={(e) => handleDescTextChange(e.target.value)}
            />
            <div className={styles["input-form-title"]}>Задания</div>

            {form.questions.map((question, index) => (
              <div key={index} className={styles["questionContainer"]}>
                <div className={styles["questionTop"]}>
                  <div>
                    <select
                      value={question.type}
                      className={styles["select-el"]}
                      onChange={(e) =>
                        handleAnswerTypeChange(index, Number(e.target.value))
                      }
                    >
                      <option value={0}>Выберите тип задания</option>
                      <option value={2}>Выбор варианта ответа</option>
                      <option value={4}>Ручной ввод ответа</option>
                      <option value={1}>Ручной ввод короткого ответа</option>
                      <option value={1}>Ручной ввод числа</option>
                    </select>
                  </div>
                  <input
                    className={styles["select-el"]}
                    placeholder="Описание задания"
                    value={question.questionText}
                    onChange={(e) =>
                      handleQuestionTextChange(index, e.target.value)
                    }
                  />
                </div>
                {question.type === 2 && (
                  <>
                    <div>Ответы</div>
                    {question.answerOptions.map((option, index) => (
                      <div key={index} className={styles["optionContainer"]}>
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            handleMultipleAnswersChange(
                              question.questionText,
                              index,
                              e.target.checked
                            )
                          }
                        />
                        <input
                          placeholder={`Вариант ${index + 1}`}
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(
                              question.questionText,
                              index,
                              e.target.value
                            )
                          }
                        />
                      </div>
                    ))}
                    <Button
                      onClick={() => handleAddOption(question.questionText)}
                      className={styles["addButton"]}
                    >
                      Добавить вариант ответа
                    </Button>
                  </>
                )}
                {question.type === 7 && (
                  <>
                    <div>Ответы</div>
                    {question.answerOptions?.map((option, index) => (
                      <div key={index} className={styles["optionContainer"]}>
                        <input
                          type="checkbox"
                          checked={question.createAnswer.multipleAnswer.includes(
                            option
                          )}
                          onChange={(e) =>
                            handleMultipleAnswersChange(
                              question.questionText,
                              index,
                              e.target.checked
                            )
                          }
                        />
                        <input
                          placeholder={`Вариант ${index + 1}`}
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(
                              question.questionText,
                              index,
                              e.target.value
                            )
                          }
                        />
                      </div>
                    ))}
                    <Button
                      onClick={() => handleAddOption(question.questionText)}
                      className={styles["addButton"]}
                    >
                      Добавить вариант ответа
                    </Button>
                  </>
                )}
                {question.type === 4 && (
                  <input
                    className={styles["input-type"]}
                    type="text"
                    placeholder="Введите ответ"
                    disabled
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                )}
                {/* {question.answerType === "1" && (
                  <input
                    className={styles["input-type"]}
                    type="text"
                    placeholder="Введите ответ"
                    value={question.createAnswer[0]}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                )} */}
                {question.type === 1 && (
                  <input
                    className={styles["input-type"]}
                    type="text"
                    placeholder="Введите ответ"
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                )}
                <div>
                  <Button
                    onClick={() => handleDeleteQuestion(index)}
                    className={styles["deleteButton"]}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
                <hr className={styles["horizontal"]} />
              </div>
            ))}
            <button
              className={styles["btn"]}
              onClick={() => handleAddQuestion()}
            >
              Добавить задание
            </button>
          </div>
          {
            <Button
              onClick={handleToggleModal}
              className={styles["publish-button"]}
            >
              Опубликовать тест
            </Button>
          }
          <div className="button-container">
            {showSaveButton && (
              <div>
                {" "}
                Ссылка на тест:
                <Button to={`http://localhost:5173/test/${param.id}`}>
                  {" "}
                  http://localhost:5173/test/{param.id}{" "}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
