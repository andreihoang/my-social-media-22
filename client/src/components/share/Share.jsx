import React, { useEffect, useRef, useState } from "react";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/user.selector";
import { addNewPost } from "../../store/post/post.action";
import { useDispatch } from "react-redux";
import { Image } from "cloudinary-react";

import "./Share.scss";
import { axiosInstance } from "../../config";

const Share = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const desc = useRef();
  const [file, setFile] = useState();
  const [image, setImage] = useState("");

  useEffect(() => {
    const reader = new FileReader();
    file && reader.readAsDataURL(file);
    reader.onloadend = () => setImage(reader.result);
  }, [file]);

  const handleReset = () => {
    // 👇️ reset input field's value
    desc.current.value = "";
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: currentUser._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axiosInstance.post("/posts", newPost);
      dispatch(addNewPost(res.data));
      handleReset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        {/* for post status */}
        <div className="shareTop">
          <Image
            className="shareProfileImg"
            cloudName="dcri9a1wy"
            publicId={`User_Avatar/${currentUser.profilePicture}.jpg`}
            width="300"
            crop="scale"
          />
          <input
            ref={desc}
            placeholder={`Whas in your mind ${currentUser.username} ?`}
            className="shareInput"
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel
              className="shareCancelImage"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        {/* for post newfeed */}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button type="submit" className="shareButton">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
