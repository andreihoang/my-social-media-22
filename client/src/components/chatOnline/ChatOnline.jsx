import { axiosInstance } from "../../config";
import React, { useEffect, useState } from "react";
import "./ChatOnline.scss";
import { Image } from "cloudinary-react";

const ChatOnline = ({ onlineUsers, currentUser, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axiosInstance.get(`/user/friends/${currentUser._id}`);
      setFriends(res.data);
    };
    getFriends();
  }, [currentUser]);

  useEffect(() => {
    setOnlineFriends(
      friends.filter((friend) => onlineUsers.includes(friend._id))
    );
  }, [onlineUsers, friends]);

  const handleClick = async (user) => {
    try {
      const res = await axiosInstance.get(
        `/conversations/find/${currentUser._id}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((friend) => (
        <div
          key={friend._id}
          className="chatOnlineFriend"
          onClick={() => handleClick(friend)}
        >
          <div className="chatOnlineImgContainer">
            <Image
              className="chatOnlineImg"
              cloudName="dcri9a1wy"
              publicId={`User_Avatar/${friend.profilePicture}.jpg`}
              width="300"
              crop="scale"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{friend?.username}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
