import React from "react";
import { Add, Remove } from "@material-ui/icons";
import { useState } from "react";
import "./CloseFriend.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/user.selector";
import axios from "axios";
import { useDispatch } from "react-redux";
import { followUser, unFollowUser } from "../../store/user/user.action";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
const CloseFriend = ({ user }) => {
  const currentUser = useSelector(selectUser);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );
  const dispatch = useDispatch();

  const handleFollow = async () => {
    try {
      // follow user if not follow yet
      if (followed) {
        await axios.put(`user/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch(unFollowUser(user._id));
      } else {
        await axios.put(`user/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch(followUser(user._id));
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  return (
    <li className="sidebarFriend">
      <Link to={`/profile/${user.username}`} className="sidebarFriendContainer">
        <Image
          className="sidebarFriendImg"
          cloudName="dcri9a1wy"
          publicId={`User_Avatar/${user.profilePicture}.jpg`}
          width="300"
          crop="scale"
        />
        <span className="sidebarFriendName">{user.username} </span>
      </Link>
      <button onClick={handleFollow} className="rightbarFollowButton">
        {followed ? "Unfollowed" : "Follow"}
        {followed ? <Remove /> : <Add />}
      </button>
    </li>
  );
};

export default CloseFriend;
