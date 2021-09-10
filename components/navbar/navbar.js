import Link from "next/link";
import classes from "./navbar.module.scss";
import React, { useState } from "react";
import { Modal, Button } from "antd";
import LoginPage from "../auth/login";
const Navbar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className={classes.navbar}>
      <div className={classes.logo}>
        <Link href="/">
          <a>Alumina Connect</a>
        </Link>
      </div>
      <div className={classes.loginBtn} onClick={showModal}>
        Login/Sign up
      </div>
      <Modal
        title={isLogin ? "Login" : "Sign Up"}
        visible={isModalVisible}
        onOk={handleOk}
        footer={null}
        onCancel={handleCancel}
      >
        <LoginPage currentLogin={setIsLogin} />
      </Modal>
    </div>
  );
};

export default Navbar;
