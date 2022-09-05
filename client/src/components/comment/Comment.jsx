import React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const Comment = ({ comment, postCreatedAt }) => {
  return (
    <div className="commenter">
      <div className="commenterInfo">
        <Link to={`/profile/${comment?.commenterName}`}>
          <img
            className="commenterProfileImg"
            src={`${comment?.commenterPicture}`}
            alt=""
          />
        </Link>
        <span className="commenterUsername">{comment?.commenterName}</span>
        <span className="postDate">{format(postCreatedAt)}</span>
      </div>
      <hr className="shareHr" />
      <div className="comment">
        <p>{comment.comment}</p>
      </div>
    </div>
  );
};

export default Comment;
