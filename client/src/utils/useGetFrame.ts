import { useState, useEffect } from "react";
import { client } from "../graphql/client";
import { GET_FRAMES } from "../graphql/queries/getFrames";
import { getFramesType, frames } from "./types";

export const useGetFrames = (offset: number) => {
  const [frames, setFrames] = useState<frames>([]);
  useEffect(() => {
    client
      .request(GET_FRAMES, { offset: offset })
      .then(({ getFrames }: getFramesType) => {
        setFrames(frames.concat(getFrames));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);
  return frames;
};
