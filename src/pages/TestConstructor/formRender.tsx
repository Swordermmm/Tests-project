import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  FormGroup,
  TextField,
  Button,
  Checkbox,
} from "@mui/material";

import styles from "./TestConstructor.module.scss";

interface Question {
  id: string;
  questionText: string;
  answerType: string;
  options?: string[];
}

interface FormData {
  title: string;
  desc: string;
  id: string | undefined;
  scoreToPass: number;
  questions: Question[];
}

interface FormRendererProps {
  formData: FormData[];
  id: string | undefined;
  setShowResponse: (show: boolean) => void;
}

function FormRenderer({ formData, id, setShowResponse }: FormRendererProps) {
  const [formResponses, setFormResponses] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const responseAnswers = formResponses.map((answer, index) => {
      const question = formData.find((form) => form.id === id)?.questions[
        index
      ];
      return {
        questionText: question?.questionText,
        answerType: question?.answerType,
        answer,
        options: question?.options,
      };
    });

    const formResponse = {
      title: formData[0].title,
      desc: formData[0].desc,
      id: formData[0].id,
      answers: responseAnswers,
      isChecked: false,
      scoreToPass: formData[0].scoreToPass,
      score: 0,
    };

    console.log(formResponse);

    localStorage.setItem("formResponse", JSON.stringify(formResponse));
    navigate("/check");
    window.location.reload();
  };

  const filteredData = formData.find((form) => form.id === id);

  const handleResponseChange = (questionIndex: number, e: any) => {
    const updatedResponses = [...formResponses];
    updatedResponses[questionIndex] = e.target.value;
    setFormResponses(updatedResponses);
  };

  const renderFormFields = () => {
    return (
      <FormControl
        className={styles["form-render-container"]}
        component="fieldset"
      >
        <FormGroup>
          <div className={styles["form-title"]}>{filteredData?.title}</div>
          <div className={styles["form-desc"]}>
            Описание: {filteredData?.desc}
          </div>
          {filteredData?.questions?.map((question, index) => (
            <Grid container key={index} spacing={2}>
              <div className="question-box">
                <Grid item xs={12}>
                  <p className="question-text">
                    {index + 1}.{question.questionText}
                  </p>
                </Grid>
                <Grid item xs={12}>
                  {question.answerType === "input-short" && (
                    <TextField
                      type="text"
                      fullWidth
                      className="questions"
                      value={formResponses[index] || ""}
                      onChange={(e) => handleResponseChange(index, e)}
                    />
                  )}
                  {question.answerType === "input-number" && (
                    <TextField
                      type="text"
                      fullWidth
                      className="questions"
                      value={formResponses[index] || ""}
                      onChange={(e) => handleResponseChange(index, e)}
                    />
                  )}
                  {question.answerType === "checkbox" && (
                    <FormGroup>
                      {question.options?.map((option, optionIndex) => (
                        <FormControlLabel
                          key={optionIndex}
                          control={
                            <Checkbox
                              checked={
                                formResponses[index]?.includes(option) || false
                              }
                              onChange={(e) => handleResponseChange(index, e)}
                              name={`checkbox-${index}`}
                              value={option}
                            />
                          }
                          label={option}
                        />
                      ))}
                    </FormGroup>
                  )}
                  {question.answerType === "input" && (
                    <TextField
                      type="text"
                      fullWidth
                      className="questions"
                      value={formResponses[index] || ""}
                      onChange={(e) => handleResponseChange(index, e)}
                    />
                  )}
                  {question.answerType === "radio" && (
                    <RadioGroup
                      aria-label={`radio-${index}`}
                      name={`radio-${index}`}
                      value={formResponses[index] || ""}
                      onChange={(e) => handleResponseChange(index, e)}
                    >
                      {question.options?.map((option, optionIndex) => (
                        <FormControlLabel
                          key={optionIndex}
                          value={option}
                          control={<Radio />}
                          label={option}
                        />
                      ))}
                    </RadioGroup>
                  )}
                </Grid>
              </div>
            </Grid>
          ))}
          <div className="button-container">
            <Button type="submit" variant="contained" color="primary">
              Сдать тест
            </Button>
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={() => setShowResponse(false)}
            >
              Вернуться
            </Button>
          </div>
        </FormGroup>
      </FormControl>
    );
  };

  return <form onSubmit={handleFormSubmit}>{renderFormFields()}</form>;
}

export default FormRenderer;
