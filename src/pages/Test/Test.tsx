import { useParams } from "react-router-dom";
import { FC, useState, useEffect } from "react";
import FormRenderer from "./formRender";
import { ITest } from "./formRender";
import styles from "./Test.module.scss";

export const Test: FC = () => {
  const [showResponse, setShowResponse] = useState(false);
  const [loading, setLoading] = useState(true);

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
    return <FormRenderer formData={form} setShowResponse={setShowResponse} />;
  } else {
    return <div> Загрузка </div>;
  }
};
