import React from "react";
import "../styles/loginWrapper.scss";

type props = JSX.IntrinsicAttributes &
  React.ClassAttributes<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement>;

const LoginWrapper: React.FC<props> = (props) => {
  return (
    <div {...props} className="screen">
      <div className="board"></div>
      {/* eslint-disable-next-line react/prop-types  */}
      <div className="form">{props.children}</div>
    </div>
  );
};

export default LoginWrapper;
