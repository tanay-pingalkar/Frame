import React, { useEffect, useState } from "react";
import { useGetFrames } from "../utils/useGetFrame";
import { frame, frames } from "../utils/types";
import Frame from "./frame";
import "../styles/frame.scss";

const Frames = () => {
  const [offset, setOffset] = useState(0);
  const frames = useGetFrames(offset);
  const [show, setshow] = useState<frames>([]);
  const [i, seti] = useState(0);
  useEffect(() => {
    const ar: Array<frame> = [];
    console.log(frames);
    if (frames.length !== 0) {
      ar.push(frames[i]);
      ar.push(frames[i + 1]);
      ar.push(frames[i + 2]);
      setshow(ar);
      seti(i + 1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frames]);

  return (
    <div
      className="frames"
      onWheel={(e) => {
        if (e.deltaY < 0) {
          const ar: Array<frame> = [];
          console.log(i);
          if (frames.length !== 0 && i > 0) {
            if (frames[i]) ar.push(frames[i]);
            if (frames[i - 1]) ar.push(frames[i - 1]);
            if (frames[i - 2]) ar.push(frames[i - 2]);
            setshow(ar);
            seti(i - 1);
          }
        } else {
          const ar: Array<frame> = [];
          if (frames.length !== 0) {
            if (frames[i]) ar.push(frames[i]);
            if (frames[i + 1]) ar.push(frames[i + 1]);
            if (frames[i + 2]) ar.push(frames[i + 2]);
            setshow(ar);
            if (i === 8 * offset + 1) {
              setOffset(offset + 1);
            }
            seti(i + 1);
          }
        }
        console.log(show);
      }}
    >
      {show.map((frame: frame) => (
        <div>
          <Frame frame={frame}></Frame>
        </div>
      ))}
      <button onClick={() => setOffset(offset + 1)}>more</button>
    </div>
  );
};
export default Frames;
