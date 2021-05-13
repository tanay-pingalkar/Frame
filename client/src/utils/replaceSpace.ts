import { React } from "@ungap/global-this";

export const replace = (
  e: React.ChangeEvent<HTMLInputElement>,
  setName: React.Dispatch<React.SetStateAction<string>>
): void => {
  let val: string = e.target.value;
  val = val.replace(/\s/g, "-");
  setName(val);
};
