import React, { useEffect, useState } from "react";
import { useGetFrames } from "../utils/useGetFrame";
import { frame, state } from "../utils/types";
import Frame from "./frame";
import "../styles/frame.scss";
import { useSelector } from "react-redux";
import { useDrag } from "react-use-gesture";
import { useUp } from "../utils/up";
import { up as upFunc } from "../utils/up";
import { useDown } from "../utils/down";

const Frames = () => {
  const [i, seti] = useState(0);
  const [noWayBack, setNoWayBack] = useState(0);
  const [doo, setdo] = useState(true);
  const [lastframe, setlastframe] = useState(0);

  const { id } = useSelector((state: state) => state.userInfo);

  const frames = useGetFrames(Number(id), lastframe);
  const up = useUp(frames, seti, i, setNoWayBack, noWayBack, setlastframe);
  const down = useDown(frames, seti, i);

  useEffect(() => {
    if (frames.length > 0 && frames.length < 9) {
      upFunc(i);
      seti(i + 1);
      setNoWayBack(noWayBack + 1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frames]);

  const bind = useDrag((state) => {
    if (state._movement[1] < -7 && doo) {
      const bool = up();
      if (bool) {
        setdo(false);
        const above = document.querySelector(".card.view") as HTMLElement;
        above.addEventListener("animationend", () => {
          setdo(true);
        });
      }
    }
    if (state._movement[1] > 7 && doo) {
      const bool = down();
      if (bool) {
        setdo(false);
        const above = document.querySelector(".card.view") as HTMLElement;
        above.addEventListener("animationend", () => {
          setdo(true);
        });
      }
    }
  });
  return (
    <div
      className="frames"
      {...bind()}
      onWheel={(e) => {
        if (doo) {
          if (e.deltaY < 0) {
            const bool = down();
            if (bool) {
              setdo(false);
              const above = document.querySelector(".card.view") as HTMLElement;
              above.addEventListener("animationend", () => {
                setdo(true);
              });
            }
          } else {
            const bool = up();
            if (bool) {
              setdo(false);
              const above = document.querySelector(".card.view") as HTMLElement;
              above.addEventListener("animationend", () => {
                setdo(true);
              });
            }
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
