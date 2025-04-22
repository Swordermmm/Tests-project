import classNames from "classnames";
import { FC, HTMLAttributes, PropsWithChildren } from "react";
import styles from "./Container.module.scss";

interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {}

export const Container: FC<ContainerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={classNames(styles.container, className)} {...props}>
      {children}
    </div>
  );
};
