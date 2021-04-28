import { useState } from "react";
import { useSelector } from "react-redux";
import { client } from "../graphql/client";
import { ADD_FRAME } from "../graphql/mutations/addFrame";
import UploadSvg from "../svg/upload";
import "../styles/upload.scss";
import ReactLoading from "react-loading";
import { useHistory } from "react-router";
import { state } from "../utils/types";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [img, setImg] = useState<File>();
  const [base64, setBase64] = useState<string | ArrayBuffer | null>("");
  const userInfo = useSelector((states: state) => states.userInfo);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const handleSubmit = async () => {
    if (!img || title === "") {
      alert("fill the form");
      return;
    }
    setLoading(true);
    try {
      const res = await client.request(ADD_FRAME, {
        id: parseInt(userInfo.id),
        title: title,
        description: description,
        file: img,
      });
      alert(res.addFrame.msg);
      if (res.addFrame.msg === "success") {
        history.replace("/");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }

    setLoading(false);
  };
  console.log(description);
  return (
    <div className="main-box">
      <h1>frame whatever you have</h1>
      <div className="input-frame">
        <input
          onChange={(e) => setTitle(e.target.value.trim())}
          placeholder="title.."
          className="title"
        ></input>
        <span style={{ backgroundImage: `url(${base64})` }}>
          <UploadSvg></UploadSvg>
          <input
            type="file"
            className="image-input"
            onChange={(e) => {
              const file = e.target!.files![0];
              setImg(file);
              var reader = new FileReader();
              reader.onloadend = function () {
                setBase64(reader.result);
              };

              reader.readAsDataURL(file);
            }}
          ></input>
        </span>
        <textarea
          placeholder="description.."
          className="description"
          onChange={(e) => setdescription(e.target.value.trim())}
        ></textarea>

        {isLoading ? (
          <button>
            <ReactLoading
              type={"bars"}
              color={"black"}
              height={"30px"}
              width={"40px"}
              className="loader"
            />
          </button>
        ) : (
          <button onClick={handleSubmit}>Upload</button>
        )}
      </div>
    </div>
  );
};

export default Upload;
