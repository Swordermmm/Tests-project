import { FC } from "react";
import { Radio as AntDRadio, RadioGroupProps } from "antd";

const SingleRadio: FC<RadioGroupProps> = ({ children, ...props }) => {
  return <AntDRadio {...props}>{children}</AntDRadio>;
};

const RadioGroup: FC<RadioGroupProps> = (props) => {
  return <AntDRadio.Group {...props} />;
};

export const Radio = Object.assign(SingleRadio, {
  Group: RadioGroup,
});
