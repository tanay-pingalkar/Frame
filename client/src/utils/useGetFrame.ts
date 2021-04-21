import { useState, useEffect } from "react";
import { client } from "../graphql/client";
import { GET_FRAMES } from "../graphql/queries/getFrames";
import { getFramesType, frames } from "./types";

export const useGetFrames = (userId: number, lastFrameId: number) => {
  const [frames, setFrames] = useState<frames>([]);
  console.log(userId, lastFrameId);
  useEffect(() => {
    client
      .request(GET_FRAMES, { userId: userId, lastFrameId: lastFrameId })
      .then(({ getFrames }: getFramesType) => {
        setFrames(frames.concat(getFrames));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastFrameId]);
  return frames;
};
