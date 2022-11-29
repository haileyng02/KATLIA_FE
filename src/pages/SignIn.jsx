import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Button, Form, Spin } from "antd";
import profileIcon from "../images/Profile2.svg";
import lockIcon from "../images/lock2.svg";
import googleIcon from "../images/google_icon.svg";
import facebookIcon from "../images/facebook_icon.svg";
import authGif from "../images/auth-gif.gif";
import loadingIcon from "../images/loading2.gif";
import { useNavigate } from "react-router-dom";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import { signIn } from "../actions/auth";

const SignIn = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  
  let isChecked = false;

  const handleOnClick = (path) => {
    navigate("/" + path);
  };

  const handleSignIn = () => {
    form.validateFields().then((values) => {
      signInWithEmailAndPassword(values.email, values.password);
    });
  };

  //Sign in with email and password
  const signInWithEmailAndPassword = async (email, password) => {
    setLoading(true);
    try {
      const result = await appApi.post(
        routes.SIGN_IN,
        routes.getSigninBody(email, password)
      );
      console.log(result);
      dispatch(signIn(result.data.access_token));
      localStorage.setItem("user", result.data.access_token);
      navigate("/");
    } catch (err) {
      if (err.response) {
        const message = err.response.data.message;
        if (message === "User's not exist") {
          form.setFields([
            {
              name: "email",
              errors: [message],
            },
          ]);
        } else if (message === "Password incorrect") {
          form.setFields([
            {
              name: "password",
              errors: [message],
            },
          ]);
        }
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
    setLoading(false);
  };

  const handleChecked = (e) => {
    isChecked = e.target.checked;
  }

  return (
    <div className="px-[150px] py-8 flex">
      <div className="auth-border px-[89px] py-[50px]  w-[58%]">
        <Spin
          spinning={loading}
          indicator={
            <img src={loadingIcon} alt="Loading" className="w-8 h-8" />
          }
        >
          <div className="flex flex-col items-center">
            <h1 className="text-[45px]">Welcome To Katlia!</h1>
            <p className="mt-[9px]">Sign in to continue.</p>
            <Form form={form} className="w-full">
              <Form.Item
                name={"email"}
                rules={[
                  {
                    required: true,
                    message: "You must enter your email",
                  },
                  {
                    type: "email",
                    message: "This is not a valid email",
                  },
                ]}
                className="mt-8"
              >
                <Input
                  type="email"
                  name="email"
                  prefix={
                    <img
                      src={profileIcon}
                      alt="Email"
                      className="auth-prefix"
                    />
                  }
                  placeholder="Enter your email"
                  className="auth-input"
                />
              </Form.Item>
              <Form.Item
                name={"password"}
                rules={[
                  {
                    required: true,
                    message: "You must enter password",
                  },
                ]}
                className="mt-7"
              >
                <Input.Password
                  type="password"
                  name="password"
                  prefix={
                    <img
                      src={lockIcon}
                      alt="Password"
                      className="auth-prefix"
                    />
                  }
                  placeholder="Password"
                  className="auth-input"
                />
              </Form.Item>
            </Form>
            <div className="flex mt-[25px] justify-between w-full">
              <div className="flex items-center">
                <input
                  type={"checkbox"}
                  name="remember"
                  onChange={(e)=>handleChecked(e)}
                  className="accent-black w-[18px] h-[18px] mr-[6px]"
                />
                <label htmlFor="remember" className="text-[14px]">
                  Remember for 30 days
                </label>
              </div>
              <p
                onClick={() => handleOnClick("reset-password")}
                className="underline text-[14px] cursor-pointer"
              >
                Forgot password
              </p>
            </div>
            <button
              onClick={() => handleSignIn()}
              className="mt-[23px] auth-primary-button"
            >
              SIGN IN
            </button>
            <div className="flex mt-8 items-center justify-between w-full">
              <span className="auth-line"></span>
              <p className="mx-2">or</p>
              <span className="auth-line"></span>
            </div>
            <Button
              icon={<img src={googleIcon} alt="Google" />}
              className="mt-8 auth-input auth-button"
            >
              Sign in with Google
            </Button>
            <Button
              icon={<img src={facebookIcon} alt="Facebook" />}
              className="mt-[26px] auth-input auth-button"
            >
              Sign in with Facebook
            </Button>
            <p className="mt-[34px] text-black70">
              Don't have an account?
              <span
                onClick={() => handleOnClick("signup")}
                className="text-primary cursor-pointer"
              >
                {" "}
                Sign up for free
              </span>
            </p>
          </div>
        </Spin>
      </div>
      <img
        src={authGif}
        alt="Fashion"
        className="w-[42%] object-cover rounded-[5px]"
      />
    </div>
  );
};

export default SignIn;
