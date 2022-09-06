import {
  Bookmark,
  Chat,
  Event,
  Group,
  HelpOutline,
  PlayCircleFilledOutlined,
  RssFeed,
  School,
  WorkOutline,
} from "@material-ui/icons";
import { axiosInstance } from "../../config";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/user.selector";
import CloseFriend from "../suggestionFriend/CloseFriend";

import "./Sidebar.scss";

const Sidebar = () => {
  const currentUser = useSelector(selectUser);
  const [suggestionFriends, setSuggestionFriends] = useState([]);
  const [filterSuggestionFriends, setFilterSuggestionFriends] =
    useState(suggestionFriends);

  useEffect(() => {
    const getSuggestionFriends = async () => {
      try {
        const res = await axiosInstance.get("/user/users");
        setSuggestionFriends(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSuggestionFriends();
  }, [currentUser._id]);

  useEffect(() => {
    const suggestions = suggestionFriends.filter(
      (f) => f._id !== currentUser._id
    );
    const filterSuggestion = suggestions.filter((suggestion) => {
      let isNotFriend = true;
      for (let friend of currentUser.followings) {
        if (friend === suggestion._id) {
          isNotFriend = false;
        }
      }
      return isNotFriend;
    });
    setFilterSuggestionFriends(filterSuggestion);
  }, [suggestionFriends, currentUser._id]);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <span className="suggestion">Friends Suggestion</span>
        <ul className="sidebarFriendList">
          {filterSuggestionFriends.map((user) => (
            <CloseFriend key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
