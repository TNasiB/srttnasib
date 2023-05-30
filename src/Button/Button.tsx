import { FC } from "react";
import "./Button.scss";

interface ButtonProps {
  children: string;
}

const Button: FC<ButtonProps> = (props: ButtonProps) => (
  <button className="button">{props.children}</button>
);

export default Button;
