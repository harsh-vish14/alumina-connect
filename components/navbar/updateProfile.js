import { useState, useEffect } from "react";
import { Button, Input, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import classes from "./navbar.module.scss";
import { useSession } from "next-auth/client";
const ProfileUpdate = ({
  nameInput,
  setNameInput,
  emailInput,
  setEmailInput,
  passwordInput,
  setPasswordInput,
  image,
  setImage,
  fileList,
  setFileList,
}) => {
  const [session, loading] = useSession();

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    console.log("file: ", file.url);
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  const action = (as) => {
    if (as) {
      console.log("action triggered: ", as);
      setImage(as);
    }
  };
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <ImgCrop rotate onModalOk={action}>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 1 && "+ Upload Profile Image"}
          </Upload>
        </ImgCrop>
      </div>
      <div className={classes.input}>
        <Input
          placeholder="username"
          value={nameInput}
          onChange={(e) => {
            setNameInput(e.target.value);
          }}
        />
      </div>
      <div className={classes.input}>
        <Input
          placeholder="Email"
          value={emailInput}
          onChange={(e) => {
            setEmailInput(e.target.value);
          }}
        />
      </div>
      <div className={classes.input}>
        {/* <Input.Password
          style={{
            padding: "10px",
          }}
          placeholder="input password"
          value={passwordInput}
          onChange={(e) => {
            setPasswordInput(e.target.value);
          }}
          iconRender={(visible) =>
            visible ? (
              <BsFillEyeFill className={classes.icon} />
            ) : (
              <BsFillEyeSlashFill className={classes.icon} />
            )
          }
              />
              <span>Login from Google then leave it blank</span> */}
      </div>
    </>
  );
};
export default ProfileUpdate;
