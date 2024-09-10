import React from "react";
import { IButtonProps } from "../../types.ts";

const Button: React.FC<IButtonProps> = ({
  onClick,
  children,
  className,
  type,
}) => {
  return (
    <button onClick={onClick} className={className} type={type}>
      {children}
    </button>
  );
};

export default Button;
