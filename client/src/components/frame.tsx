import React from "react";
import { frame } from "../utils/types";
import "../styles/frame.scss";
interface props {
  frame: frame;
}
const Frame: React.FC<props> = ({ frame }) => {
  return (
    <div className="card">
      <p className="name">{frame.user.name}</p>
      <p className="title">{frame.title}</p>
      <img src={frame.frame} alt="lol" className="img"></img>
      <p className="description">{frame.description}</p>
    </div>
  );
};

export default Frame;
