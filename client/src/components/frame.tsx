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
      // console.log(client);
      let res = await client.request(LIKE, {
        userId: Number(id),
        postId: Number(frame.frame.id),
      });

      setLiked(res.like.like);
      if (res.like.errorMsg === "disliked") {
        setLikeNumber(likeNumber - 1);
      } else {
        setLikeNumber(likeNumber + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="card" data-testid="card">
      <p className="name" data-testid="name">
        {frame.frame.user.name}
      </p>
      <p className="title" data-testid="title">
        {frame.frame.title}
      </p>
      <img
        src={frame.frame.frame}
        alt="lol"
        className="img"
        data-testid="img"
      ></img>
      <p className="description" data-testid="description">
        {frame.frame.description}
      </p>
      <span onClick={() => like()} data-testid="like">
        {isLiked ? <FilledHeart></FilledHeart> : <Heart></Heart>}
        <p data-testid="like-num">{likeNumber}</p>
      </span>
    </div>
  );
};

export default Frame;
