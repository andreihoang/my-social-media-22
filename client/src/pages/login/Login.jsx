import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
} from "../../store/user/user.action";
import { axiosInstance } from "../../config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";

import "./Login.scss";

const Login = () => {
  // useRef prevent re-render
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching, currentUser } = useSelector((state) => state.user);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      dispatch(fetchUserStart());
      const res = await axiosInstance.post("/auth/login", {
        email: email.current.value,
        password: password.current.value,
      });
      dispatch(fetchUserSuccess(res.data));
    } catch (err) {
      dispatch(fetchUserFailure(err));
      alert("Wrong username and password");
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">MySocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox">
            <input
              ref={email}
              placeholder="Email"
              type="email"
              className="loginInput"
              required
            />
            <input
              ref={password}
              placeholder="Password"
              type="password"
              className="loginInput"
              required
              minLength="6"
            />
            <button className="loginButton" onClick={handleClick}>
              {isFetching ? (
                <CircularProgress color="white" size="15px" />
              ) : (
                "Login"
              )}
            </button>
            <span className="loginForgot">Forgot Password</span>
            <button
              onClick={() => navigate("/register")}
              className="loginRegisterButton"
            >
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
