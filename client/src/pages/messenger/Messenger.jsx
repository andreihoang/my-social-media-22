import React, { useState, useEffect, useRef } from "react";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import "./Messenger.scss";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/user.selector";
import { axiosInstance } from "../../config";
import { io } from "socket.io-client";
import { selectCurrentChat } from "../../store/conversation/conversation.selector";
import { setCurrentChat } from "../../store/conversation/conversation.action";
import { useDispatch } from "react-redux";

const Messenger = () => {
  const currentUser = useSelector(selectUser);
  const currentChat = useSelector(selectCurrentChat);
  const [conversations, setConversations] = useState([]);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();

  // io socket
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    // recieve message from server and set arrival message
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // if there is arrivalMessage and current chat include sender of message -> add message to messages array
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    // send current user and its socket id
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        currentUser.followings.filter((friend) =>
          users.some((user) => user.userId === friend)
        )
      );
    });
  }, [currentUser]);

  // get conversation
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axiosInstance.get(
          `/conversations/${currentUser._id}`
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [currentUser._id]);

  // get messages
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axiosInstance.get(`/messages/${currentChat?._id}
        `);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    try {
      const message = {
        sender: currentUser._id,
        text: newMessage,
        conversationId: currentChat._id,
      };

      // send message to socket.io
      const receiverId = currentChat.members.find(
        (member) => member !== currentUser._id
      );
      socket.current.emit("sendMessage", {
        senderId: currentUser._id,
        receiverId: receiverId,
        text: newMessage,
      });

      const res = await axiosInstance.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations?.map((conversation) => (
              <div onClick={() => dispatch(setCurrentChat(conversation))}>
                <Conversation
                  key={conversation._id}
                  track={conversation._id === currentChat?._id}
                  conversation={conversation}
                  currentUser={currentUser}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((message) => (
                    <div ref={scrollRef}>
                      <Message
                        key={message._id}
                        message={message}
                        own={message?.sender === currentUser._id}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button
                    className="chatSubmitButton"
                    onClick={handleSubmitMessage}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversation">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentUser={currentUser}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
