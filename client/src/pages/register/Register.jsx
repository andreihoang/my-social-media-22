import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
} from "../../store/user/user.action";
import "./Register.scss";

const Register = () => {
  // useRef prevent re-render
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmedPassword = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    if (confirmedPassword.current.value === password.current.value) {
      try {
        dispatch(fetchUserStart());
        const res = await axios.post("/auth/register", {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        });
        dispatch(fetchUserSuccess(res.data));
        navigate("/updateUser");
      } catch (err) {
        dispatch(fetchUserFailure(err));
      }
    } else {
      alert("Password not match!!!");
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
          <div className="loginBox">
            <input
              ref={username}
              placeholder="Username"
              type="text"
              className="loginInput"
              required
            />
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
            />
            <input
              ref={confirmedPassword}
              placeholder="Password Again"
              type="password"
              className="loginInput"
              required
            />
            <button onClick={handleClick} className="loginButton">
              Sign Up
            </button>
            <span className="loginForgot">Forgot Password</span>
            <button
              onClick={() => navigate("/login")}
              className="loginRegisterButton"
            >
              Login into Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
