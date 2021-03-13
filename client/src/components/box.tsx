import { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { client } from "../graphql/client";
import { GET_FRAMES } from "../graphql/queries/getFrames";
import "../styles/feed.scss";
import { frames, getFramesType, where } from "../utils/types";
import Frames from "./frames";
import Nav from "./nav";
const Upload = lazy(() => {
  return import("./upload");
});

const Box = () => {
  const where: where = useSelector((state: any) => state.where);
  return (
    <div className="flex">
      <div className="feed">
        {where === "home" ? (
          <Frames></Frames>
        ) : where === "upload" ? (
          <Suspense fallback={<div>Loading...</div>}>
            <Upload />
          </Suspense>
        ) : (
          <h1>oops</h1>
        )}
      </div>
      <Nav></Nav>
    </div>
  );
};

export default Box;
