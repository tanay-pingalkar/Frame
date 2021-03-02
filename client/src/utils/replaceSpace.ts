export const replace = (
  e: any,
  setName: React.Dispatch<React.SetStateAction<string>>
) => {
  e = e.target.value;
  e = e.replace(/\s/g, "-");
  setName(e);
};
