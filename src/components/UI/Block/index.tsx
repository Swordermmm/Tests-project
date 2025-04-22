import { ElementType, FC } from "react";
import classNames from "classnames";
import styles from "./Block.module.scss";

interface BlockProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
}

export const Block: FC<BlockProps> = ({
  className,
  children,
  as: Component = "div",
  ...props
}) => {
  return (
    <Component className={classNames(styles.block, className)} {...props}>
      {children}
    </Component>
  );
};
