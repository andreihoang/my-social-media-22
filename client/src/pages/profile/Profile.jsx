import React from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Righbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config";
import { useParams } from "react-router-dom";
import PostDetail from "../../components/postDetail/PostDetail";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPost } from "../../store/post/post.selector";
import { Image } from "cloudinary-react";

import "./Profile.scss";

const Profile = () => {
  const currentPost = useSelector(selectCurrentPost);
  const [user, setUser] = useState({});
  const { username } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/user?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <Image
                className="profileCoverImg"
                cloudName="dcri9a1wy"
                publicId={`User_Avatar/${user.coverPicture}`}
                width="300"
                crop="scale"
              />
              <Image
                className="profileUserImg"
                cloudName="dcri9a1wy"
                publicId={`User_Avatar/${user.profilePicture}.jpg`}
                width="300"
                crop="scale"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user?.username}</h4>
              <span className="profileInfoDesc">{user?.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Righbar user={user} />
          </div>
        </div>
      </div>
      {currentPost && (
        <div>
          <PostDetail />
        </div>
      )}
    </>
  );
};

export default Profile;
