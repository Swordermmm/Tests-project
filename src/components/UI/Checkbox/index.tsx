import {
  Checkbox as AntDCheckbox,
  CheckboxProps as AntDCheckboxProps,
} from "antd";
import { FC } from "react";

interface CheckboxProps extends AntDCheckboxProps {
  label?: string;
}

export const Checkbox: FC<CheckboxProps> = ({ label, ...props }) => {
  return <AntDCheckbox {...props}>{label}</AntDCheckbox>;
};
