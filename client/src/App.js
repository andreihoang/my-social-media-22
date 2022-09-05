import React from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./store/user/user.selector";
import Messenger from "./pages/messenger/Messenger";
import UpdatePost from "./components/updatePost/UpdatePost";
import PostDetail from "./components/postDetail/PostDetail";
import UpdateUser from "./pages/updateUser/UpdateUser";

const App = () => {
  const currentUser = useSelector(selectUser);

  return (
    <Routes>
      <Route index path="/" element={currentUser ? <Home /> : <Register />} />
      <Route
        path="/profile/:username"
        element={!currentUser ? <Navigate replace to="/" /> : <Profile />}
      />
      <Route
        path="/login"
        element={currentUser ? <Navigate replace to="/" /> : <Login />}
      />
      <Route
        path="/register"
        element={
          currentUser ? <Navigate replace to="/updateUser" /> : <Register />
        }
      />
      <Route
        path="/messenger"
        element={!currentUser ? <Navigate replace to="/" /> : <Messenger />}
      />
      <Route
        path="/updatePost/:postId"
        element={!currentUser ? <Navigate replace to="/" /> : <UpdatePost />}
      />
      <Route
        path="/updateUser"
        element={!currentUser ? <Navigate replace to="/" /> : <UpdateUser />}
      />
    </Routes>
  );
};

export default App;
