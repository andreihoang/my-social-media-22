import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user/user.selector";
import { Image } from "cloudinary-react";
import { Cancel } from "@material-ui/icons";
import { fetchUserSuccess } from "../../store/user/user.action";
import { PermMedia } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

import "./UpdateUser.scss";

const UpdateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const city = useRef();
  const from = useRef();

  const handleReset = () => {
    // 👇️ reset input field's value
    city.current.value = "";
    from.current.value = "";
  };

  useEffect(() => {
    const reader = new FileReader();
    file && reader.readAsDataURL(file);
    reader.onloadend = () => setImage(reader.result);
  }, [file]);

  const handleClick = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        await axios.post(`/uploadimage/${currentUser._id}`, {
          image: image,
        });
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.put(`/user/${currentUser._id}`, {
        userId: currentUser._id,
        profilePicture: currentUser._id,
        city: city.current.value,
        from: from.current.value,
      });

      dispatch(fetchUserSuccess(res.data));
      navigate(`/profile/${currentUser.username}`);
      handleReset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="updateUserContainer">
      <div className="loginRight">
        <div className="loginBox">
          <h2>Hi, {currentUser.username}. Let's update your account</h2>
          <div className="coverPictureContainer">
            <span className="coverPictureUpdate">
              Update your profile cover picture
              <Image
                cloudName="dcri9a1wy"
                publicId={`User_Avatar/${currentUser.coverPicture}`}
                width="300"
                crop="scale"
                className="profileCoverImg"
              />
            </span>
          </div>
          <div className="updateImageContainer">
            <div className="profileImageContainer">
              <Image
                cloudName="dcri9a1wy"
                publicId={`User_Avatar/${currentUser.profilePicture}.jpg`}
                width="300"
                crop="scale"
                className="profileImage"
              />
            </div>

            <label htmlFor="file" className="updatePicture">
              <span>Choose your profile picture</span>
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>

          {file && (
            <div className="shareImgContainer">
              <img
                className="shareImg"
                src={URL.createObjectURL(file)}
                alt=""
              />
              <Cancel
                className="shareCancelImage"
                onClick={() => setFile(null)}
              />
            </div>
          )}
          <input
            ref={city}
            placeholder="Your current location"
            type="text"
            className="loginInput"
          />
          <input
            ref={from}
            placeholder="Where are you from?"
            type="text"
            className="loginInput"
          />

          <button
            onClick={handleClick}
            type="submit"
            className="loginRegisterButton"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
