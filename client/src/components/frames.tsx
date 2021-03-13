import React, { useEffect, useState } from "react";
import { client } from "../graphql/client";
import { GET_FRAMES } from "../graphql/queries/getFrames";
import { frames, frame, getFramesType } from "../utils/types";
import Frame from "./frame";

const Frames = () => {
  const [frames, setFrames] = useState<frames>([]);
  useEffect(() => {
    client.request(GET_FRAMES).then(({ getFrames }: getFramesType) => {
      setFrames(getFrames);
    });
  }, []);
  return (
    <div>
      {frames.map((frame: frame) => (
        <Frame frame={frame}></Frame>
      ))}
    </div>
  );
};
export default Frames;
