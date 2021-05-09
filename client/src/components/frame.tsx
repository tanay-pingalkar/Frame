import React, { useState } from "react";
import { frame, state } from "../utils/types";
import "../styles/frame.scss";
import Heart from "../svg/heart";
import FilledHeart from "../svg/filledHeart";
import { client } from "../graphql/client";
import { LIKE } from "../graphql/mutations/like";
import { useSelector } from "react-redux";

interface props {
  frame: frame;
}
const Frame: React.FC<props> = ({ frame }) => {
  const [isLiked, setLiked] = useState<boolean>(frame.isLiked);
  const [likeNumber, setLikeNumber] = useState(frame.likeNumber);
  const { id } = useSelector((state: state) => state.userInfo);

  const like = async () => {
    try {
      let res = await client.request(LIKE, {
        userId: Number(id),
        postId: Number(frame.frame.id),
      });
      console.log(res);
      setLiked(res.like.like);
      if (res.like.errorMsg === "disliked") {
        setLikeNumber(likeNumber - 1);
      } else {
        setLikeNumber(likeNumber + 1);
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="card">
      <p className="name">{frame.frame.user.name}</p>
      <p className="title">{frame.frame.title}</p>
      <img src={frame.frame.frame} alt="lol" className="img"></img>
      <p className="description">{frame.frame.description}</p>
      <span onClick={() => like()}>
        {isLiked ? <FilledHeart></FilledHeart> : <Heart></Heart>}

        <p>{likeNumber}</p>
      </span>
    </div>
  );
};

export default Frame;
