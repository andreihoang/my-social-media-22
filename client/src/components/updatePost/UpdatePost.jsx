import React, { useEffect, useState } from "react";
import "./updatePost.scss";
import Topbar from "../topbar/Topbar";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/user.selector";
import { useNavigate } from "react-router-dom";

const UpdatePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [postDesc, setPostDesc] = useState(null);
  const [user, setUser] = useState(null);
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    const getAPost = async () => {
      try {
        const res = await axiosInstance.get(`/posts/${postId}`);
        setPostDesc(res.data.desc);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAPost();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosInstance.get(`/user?userId=${post?.userId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    post && getUser();
  }, [post]);

  const handleSubmit = async () => {
    try {
      const res = await axiosInstance.put(`/posts/${post?._id}`, {
        userId: currentUser._id,
        desc: postDesc,
      });

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Topbar />
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link to={`/profile/${user?.username}`}>
                <img
                  className="postProfileImg"
                  src={`${user?.profilePicture}`}
                  alt=""
                />
              </Link>
              <span className="postUsername">{user?.username}</span>
              <span className="postDate">{format(post?.createdAt)}</span>
            </div>
          </div>

          <div className="postCenter">
            <input
              onChange={(e) => setPostDesc(e.target.value)}
              value={postDesc}
              className="postText"
            />
            <img className="postImg" src={`${post?.img}`} alt="" />
          </div>
          <button onClick={handleSubmit}>Update</button>

          <div className="postBottom">
            <div className="postBottomLeft">
              <img className="likeIcon" src="/assets/like.png" alt="" />
              <img className="likeIcon" src="/assets/heart.png" alt="" />
              <span className="postLikeCounter">
                {post?.likes.length} people like it
              </span>
            </div>
            <div className="postBottomRight">
              <span className="postCommentText">{post?.comment} comments</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePost;
