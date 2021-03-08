import React, { useEffect, useState } from "react";
import { client } from "../graphql/client";
import { GET_FRAMES } from "../graphql/queries/getFrames";
import "../styles/feed.scss";
import { frame, frames, getFramesType } from "../utils/types";
import Frame from "./frame";

const Feed = () => {
  const [frames, setFrames] = useState<frames>([]);
  useEffect(() => {
    client.request(GET_FRAMES).then(({ getFrames }: getFramesType) => {
      setFrames(getFrames);
    });
  }, []);
  return (
    <div className="feed">
      {frames.map((frame: frame) => (
        <Frame frame={frame}></Frame>
      ))}
    </div>
  );
};

export default Feed;
