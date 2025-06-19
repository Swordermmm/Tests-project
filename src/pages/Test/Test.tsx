import { useParams } from "react-router-dom";
import { FC, useState, useEffect } from "react";
import FormRenderer from "./formRender";
import { ITest, IAnswer } from "./formRender";

export const Test: FC = () => {
  const [showResponse, setShowResponse] = useState(false);
  const [loading, setLoading] = useState(true);

  function normaliseFormRespone() {
    let newResponse: IAnswer[] = [];
    for (var question of form.questions) {
      let newQuestion: IAnswer;
      switch (question.type) {
        case "MultiplyAnswer":
          newQuestion = {
            questionId: question.id,
            multipleAnswer: [],
          };
          break;
        case "DetailedAnswer":
          newQuestion = {
            questionId: question.id,
            textAnswer: "",
          };
          break;
        default:
          newQuestion = {
            questionId: question.id,
            textAnswer: "",
          };
          break;
      }
      newResponse.push(newQuestion);
    }
    return newResponse;
  }

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

  const params = useParams();

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
      setLoading(false);
    }
  }

  useEffect(() => {
    getTest();
  }, []);

  if (form && !loading) {
    return (
      <FormRenderer
        formData={form}
        setShowResponse={setShowResponse}
        normalisedResponse={normaliseFormRespone()}
      />
    );
  } else {
    return <div> Загрузка </div>;
  }
};
