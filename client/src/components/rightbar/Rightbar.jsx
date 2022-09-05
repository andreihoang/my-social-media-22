import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

import Online from "../online/Online";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/user.selector";
import { Add, Remove } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { followUser, unFollowUser } from "../../store/user/user.action";
import { useNavigate } from "react-router-dom";
import {
  fetchConversationStart,
  fetchConversationSuccess,
  fetchConversationFailure,
} from "../../store/conversation/conversation.action";
import { Image } from "cloudinary-react";

import "./Rightbar.scss";

const Righbar = ({ user }) => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(`/user/friends/${currentUser._id}`);
        setFriends(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentUser._id]);

  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Bon</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" />
        <h4 className="rightbarTitle">Friends</h4>
        <ul className="rightbarFriendList">
          {friends.map((f) => (
            <Online key={f._id} f={f} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightBar = () => {
    const dispatch = useDispatch();
    const [friends, setFriends] = useState([]);
    const [followed, setFollowed] = useState(
      currentUser.followings.includes(user?._id)
    );

    useEffect(() => {
      setFollowed(currentUser.followings.includes(user?._id));
    }, [currentUser, user._id]);

    useEffect(() => {
      async function fetchFriends() {
        try {
          const res = await axios.get(`/user/friends/${user._id}`);
          setFriends(res.data);
        } catch (err) {
          console.log(err);
        }
      }
      fetchFriends();
    }, [user._id]);

    const handleFollow = async () => {
      try {
        if (followed) {
          await axios.put(`/user/${user._id}/unfollow`, {
            userId: currentUser._id,
          });
          dispatch(unFollowUser(user._id));
        } else {
          await axios.put(`/user/${user._id}/follow`, {
            userId: currentUser._id,
          });
          dispatch(followUser(user._id));
        }
      } catch (err) {
        console.log(err);
      }
      setFollowed(!followed);
    };

    const handleMessage = async () => {
      dispatch(fetchConversationStart());
      try {
        const res = await axios.post("/conversations/", {
          firstUserID: currentUser._id,
          secondUserId: user._id,
        });
        dispatch(fetchConversationSuccess(res.data));
      } catch (err) {
        dispatch(fetchConversationFailure(err));
      }
      navigate("/messenger");
    };

    return (
      <>
        {currentUser.username !== user.username && (
          <>
            <button onClick={handleFollow} className="rightbarFollowButton">
              {followed ? "Unfollowed" : "Follow"}
              {followed ? <Remove /> : <Add />}
            </button>
            <button onClick={handleMessage} className="rightbarFollowButton">
              Message
            </button>
          </>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City: </span>
            <span className="rightbarInfoValue">{user?.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From: </span>
            <span className="rightbarInfoValue">{user?.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship: </span>
            <span className="rightbarInfoValue">
              {user?.relationship === 1
                ? "Single"
                : user?.relationship === 2
                ? "Married"
                : "-"}
            </span>
            {currentUser._id === user._id && (
              <button
                className="rightbarFollowButton"
                onClick={() => navigate("/updateUser")}
              >
                Update Infomation
              </button>
            )}
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              key={friend._id}
              to={`/profile/${friend.username}`}
              style={{ textDecoration: "none" }}
              className="rightbarFollowing"
            >
              <Image
                className="rightbarFollowingImg"
                cloudName="dcri9a1wy"
                publicId={`User_Avatar/${friend.profilePicture}`}
                width="300"
                crop="scale"
              />

              <span className="rightbarFollowingName">{friend?.username}</span>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
};

export default Righbar;
