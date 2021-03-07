import React from "react";
import "../styles/loginWrapper.scss";

const LoginWrapper = (
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement>
) => {
  return (
    <div {...props} className="screen">
      <div className="board"></div>
      <div className="form">{props.children}</div>
    </div>
  );
};

export default LoginWrapper;
