import { createWriteStream } from "fs";
import { Upload } from "./types";

export const write = async (
  file: Upload,
  img_uuid: string
): Promise<Boolean> => {
  try {
    await file
      .createReadStream()
      .pipe(
        createWriteStream(
          __dirname + `/../../images/${img_uuid + file.filename}`
        )
      )
      .on("finish", () => console.log("saved"))
      .on("error", () => console.log("oops"));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
