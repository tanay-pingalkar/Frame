import React from "react";
import { frame } from "../utils/types";

interface props {
  frame: frame;
}
const Frame: React.FC<props> = ({ frame }) => {
  return <h1>{frame.title}</h1>;
};

export default Frame;
