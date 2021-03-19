import React, { useEffect, useState } from "react";
import { useGetFrames } from "../utils/useGetFrame";
import { frame, frames } from "../utils/types";
import Frame from "./frame";
import "../styles/frame.scss";

const Frames = () => {
  const [offset, setOffset] = useState(0);
  const frames = useGetFrames(offset);
  const [i, seti] = useState(0);
  useEffect(() => {
    reset();
    document.querySelectorAll(".card")[i]?.classList.add("above");
    document.querySelectorAll(".card")[i + 1]?.classList.add("view");
    document.querySelectorAll(".card")[i + 2]?.classList.add("below");
    seti(i + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frames]);
  return (
    <div
      className="frames"
      onWheel={async (e) => {
        console.log(i);
        if (e.deltaY < 0) {
          if (frames.length !== 0 && i > 0) {
            reset();
            document.querySelectorAll(".card")[i]?.classList.add("above");
            document.querySelectorAll(".card")[i - 1]?.classList.add("view");
            document.querySelectorAll(".card")[i - 2]?.classList.add("below");
            seti(i - 1);
          }
        } else {
          if (frames.length !== 0 && frames.length - 1 !== i) {
            reset();
            document.querySelectorAll(".card")[i]?.classList.add("above");
            document.querySelectorAll(".card")[i + 1]?.classList.add("view");
            document.querySelectorAll(".card")[i + 2]?.classList.add("below");
            if (i === 8 * offset + 1) {
              setOffset(offset + 1);
            }
            seti(i + 1);
          }
        }
      }}
    >
      {frames.map((frame: frame) => (
        <Frame frame={frame}></Frame>
      ))}
    </div>
  );
};
export default Frames;

function reset() {
  document.querySelectorAll(".card").forEach((child) => {
    child.className = "card";
  });
}
