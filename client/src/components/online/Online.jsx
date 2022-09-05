import React from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";

import "./Online.scss";

const Online = ({ f }) => {
  return (
    <Link to={`/profile/${f.username}`} className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <Image
          className="rightbarProfileImg"
          cloudName="dcri9a1wy"
          publicId={`User_Avatar/${f.profilePicture}.jpg`}
          width="300"
          crop="scale"
        />
      </div>
      <span className="rightbarUsername">{f.username}</span>
    </Link>
  );
};

export default Online;
