import React, { useEffect, useState, useRef } from "react";
import "./postDetail.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPost } from "../../store/post/post.selector";
import { format } from "timeago.js";
import { axiosInstance } from "../../config";
import { selectUser } from "../../store/user/user.selector";
import { Close } from "@material-ui/icons";
import { setCurrentPost } from "../../store/post/post.action";
import Comment from "../comment/Comment";

const PostDetail = () => {
  const [user, setUser] = useState(null);
  const currentPost = useSelector(selectCurrentPost);
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const [comment, setComment] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosInstance.get(
          `/user?userId=${currentPost?.userId}`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentPost]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      if (comment.length) {
        const res = await axiosInstance.put(
          `/posts/${currentPost._id}/comments`,
          {
            commenterName: currentUser.username,
            commenterPicture: currentUser.profilePicture,
            comment: comment,
          }
        );
        dispatch(setCurrentPost(res.data));
        setComment("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPost.comments]);

  return (
    <div className="postDetail">
      <div className="topPostDetail">
        <h2 className="postTitle">{user?.username} 's Post</h2>
        <div className="closePost">
          <Close
            onClick={() => dispatch(setCurrentPost(null))}
            className="closeIcon"
            style={{ color: "white" }}
          />
        </div>
      </div>
      <div className="postDetailTop">
        <Link to={`/profile/${user?.username}`}>
          <img
            className="postProfileImg"
            src={`${user?.profilePicture}`}
            alt=""
          />
        </Link>
        <span className="postUsername">{user?.username}</span>
        <span style={{ color: "white" }} className="postDate">
          {format(currentPost?.createdAt)}
        </span>
      </div>
      <div className="postDetailCenter">
        <span className="postText">{currentPost?.desc}</span>
        <img
          className="postImg"
          src={`http://localhost:8000/images/${currentPost?.img}`}
          alt=""
        />
      </div>

      <div className="postDetailBottom">
        <div className="commentWrapper">
          {currentPost.comments.map((comment) => (
            <div ref={scrollRef}>
              <Comment
                key={comment.comment}
                comment={comment}
                postCreatedAt={currentPost.createdAt}
              />
            </div>
          ))}
        </div>
        <form className="commentBar" onSubmit={handleSubmitComment}>
          <Link
            className="currentUser"
            to={`/profile/${currentUser?.username}`}
          >
            <img
              className="userProfileImg"
              src={`${currentUser?.profilePicture}`}
              alt=""
            />
          </Link>
          <input
            onChange={(e) => setComment(e.target.value)}
            className="postComment"
            type="text"
            placeholder="comment on post ..."
            value={comment}
          />
        </form>
      </div>
    </div>
  );
};

export default PostDetail;
