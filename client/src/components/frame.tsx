import React from "react";
import { frame } from "../utils/types";
import "../styles/frame.scss";
interface props {
  frame: frame;
}
const Frame: React.FC<props> = ({ frame }) => {
  return (
    <div className="card">
      <p className="name">{frame.frame.user.name}</p>
      <p className="title">{frame.frame.title}</p>
      <img src={frame.frame.frame} alt="lol" className="img"></img>
      <p className="description">{frame.frame.description}</p>
    </div>
  );
};

export default Frame;
