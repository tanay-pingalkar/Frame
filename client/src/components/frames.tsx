import React from "react";
import { frames, frame } from "../utils/types";
import Frame from "./frame";

interface props {
  frames: frames;
}
const Frames: React.FC<props> = ({ frames }) => {
  return (
    <div>
      {frames.map((frame: frame) => (
        <Frame frame={frame}></Frame>
      ))}
    </div>
  );
};
export default Frames;
