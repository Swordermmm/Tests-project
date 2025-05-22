import { FC, useEffect, useState } from "react";
import FormRenderer from "./formRender";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header";

import { v4 as uuid } from "uuid";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import styles from "./TestConstructor.module.scss";
import DeleteIcon from "../../assets/delete-icon.svg";

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
  questions: Question[];
}

export const TestConstructor: FC = () => {
  const [showResponse, setShowResponse] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const param = useParams();
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [forms, setForms] = useState<Form[]>([
    {
      title: "",
      desc: "",
      id: param.id,
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

  useEffect(() => {
    localStorage.setItem("forms", JSON.stringify(forms));
  }, [forms]);

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
    const newQuestion = {
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

  const handleCopyQuestion = (
    formId: string | undefined,
    questionId: string
  ) => {
    const copiedQuestion = {
      ...forms
        .find((form) => form.id === formId)
        ?.questions.find((q) => q.id === questionId),
    } as Question;
    copiedQuestion.id = uuid();
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? { ...form, questions: [...form.questions, copiedQuestion] }
          : form
      )
    );
  };
  const handleSaveForm = () => {
    forms[0].title = title;
    forms[0].desc = desc;
    console.log(forms);
    setShowSaveButton(true);
  };

  const handleOpenForm = () => {
    setShowResponse(true);
  };

  return (
    <div className={styles["constructor-container"]}>
      <Header />
      <div className={styles["form-container"]}>
        {!showResponse &&
          forms.map((form) => (
            <div key={form.id} className={styles["form-container"]}>
              {/* <Typography variant="h6">Form {form.id}</Typography> */}
              <div className={styles["input-form-title"]}>
                Введите название теста
              </div>
              <input
                className={styles["question-form-top-name"]}
                type="text"
                placeholder="Название теста"
                onChange={(e) => handleTitleTextChange(form.id, e.target.value)}
              />
              <div className={styles["input-form-title"]}>
                Введите описание теста
              </div>
              <input
                className={styles["question-form-top-desc"]}
                type="text"
                placeholder="Описание теста"
                onChange={(e) => handleDescTextChange(form.id, e.target.value)}
              />
              <div className={styles["input-form-title"]}>Задания</div>

              {form.questions.map((question) => (
                <div key={question.id} className={styles["questionContainer"]}>
                  <div className={styles["questionTop"]}>
                    <FormControl fullWidth>
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
                        <option value="checkbox">
                          Выбор нескольких вариантов ответа
                        </option>
                        <option value="input">Ручной ввод ответа</option>
                        <option value="input-short">
                          Ручной ввод короткого ответа
                        </option>
                        <option value="input-number">Ручной ввод числа</option>
                      </select>
                    </FormControl>
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
                        <div key={index} className={styles["optionContainer"]}>
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
                        <div key={index} className={styles["optionContainer"]}>
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
                      onClick={() => handleDeleteQuestion(form.id, question.id)}
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
          <Button variant="contained" color="primary" onClick={handleSaveForm}>
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
  );
};
