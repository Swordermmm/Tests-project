import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/UI/Button";
import { Timer } from "../../components/UI/Timer";
import { Modal } from "../../components/UI/Modal";

import styles from "./Test.module.scss";

interface Question {
  id: string;
  testId: string;
  questionText: string;
  type: string;
  answers?: {
    answerOptions?: string[];
  };
}

export interface ITest {
  isActive: boolean;
  manualCheck: boolean;
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  scoreToPass: number;
  timerInSeconds: number;
  questions: Question[];
}

export interface IAnswer {
  textAnswer?: string;
  multipleAnswer?: string[];
  questionId: string;
}

interface FormRendererProps {
  formData: ITest;
  setShowResponse: (show: boolean) => void;
  normalisedResponse: IAnswer[];
}

function FormRenderer({
  formData,
  setShowResponse,
  normalisedResponse,
}: FormRendererProps) {
  const [formResponses, setFormResponses] =
    useState<IAnswer[]>(normalisedResponse);

  const [showModal, toggleModal] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [secondName, setSecondName] = useState<string>("");
  const [patronymic, setPatronymic] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    console.log(formData);
  }, []);

  async function postSolution(formResponses: any) {
    try {
      console.log(formResponses);
      const response = await fetch(
        `https://constructor-dev-ed2c.onrender.com/api/v1/UserSolution/${params.id}`,
        {
          method: "Post",
          body: JSON.stringify(formResponses),
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

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formResponse = {
      firstName: name,
      secondName: secondName,
      patronymic: patronymic,
      email: email,
      answers: formResponses,
    };
    navigate("/register");
    postSolution(formResponse);
  };

  const handleResponseChange = (questionIndex: number, e: any) => {
    const updatedResponses = [...formResponses];
    updatedResponses[questionIndex] = {
      questionId: formData.questions[questionIndex].id,
      textAnswer: e.target.value,
    };
    setFormResponses((updatedrespose) => (updatedrespose = updatedResponses));
  };

  const handleMultipleChange = (
    questionIndex: number,
    option: string,
    isChecked: boolean
  ) => {
    const updatedResponses = [...formResponses];
    if (isChecked) {
      updatedResponses[questionIndex] = {
        ...updatedResponses[questionIndex],
        questionId: formData.questions[questionIndex].id,
        multipleAnswer: [
          ...updatedResponses[questionIndex].multipleAnswer,
          option,
        ].sort(),
      };
      setFormResponses((updatedrespose) => (updatedrespose = updatedResponses));
    } else {
      updatedResponses[questionIndex].multipleAnswer = updatedResponses[
        questionIndex
      ].multipleAnswer?.filter((opt) => opt != option);
      setFormResponses((updatedrespose) => (updatedrespose = updatedResponses));
    }
  };

  const handleNameChange = (value: string) => {
    setName((prevName) => (prevName = value));
  };

  const handleSecondNameChange = (value: string) => {
    setSecondName((prevSecondName) => (prevSecondName = value));
  };
  const handlePatronymicChange = (value: string) => {
    setPatronymic((prevPatronymic) => (prevPatronymic = value));
  };

  const handleEmailChange = (value: string) => {
    setEmail((prevEmail) => (prevEmail = value));
  };

  const handleModalToggle = () => {
    toggleModal(false);
  };

  const renderFormFields = () => {
    return (
      <>
        <div className={styles["form-render-container"]}>
          <div className={styles["form-render-wrapper"]}>
            <div className={styles["form-title"]}>{formData.title}</div>
            <div className={styles["form-desc"]}>
              Описание: {formData.description}
            </div>
            <Timer
              time={formData.timerInSeconds}
              onZero={handleFormSubmit}
            ></Timer>
            {formData.questions.map((question, index) => (
              <div key={index}>
                <div className={styles["question-box"]}>
                  <div>
                    <p className={styles["question-text"]}>
                      {index + 1}. {question.questionText}
                    </p>
                    <hr />
                  </div>
                  <div className={styles["question-options-container"]}>
                    {question.type === "SingleAnswer" && (
                      <input
                        placeholder="Напишите ответ"
                        type="text"
                        value={formResponses[index].textAnswer || ""}
                        onChange={(e) => handleResponseChange(index, e)}
                      />
                    )}
                    {question.type === "DetailedAnswer" && (
                      <input
                        placeholder="Напишите ответ"
                        type="text"
                        value={formResponses[index].textAnswer || ""}
                        onChange={(e) => handleResponseChange(index, e)}
                      />
                    )}
                    {question.type === "MultiplyAnswer" && (
                      <>
                        {question.answers?.answerOptions?.map((option) => (
                          <div className={styles["optionContainer"]}>
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                handleMultipleChange(
                                  index,
                                  option,
                                  e.target.checked
                                )
                              }
                            />
                            <p>{option}</p>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className={styles["btn-container"]}>
              <Button type="submit" className={styles["submit-btn"]}>
                Завершить Тест
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Modal
        isOpen={showModal}
        toggle={handleModalToggle}
        isCrossNeeded={false}
      >
        <div className={styles["modal-title"]}>Заполнение данных</div>
        <div className={styles["modal-block"]}>
          <div>Имя</div>
          <input
            placeholder="Введите имя"
            onChange={(e) => handleNameChange(e.target.value)}
          ></input>
        </div>
        <div className={styles["modal-block"]}>
          <div>Фамилия</div>
          <input
            placeholder="Введите фамилию"
            onChange={(e) => handleSecondNameChange(e.target.value)}
          ></input>
        </div>
        <div className={styles["modal-block"]}>
          <div>Отчество</div>
          <input
            placeholder="Введите отчество"
            onChange={(e) => handlePatronymicChange(e.target.value)}
          ></input>
        </div>
        <div className={styles["modal-block"]}>
          <div>Почта</div>
          <input
            placeholder="Введите почту"
            onChange={(e) => handleEmailChange(e.target.value)}
          ></input>
        </div>
        <Button
          onClick={handleModalToggle}
          className={styles["modal-button-el"]}
        >
          Перейти к тесту
        </Button>
      </Modal>
      <form
        className={`${styles["form-container"]} ${
          showModal ? styles["display-none"] : styles["display-block"]
        }`}
        onSubmit={handleFormSubmit}
      >
        {renderFormFields()}
      </form>
    </>
  );
}

export default FormRenderer;
