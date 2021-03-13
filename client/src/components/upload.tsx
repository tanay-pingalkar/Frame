import { useState } from "react";
import { useSelector } from "react-redux";
import { client } from "../graphql/client";
import { ADD_FRAME } from "../graphql/mutations/addFrame";
import UploadSvg from "../svg/upload";
import "../styles/upload.scss";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [img, setImg] = useState<any>();
  const userInfo = useSelector((states: any) => states.userInfo);
  console.log(userInfo);
  const handleSubmit = async () => {
    const res = await client.request(ADD_FRAME, {
      id: parseInt(userInfo.id),
      title: title,
      description: description,
      file: img,
    });
    console.log(res);
  };
  console.log(img);
  return (
    <div className="main-box">
      <h1>frame whatever you have</h1>
      <div className="input-frame">
        <input
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title.."
          className="title"
        ></input>
        <span>
          <UploadSvg></UploadSvg>
          <input
            type="file"
            className="image-input"
            onChange={(e) => setImg(e.target!.files![0])}
          ></input>
        </span>
        <textarea
          placeholder="description.."
          className="description"
          onChange={(e) => setdescription(e.target.value)}
        ></textarea>
        <button onClick={handleSubmit}>Upload</button>
      </div>
    </div>
  );
};

export default Upload;
