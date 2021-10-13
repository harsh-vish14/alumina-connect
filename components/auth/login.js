import { useState, useEffect, useRef } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Button, Tooltip, Input } from "antd";
import { Divider } from "antd";
import classes from "./auth.module.scss";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/client";
import { SignUp } from "../../lib/gettingandsetting";
import notification from "../../lib/notification";

const LoginPage = ({ currentLogin, showModal }) => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    currentLogin(isLogin);
    setIsLogin(true);
  }, []);

  const changePage = () => {
    console.log("I am clicked");
    currentLogin(!isLogin);
    setIsLogin(!isLogin);
  };

  const googleSignedIn = async () => {
    await signIn("google");
  };

  const credentialSignIn = async () => {
    setLoading(true);

    console.log("isLogin: ", isLogin);
    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (!result.error) {
        setEmail("");
        setPassword("");
        showModal(false);
        setLoading(false);
        notification("success", "Success", "logged in successfully!");
        return;
      }
      setLoading(false);
      notification("error", "Error Occurred", result.error);
    } else {
      console.log({
        name,
        email,
        password,
      });
      const result = await SignUp({
        name,
        email,
        password,
      });

      if (result.status === "success") {
        currentLogin(!isLogin);
        setName("");
        setEmail("");
        setPassword("");
        setLoading(false);
        notification("success", "Success", "Register user successfully");
        return;
      }
      setLoading(false);
      notification("error", "Error Occurred", result.data.err);
    }
    setLoading(false);
  };

  return (
    <div className={classes.authDetails}>
      {!isLogin && (
        <div className={classes.input}>
          <Input
            placeholder="username"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
      )}
      <div className={classes.input}>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className={classes.input}>
        <Input.Password
          style={{ padding: "10px", paddingRight: "10px" }}
          placeholder="input password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          iconRender={(visible) =>
            visible ? (
              <BsFillEyeFill className={classes.icon} />
            ) : (
              <BsFillEyeSlashFill className={classes.icon} />
            )
          }
        />
      </div>
      <div>
        <Button
          type="primary"
          loading={loading}
          onClick={credentialSignIn}
          size="large"
        >
          {isLogin ? "Login" : "Signup"}
        </Button>
      </div>
      <Divider plain dashed={true}>
        OR
      </Divider>
      <div>
        <Tooltip title="Google">
          <FcGoogle
            style={{ fontSize: "30px" }}
            className={classes.google}
            onClick={googleSignedIn}
          />
        </Tooltip>
      </div>
      <div className={classes.change}>
        {isLogin ? `New Here? ` : "Having Account? "}
        <span
          onClick={() => {
            changePage();
          }}
        >
          {isLogin ? "create account" : "Login"}
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
