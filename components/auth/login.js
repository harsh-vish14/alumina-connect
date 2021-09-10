import { useState, useEffect } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Button, Tooltip, Input } from "antd";
import { Divider } from "antd";
import classes from "./auth.module.scss";
import { FcGoogle } from "react-icons/fc";

const LoginPage = ({ currentLogin }) => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    currentLogin(isLogin);
    setIsLogin(true);
  }, []);
  const LoginClicked = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const changePage = () => {
    console.log("I am clicked");
    currentLogin(!isLogin);
    setIsLogin(!isLogin);
  };
  return (
    <div className={classes.authDetails}>
      {!isLogin && (
        <div className={classes.input}>
          <Input placeholder="username" />
        </div>
      )}
      <div className={classes.input}>
        <Input placeholder="Email" />
      </div>
      <div className={classes.input}>
        <Input.Password
          style={{ padding: "10px", paddingRight: "10px" }}
          placeholder="input password"
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
          onClick={LoginClicked}
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
          <FcGoogle style={{ fontSize: "30px" }} className={classes.google} />
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
