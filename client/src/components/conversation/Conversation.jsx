import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import "./conversation.scss";

const Conversation = ({ conversation, currentUser, track }) => {
  const [conversationUser, setConversationUser] = useState({});

  useEffect(() => {
    const friendChatId = conversation.members.find(
      (userId) => userId !== currentUser._id
    );
    const getFriendChat = async () => {
      try {
        const res = await axios.get(`user/?userId=${friendChatId}`);
        setConversationUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriendChat();
  }, [conversation, currentUser]);

  return (
    <div className={track ? "conversation track" : `conversation`}>
      <Image
        className="conversationImg"
        cloudName="dcri9a1wy"
        publicId={`User_Avatar/${conversationUser.profilePicture}.jpg`}
        width="300"
        crop="scale"
      />
      <span className="conversationName">{conversationUser.username}</span>
    </div>
  );
};

export default Conversation;
