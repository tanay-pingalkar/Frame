import React, { Children, useEffect, useState } from "react";
import { useGetFrames } from "../utils/useGetFrame";
import { frame, frames } from "../utils/types";
import Frame from "./frame";
import "../styles/frame.scss";

const Frames = () => {
  const [offset, setOffset] = useState(0);
  const frames = useGetFrames(offset);
  const [i, seti] = useState(0);
  let even: number = 1;
  useEffect(() => {
    reset();
    up(i);
    seti(i + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frames]);
  return (
    <div
      className="frames"
      onTouchMove={() => {
        console.log("lol");
      }}
      onWheel={(e) => {
        console.log(even % 2 === 0, even);
        if (even % 3 === 0) {
          if (e.deltaY < 0) {
            if (frames.length !== 0 && i > 0) {
              reset();
              down(i);
              seti(i - 1);
            }
          } else {
            if (frames.length !== 0 && frames.length - 1 !== i) {
              reset();
              up(i);
              if (i === 8 * offset + 1) {
                setOffset(offset + 1);
              }
              seti(i + 1);
            }
          }
        }
        even = even + 1;
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
  const cards = document.querySelectorAll<HTMLElement>(".card");
  cards.forEach((child) => {
    child.className = "card";
    child.style.animation = "";
  });
}

function up(i: number) {
  // selecting elements
  const above = document.querySelectorAll(".card")[i] as HTMLElement;
  const view = document.querySelectorAll(".card")[i + 1] as HTMLElement;
  const below = document.querySelectorAll(".card")[i + 2] as HTMLElement;

  //adding class to elements
  above?.classList.add("above");
  view?.classList.add("view");
  below?.classList.add("below");

  //ading animation
  if (above) above.style.animation = "aboveUp 1s ease forwards";
  if (view) view.style.animation = "viewUp 1s ease forwards";
  if (below) below.style.animation = "belowUp 1s ease forwards";
}

function down(i: number) {
  // selecting elements
  const upcomingAbove = document.querySelectorAll(".card")[
    i - 3
  ] as HTMLElement;
  const above = document.querySelectorAll(".card")[i - 2] as HTMLElement;
  const view = document.querySelectorAll(".card")[i - 1] as HTMLElement;
  const below = document.querySelectorAll(".card")[i] as HTMLElement;

  //adding class to elements
  above?.classList.add("above");
  view?.classList.add("view");
  below?.classList.add("below");
  upcomingAbove?.classList.add("upcomingAbove");

  //ading animation
  if (above) above.style.animation = "aboveDown 1s ease forwards";
  if (view) view.style.animation = "viewDown 1s ease forwards";
  if (below) below.style.animation = "belowDown 1s ease forwards";
}
