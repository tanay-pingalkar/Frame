import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import "../styles/feed.scss";
import { where } from "../utils/types";
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
