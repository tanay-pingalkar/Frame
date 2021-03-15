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
    console.log(frames);
    if (frames.length !== 0) {
      seti(i + 1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frames]);
  return (
    <div
      className="frames"
      onWheel={(e) => {
        if (e.deltaY < 0) {
          if (frames.length !== 0 && i > 0) {
            seti(i - 1);
          }
        } else {
          if (frames.length !== 0 && frames.length - 1 !== i) {
            if (i === 8 * offset + 1) {
              setOffset(offset + 1);
            }
            seti(i + 1);
          }
        }
      }}
    >
      {frames.length !== 0 ? (
        <div>
          {frames[i] ? <p>{frames[i].title}</p> : <span></span>}
          {frames[i + 1] ? (
            <Frame frame={frames[i + 1]}></Frame>
          ) : (
            <span></span>
          )}
          {frames[i + 2] ? <p>{frames[i + 2].title}</p> : <span></span>}
        </div>
      ) : (
        <h1>loading</h1>
      )}

      <button onClick={() => setOffset(offset + 1)}>more</button>
    </div>
  );
};
export default Frames;
