import { FC, useEffect, useState } from "react";
import FormRenderer from "./formRender";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { Modal } from "../../components/UI/Modal";

import { v4 as uuid } from "uuid";
import { Button } from "@mui/material";
import styles from "./TestConstructor.module.scss";
import DeleteIcon from "../../assets/delete-icon.svg";

import ITest from "../../types";

interface Question {
  id: string;
  questionText: string;
  answerType: string;
  options: string[];
}

interface Form {
  title: string;
  desc: string;
  id: string | undefined;
  scoreToPass: number;
  timer: number;
  messagePass: string;
  messageNotPass: string;
  questions: Question[];
}

export const TestConstructor: FC = () => {
  const [showResponse, setShowResponse] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [score, setScore] = useState(0);
  const [badMessage, setBadMessage] = useState("");
  const [goodMessage, setGoodMessage] = useState("");
  const [timer, setTimer] = useState(0);
  const param = useParams();
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [forms, setForms] = useState<Form[]>([
    {
      title: "",
      desc: "",
      id: param.id,
      scoreToPass: 0,
      timer: 0,
      messagePass: "",
      messageNotPass: "",
      questions: [
        {
          id: uuid(),
          questionText: "",
          answerType: "",
          options: [],
        },
      ],
    },
  ]);

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
    localStorage.setItem("forms", JSON.stringify(forms));
    setTimer(
      Object.values(timerValues).reduce((accumulator, value) => {
        return accumulator + value;
      })
    );
  }, [forms, timerValues]);

  const handleQuestionTextChange = (
    formId: string | undefined,
    questionId: string,
    value: string
  ) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              questions: form.questions.map((question) =>
                question.id === questionId
                  ? { ...question, questionText: value }
                  : question
              ),
            }
          : form
      )
    );
  };

  const handleTitleTextChange = (formId: string | undefined, value: string) => {
    setTitle(value);
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              title: value,
            }
          : form
      )
    );
  };

  const handleTimerChange = (
    formId: string | undefined,
    value: number,
    word: string
  ) => {
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

    let newTimer = Object.values(timerValues).reduce((accumulator, value) => {
      return accumulator + value;
    });

    setTimer(newTimer);

    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              timer: newTimer,
            }
          : form
      )
    );
  };

  const handleScoreChange = (formId: string | undefined, value: number) => {
    setScore(value);
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              scoreToPass: value,
            }
          : form
      )
    );
  };

  const handleGoodMessageChange = (
    formId: string | undefined,
    value: string
  ) => {
    setGoodMessage(value);
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              messagePass: value,
            }
          : form
      )
    );
  };

  const handleBadMessageChange = (
    formId: string | undefined,
    value: string
  ) => {
    setBadMessage(value);
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              messageNotPass: value,
            }
          : form
      )
    );
  };

  const handleDescTextChange = (formId: string | undefined, value: string) => {
    setDesc(value);
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              desc: value,
            }
          : form
      )
    );
  };

  const handleAnswerTypeChange = (
    formId: string | undefined,
    questionId: string,
    value: string
  ) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              questions: form.questions.map((question) =>
                question.id === questionId
                  ? { ...question, answerType: value, options: [] }
                  : question
              ),
            }
          : form
      )
    );
  };

  const handleOptionChange = (
    formId: string | undefined,
    questionId: string,
    optionIndex: number,
    value: string
  ) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              questions: form.questions.map((question) =>
                question.id === questionId
                  ? {
                      ...question,
                      options: question.options.map((option, index) =>
                        index === optionIndex ? value : option
                      ),
                    }
                  : question
              ),
            }
          : form
      )
    );
  };

  const handleAddOption = (formId: string | undefined, questionId: string) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              questions: form.questions.map((question) =>
                question.id === questionId
                  ? { ...question, options: [...question.options, ""] }
                  : question
              ),
            }
          : form
      )
    );
  };

  const handleAddQuestion = (formId: string | undefined) => {
    const newQuestion: Question = {
      id: uuid(),
      questionText: "",
      answerType: "",
      options: [],
    };
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? { ...form, questions: [...form.questions, newQuestion] }
          : form
      )
    );
  };

  const handleDeleteQuestion = (
    formId: string | undefined,
    questionId: string
  ) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              questions: form.questions.filter((q) => q.id !== questionId),
            }
          : form
      )
    );
  };

  const [showModal, toggleModal] = useState<boolean>(false);

  const handleToggleModal = () => {
    toggleModal(!showModal);
  };

  function CreateTest(test: ITest) {
    const headers: Headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");

    const request: RequestInfo = new Request(
      "https://constructor-dev-ed2c.onrender.com/api/v1/operationsOnTest/CreateTest",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(test),
      }
    );

    // Send the request and print the response
    return fetch(request).then((res) => {
      console.log("got response:", res);
    });
  }

  const handleSaveForm = () => {
    forms[0].title = title;
    forms[0].desc = desc;
    forms[0].timer = timer;
    forms[0].scoreToPass = score;
    forms[0].messageNotPass = badMessage;
    forms[0].messagePass = goodMessage;

    const currentDate = new Date();
    const newDate = new Date(currentDate.getTime() + 2000 * 60 * 60 * 24);

    const questions = forms[0].questions.map((question, index) =>
      true
        ? {
            ...question,
            questionText: question.questionText,
            type: question.answerType,
            mark: 1,
            order: index + 1,
          }
        : question
    );

    // const test: ITest = {
    //   title: forms[0].title,
    //   startAt: currentDate,
    //   endAt: newDate,
    //   scoreToPass: forms[0].scoreToPass,
    //   manualCheck: true,
    //   questions: [

    //   ]
    // };
    setShowSaveButton(true);
    handleToggleModal();
  };

  const handleOpenForm = () => {
    setShowResponse(true);
  };

  return (
    <>
      <Modal isOpen={showModal} toggle={handleToggleModal}>
        <div className={styles["modal-block"]}>
          <div> Таймер </div>
          <div>
            <input
              className={styles["modal-input-number"]}
              placeholder="Часы"
              onChange={(e) =>
                handleTimerChange(
                  forms[0].id,
                  parseInt(e.target.value) * 3600,
                  "hours"
                )
              }
            ></input>
            <input
              className={styles["modal-input-number"]}
              placeholder="Минуты"
              onChange={(e) =>
                handleTimerChange(
                  forms[0].id,
                  parseInt(e.target.value) * 60,
                  "minutes"
                )
              }
            ></input>
            <input
              className={styles["modal-input-number"]}
              placeholder="Секунды"
              onChange={(e) =>
                handleTimerChange(
                  forms[0].id,
                  parseInt(e.target.value),
                  "seconds"
                )
              }
            ></input>
          </div>
        </div>
        <div className={styles["modal-block"]}>
          <div>Добавление порога</div>
          <div>
            <input
              className={styles["modal-input-number"]}
              placeholder="Баллы"
              onChange={(e) =>
                handleScoreChange(forms[0].id, parseInt(e.target.value))
              }
            ></input>
          </div>
        </div>
        <div className={styles["modal-block"]}>
          <div>Сообщение для тех, кто не прошёл</div>
          <input
            className={styles["modal-input-message"]}
            placeholder="Введите сообщение"
            onChange={(e) =>
              handleBadMessageChange(forms[0].id, e.target.value)
            }
          ></input>
        </div>
        <div className={styles["modal-block"]}>
          <div>Сообщение для тех, кто прошёл</div>
          <input
            className={styles["modal-input-message"]}
            placeholder="Введите сообщение"
            onChange={(e) =>
              handleGoodMessageChange(forms[0].id, e.target.value)
            }
          ></input>
        </div>
        <div className={styles["modal-button-el"]}>
          <button onClick={handleSaveForm}>Опубликовать тест</button>
        </div>
      </Modal>
      <div
        className={`${styles["constructor-container"]} ${
          showModal ? styles["display-none"] : styles["display-block"]
        }`}
      >
        <Header />
        <div className={styles["form-container"]}>
          {!showResponse &&
            forms.map((form) => (
              <div key={form.id} className={styles["form-container"]}>
                <div className={styles["input-form-title"]}>
                  Введите название теста
                </div>
                <input
                  className={styles["question-form-top-name"]}
                  type="text"
                  placeholder="Название теста"
                  onChange={(e) =>
                    handleTitleTextChange(form.id, e.target.value)
                  }
                />
                <div className={styles["input-form-title"]}>
                  Введите описание теста
                </div>
                <input
                  className={styles["question-form-top-desc"]}
                  type="text"
                  placeholder="Описание теста"
                  onChange={(e) =>
                    handleDescTextChange(form.id, e.target.value)
                  }
                />
                <div className={styles["input-form-title"]}>Задания</div>

                {form.questions.map((question) => (
                  <div
                    key={question.id}
                    className={styles["questionContainer"]}
                  >
                    <div className={styles["questionTop"]}>
                      <div>
                        <select
                          value={question.answerType}
                          className={styles["select-el"]}
                          onChange={(e) =>
                            handleAnswerTypeChange(
                              form.id,
                              question.id,
                              e.target.value
                            )
                          }
                        >
                          <option value="">Выберите тип задания</option>
                          <option value="radio">
                            Выбор одного варианта ответа
                          </option>
                          {/* <option value="checkbox">
                            Выбор нескольких вариантов ответа
                          </option> */}
                          <option value="input">Ручной ввод ответа</option>
                          <option value="input-short">
                            Ручной ввод короткого ответа
                          </option>
                          <option value="input-number">
                            Ручной ввод числа
                          </option>
                        </select>
                      </div>
                      <input
                        className={styles["select-el"]}
                        placeholder="Описание задания"
                        value={question.questionText}
                        onChange={(e) =>
                          handleQuestionTextChange(
                            form.id,
                            question.id,
                            e.target.value
                          )
                        }
                      />
                    </div>
                    {question.answerType === "checkbox" && (
                      <>
                        <div>Ответы</div>
                        {question.options.map((option, index) => (
                          <div
                            key={index}
                            className={styles["optionContainer"]}
                          >
                            <input
                              placeholder={`Вариант ${index + 1}`}
                              value={option}
                              onChange={(e) =>
                                handleOptionChange(
                                  form.id,
                                  question.id,
                                  index,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        ))}
                        <button
                          onClick={() => handleAddOption(form.id, question.id)}
                          className={styles["addButton"]}
                        >
                          Добавить вариант ответа
                        </button>
                      </>
                    )}
                    {question.answerType === "radio" && (
                      <>
                        <div>Ответы</div>
                        {question.options.map((option, index) => (
                          <div
                            key={index}
                            className={styles["optionContainer"]}
                          >
                            <input
                              placeholder={`Вариант ${index + 1}`}
                              value={option}
                              onChange={(e) =>
                                handleOptionChange(
                                  form.id,
                                  question.id,
                                  index,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        ))}
                        <button
                          onClick={() => handleAddOption(form.id, question.id)}
                          className={styles["addButton"]}
                        >
                          Добавить вариант ответа
                        </button>
                      </>
                    )}
                    {question.answerType === "input" && (
                      <input
                        className={styles["input-type"]}
                        type="text"
                        placeholder="Введите ответ"
                      />
                    )}
                    {question.answerType === "input-short" && (
                      <input
                        className={styles["input-type"]}
                        type="text"
                        placeholder="Введите ответ"
                      />
                    )}
                    {question.answerType === "input-number" && (
                      <input
                        className={styles["input-type"]}
                        type="text"
                        placeholder="Введите ответ"
                      />
                    )}
                    <div>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() =>
                          handleDeleteQuestion(form.id, question.id)
                        }
                        className={styles["deleteButton"]}
                        startIcon={<DeleteIcon />}
                      ></Button>
                    </div>
                  </div>
                ))}
                <button
                  className={styles["btn"]}
                  onClick={() => handleAddQuestion(form.id)}
                >
                  Добавить задание
                </button>
              </div>
            ))}
          {!showResponse && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleToggleModal}
            >
              Опубликовать тест
            </Button>
          )}
          {showResponse && showSaveButton && (
            <FormRenderer
              formData={forms}
              id={param.id}
              setShowResponse={setShowResponse}
            />
          )}
          <div className="button-container">
            {!showResponse && showSaveButton && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenForm}
              >
                Прототип вида от тестируемого
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
