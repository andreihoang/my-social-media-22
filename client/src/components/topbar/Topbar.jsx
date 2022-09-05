import React from "react";
import "./Topbar.scss";
import { Chat, Notifications, Person, Search } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/user.selector";
import { logout } from "../../store/user/user.action";
import { useDispatch } from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Image } from "cloudinary-react";

const Topbar = () => {
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link className="linkLogo" to="/">
          <span className="logo">MySocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <Link to="/messenger" className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </Link>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${currentUser?.username}`}>
          <Image
            className="topbarImg"
            cloudName="dcri9a1wy"
            publicId={`User_Avatar/${currentUser.profilePicture}.jpg`}
            width="300"
            crop="scale"
          />
        </Link>
        <button onClick={handleLogout} className="logoutButton">
          <ExitToAppIcon />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
