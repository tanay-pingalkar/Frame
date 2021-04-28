import { frames } from "../utils/types";
import { reset } from "./reset";

export const useDown = (
  frames: frames,
  seti: React.Dispatch<React.SetStateAction<number>>,
  i: number
): (() => boolean) => {
  return (): boolean => {
    if (frames.length !== 0 && i > 2) {
      reset();
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
      if (above) above.style.animation = "aboveDown 0.5s ease forwards";
      if (view) view.style.animation = "viewDown 0.5s ease forwards";
      if (below) below.style.animation = "belowDown 0.5s ease forwards";
      seti(i - 1);
      return true;
    }
    return false;
  };
};
