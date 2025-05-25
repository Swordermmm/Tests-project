import styles from "./Modal.module.scss";
import CloseIcon from "../../../assets/close-icon.svg";

import React, { ReactNode } from "react";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export function Modal(props: ModalType) {
  return (
    <div
      className={`${styles["modal"]} ${
        props.isOpen ? styles["display-block"] : styles["display-none"]
      }`}
    >
      <div className={styles["modal-main"]}>
        <button className={styles["close-button"]} onClick={props.toggle}>
          <CloseIcon />
        </button>
        <hr></hr>
        <div className={styles["modal-box"]}>{props.children}</div>
      </div>
    </div>
  );
}
