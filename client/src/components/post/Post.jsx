import { MoreVert } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config";
import { format } from "timeago.js";
import "./Post.scss";
import { Link } from "react-router-dom";
import { selectUser } from "../../store/user/user.selector";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectPosts } from "../../store/post/post.selector";
import { deletePost, setCurrentPost } from "../../store/post/post.action";
import { Image } from "cloudinary-react";

const Post = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const currentUser = useSelector(selectUser);
  const posts = useSelector(selectPosts);

  const [togleUpdateBar, setTogleUpdateBar] = useState(false);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/user?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = async () => {
    try {
      const res = await axiosInstance.put(`/posts/${post?._id}/like`, {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }

    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleToggleUpdate = () => {
    setTogleUpdateBar(!togleUpdateBar);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${post._id}`);
      dispatch(deletePost(posts, post._id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectCurrentPost = () => {
    dispatch(setCurrentPost(post));
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <Image
                className="postProfileImg"
                cloudName="dcri9a1wy"
                publicId={`User_Avatar/${user.profilePicture}.jpg`}
                width="300"
                crop="scale"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post?.createdAt)}</span>
          </div>
          {togleUpdateBar &&
            (currentUser._id === post.userId ? (
              <div className="postTopRightUpdate">
                <span
                  className="update"
                  onClick={() => navigate(`/updatePost/${post._id}`)}
                >
                  Update Post
                </span>
                <span onClick={handleDelete} className="delete">
                  Delete Post
                </span>
              </div>
            ) : (
              <div className="postTopRightUpdate">
                <span className="delete">Save This Post</span>
              </div>
            ))}
          <div className="postTopRight">
            <MoreVert onClick={handleToggleUpdate} />
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img
            className="postImg"
            src={post.img && `http://localhost:8000/images/${post.img}`}
            alt=""
          />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="/assets/like.png"
              alt=""
              onClick={likeHandler}
            />
            <img
              className="likeIcon"
              src="/assets/heart.png"
              alt=""
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span onClick={handleSelectCurrentPost} className="postCommentText">
              {post?.comment} comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
