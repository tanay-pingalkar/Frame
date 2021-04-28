import { frames } from "../utils/types";
import { reset } from "./reset";

export const up = (i: number): void => {
  reset();
  const above = document.querySelectorAll(".card")[i] as HTMLElement;
  const view = document.querySelectorAll(".card")[i + 1] as HTMLElement;
  const below = document.querySelectorAll(".card")[i + 2] as HTMLElement;

  //adding class to elements
  above?.classList.add("above");
  view?.classList.add("view");
  below?.classList.add("below");

  //ading animation
  if (above) above.style.animation = "aboveUp 0.5s ease forwards";
  if (view) view.style.animation = "viewUp 0.5s ease forwards";
  if (below) below.style.animation = "belowUp 0.5s ease forwards";
};

export const useUp = (
  frames: frames,
  seti: React.Dispatch<React.SetStateAction<number>>,
  i: number,
  setNoWayBack: React.Dispatch<React.SetStateAction<number>>,
  noWayBack: number,
  setlastframe: React.Dispatch<React.SetStateAction<number>>
): (() => boolean) => {
  return (): boolean => {
    if (frames.length !== 0 && frames.length - 2 > i) {
      up(i);
      seti(i + 1);
      if (i === noWayBack) setNoWayBack(noWayBack + 1);
      if (noWayBack % 4 === 0)
        setlastframe(Number(frames[frames.length - 1].frame.id));
      return true;
    }
    return false;
  };
};
