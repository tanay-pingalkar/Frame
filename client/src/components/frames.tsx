import React, { useState } from "react";
import { useGetFrames } from "../utils/useGetFrame";
import { frame } from "../utils/types";
import Frame from "./frame";

const Frames = () => {
  const [offset, setOffset] = useState(0);
  const frames = useGetFrames(offset);
  return (
    <div
      className="frames"
      onWheelCapture={(e) => {
        console.log(e);
      }}
    >
      {frames.map((frame: frame) => (
        <Frame frame={frame}></Frame>
      ))}
      <button onClick={() => setOffset(offset + 1)}>more</button>
    </div>
  );
};
export default Frames;
