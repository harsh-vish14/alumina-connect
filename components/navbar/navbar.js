import Link from "next/link";
import classes from "./navbar.module.scss";
import React, { useEffect, useState } from "react";
import { Modal, Button, Avatar, Image } from "antd";
import { Menu, Dropdown } from "antd";
import LoginPage from "../auth/login";
import { signOut, useSession } from "next-auth/client";
import { HiLogout } from "react-icons/hi";
import { RiAdminFill } from "react-icons/ri";
import ProfileUpdate from "./updateProfile";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../lib/firebase";
import notificationFun from "../../lib/notification";
import { updateUserProfile } from "../../lib/gettingandsetting";

const Navbar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateProfile, setIsUpdateProfile] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [session, loading] = useSession();
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [image, setImage] = useState(null);
  const [fileList, setFileList] = useState([
    {
      uid: "1",
      name: "image.png",
      status: "done",
      url: session?.user?.image,
    },
  ]);

  useEffect(() => {
    if (session) {
      setIsModalVisible(false);
      setNameInput(session.user.name);
      setEmailInput(session.user.email);
      setFileList([
        {
          uid: "1",
          name: "image.png",
          status: "done",
          url: session?.user?.image,
        },
      ]);
    }
    console.log("session: ", session);
  }, [loading]);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const logoutHandler = () => {
    signOut();
  };

  const updateOk = async () => {
    if (!nameInput || !emailInput) {
      notificationFun("error", "Error Occurred", "Please fill the all fields");
      return;
    }
    if (!emailInput.includes("@")) {
      notificationFun(
        "error",
        "Error Occurred",
        "Please provide a valid email address."
      );

      return;
    }

    notificationFun(
      "info",
      "Please Wait...",
      "Please Wait Updating Your profile."
    );
    if (image) {
      // update image
      console.log("image: ", image);
      const imageName = uuidv4();
      var metadata = {
        contentType: "image/jpeg",
      };
      await storage
        .ref(`users/${imageName}${image.name}`)
        .put(image, metadata)
        .on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log(progress);
            // if (progress > 0) {
            //   setUploadProgress(progress);
            // }
          },
          (err) => {},
          () => {
            storage
              .ref("users")
              .child(`${imageName}${image.name}`)
              .getDownloadURL()
              .then(async (fireBaseUrl) => {
                // uploadUserDetails(fireBaseUrl);
                updatedUserData(fireBaseUrl);
                console.log("fireBaseUrl: ", fireBaseUrl);
              });
          }
        );
    } else {
      if (fileList.length === 0) {
        // set default image
        updatedUserData(
          "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
        );
      } else {
        // no change in profile image
        updatedUserData(session?.user?.image);
      }
    }
    setIsUpdateProfile(false);
  };

  const updatedUserData = async (url) => {
    console.log("Updated user data: ", {
      image: url,
      name: nameInput,
      email: emailInput,
    });
    const result = await updateUserProfile(session?.user?.userID, {
      image: url,
      name: nameInput,
      email: emailInput,
    });
    if (result.status === "success") {
      // console.log("result.data: ", result.data.data);
      setImage(null);
      notificationFun(
        "info",
        "Profile is Updated.",
        "In some time It will be updated everywhere"
      );
    } else {
      notificationFun("error", "Error Occurred", result.data.err);
    }
  };

  return (
    <div className={classes.navbar}>
      <div className={classes.logo}>
        <Link href="/">
          <a>Alumina Connect</a>
        </Link>
      </div>
      {!loading && session === null ? (
        <div className={classes.loginBtn} onClick={showModal}>
          Login/Sign up
        </div>
      ) : (
        <>
          <div style={{ marginRight: "20px", cursor: "pointer" }}>
            <Dropdown
              trigger="click"
              overlay={
                <Menu>
                  {session?.user?.isAdmin && (
                    <Menu.Item
                      key="admin"
                      style={{ marginBottom: "5px", marginTop: "3px" }}
                    >
                      <div
                        className={classes.loginBtn}
                        style={{
                          fontSize: "15px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Link href="/admin">
                          <a>
                            <RiAdminFill style={{ marginRight: "10px" }} />{" "}
                            Admin{" "}
                          </a>
                        </Link>
                      </div>
                    </Menu.Item>
                  )}
                  <Menu.Item
                    key="update"
                    style={{ marginBottom: "5px", marginTop: "3px" }}
                  >
                    <div
                      onClick={() => {
                        setIsUpdateProfile(true);
                      }}
                      className={classes.loginBtn}
                      style={{
                        fontSize: "15px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Update Profile
                    </div>
                  </Menu.Item>
                  <Menu.Item key="logout">
                    <div
                      onClick={logoutHandler}
                      className={classes.loginBtn}
                      style={{
                        color: "red",
                        fontSize: "15px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Logout <HiLogout style={{ marginLeft: "10px" }} />
                    </div>
                  </Menu.Item>
                </Menu>
              }
              placement="bottomCenter"
            >
              <Avatar size={40} src={session?.user?.image} />
              {/* <Button>
              
            </Button> */}
            </Dropdown>
          </div>
        </>
      )}
      <Modal
        title={isLogin ? "Login" : "Sign Up"}
        visible={isModalVisible}
        onOk={handleOk}
        footer={null}
        onCancel={handleCancel}
      >
        <LoginPage currentLogin={setIsLogin} showModal={setIsModalVisible} />
      </Modal>
      <Modal
        title={"Update Profile"}
        visible={isUpdateProfile}
        onOk={updateOk}
        onCancel={() => {
          setIsUpdateProfile(false);
        }}
      >
        <ProfileUpdate
          nameInput={nameInput}
          setNameInput={setNameInput}
          emailInput={emailInput}
          setEmailInput={setEmailInput}
          passwordInput={passwordInput}
          setPasswordInput={setPasswordInput}
          image={image}
          setImage={setImage}
          fileList={fileList}
          setFileList={setFileList}
        />
      </Modal>
    </div>
  );
};

export default Navbar;
