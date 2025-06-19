import { FC, useState, useEffect } from "react";
import styles from "./Timer.module.scss";

interface Props {
  time: number;
  onZero: (e: React.FormEvent<HTMLFormElement>) => void;
}

interface TimeState {
  time: number;
  seconds: number;
  minutes: number;
}

export const Timer: FC<Props> = ({ time, onZero }) => {
  const [timer, setTime] = useState<TimeState>({
    time,
    seconds: time - Math.floor((time - 1) / 60) * 60 - 1,
    minutes: Math.floor((time - 1) / 60),
  });

  useEffect(() => {
    setTimeout(() => {
      if (timer.time === 0) {
        onZero;
      }

      setTime({
        time: timer.time - 1,
        minutes: Math.floor((timer.time - 1) / 60),
        seconds: timer.time - Math.floor((timer.time - 1) / 60) * 60 - 1,
      });
    }, 1000);
  }, [timer.time]);

  return (
    <h2 className={styles["timer"]}>
      Время:{" "}
      {`${timer.minutes}:${
        timer.seconds <= 10 ? `0${timer.seconds}` : timer.seconds
      }`}
    </h2>
  );
};
