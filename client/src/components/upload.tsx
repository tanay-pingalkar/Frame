import { useState } from "react";
import { useSelector } from "react-redux";
import { client } from "../graphql/client";
import { ADD_FRAME } from "../graphql/mutations/addFrame";
import UploadSvg from "../svg/upload";
import "../styles/upload.scss";
import ReactLoading from "react-loading";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [img, setImg] = useState<any>();
  const [base64, setBase64] = useState<string | ArrayBuffer | null>("");
  const userInfo = useSelector((states: any) => states.userInfo);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await client.request(ADD_FRAME, {
        id: parseInt(userInfo.id),
        title: title,
        description: description,
        file: img,
      });
      alert(res.addFrame.msg);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }

    setLoading(false);
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
          onChange={(e) => setdescription(e.target.value)}
        ></textarea>
        <button onClick={handleSubmit}>
          {isLoading ? (
            <ReactLoading
              type={"bars"}
              color={"black"}
              height={"30px"}
              width={"40px"}
              className="loader"
            />
          ) : (
            <>Upload</>
          )}
        </button>
      </div>
    </div>
  );
};

export default Upload;
