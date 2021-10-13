import {
  Table,
  Button,
  Avatar,
  Select,
  Input,
  Tooltip,
  Modal,
  Upload,
} from "antd";
import { v4 as uuidv4 } from "uuid";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUser,
  uploadUser,
  deleteUsers,
} from "../../lib/gettingandsetting";
import notificationFun from "../../lib/notification";
import classes from "./allUsers.module.scss";
import {
  AiOutlineSearch,
  AiOutlineDelete,
  AiOutlineUserAdd,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import formate from "../../lib/formateDate";
import { RiAdminFill } from "react-icons/ri";

import ImgCrop from "antd-img-crop";
import { storage } from "../../lib/firebase";

const { confirm } = Modal;
const { Option } = Select;

const AllUsers = () => {
  const columns = [
    {
      title: "Avatar",
      dataIndex: "image",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Create/Remove Admin",
      dataIndex: "editBtn",
    },
  ];

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [addUserModal, setAddUserModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [image, setImage] = useState(null);
  // useEffect(() => {
  //   console.log("setSelectedRowKeys: ", selectedRowKeys);
  // }, [selectedRowKeys]);

  useEffect(() => {
    allUsers();
  }, []);

  const allUsers = async (reset = false) => {
    setLoading(true);
    let filter;
    if (reset === true) {
      filter = { name: "", email: "", admin: "" };
    } else {
      filter = { name, email, admin: admin || "" };
    }

    const result = await getAllUsers(filter);
    if (result.status === "success") {
      console.log("result.data: ", result.data.data);
      setUsers(result.data.data);
    } else {
      notificationFun("error", "Error Occurred", result.data.err);
    }
    setLoading(false);
  };
  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const reset = () => {
    setName("");
    setEmail("");
    setAdmin(null);
    allUsers(true);
  };

  const updateAdmin = async (admin) => {
    setLoading(true);
    const result = await updateUser(admin);
    if (result.status === "success") {
      console.log("result.data: ", result.data.data);
      setUsers(result.data.data);
      notificationFun("success", "Success", "Updated Successfully!");
    } else {
      notificationFun("error", "Error Occurred", result.data.err);
      setLoading(false);
    }
    setLoading(false);
  };

  const deleteUsersFun = async () => {
    setLoading(true);
    const result = await deleteUsers(selectedRowKeys);
    if (result.status === "success") {
      console.log("result.data: ", result.data.data);
      setUsers(result.data.data);
      setSelectedRowKeys([]);
      setFileList([]);
      notificationFun("success", "Success", "Users are deleted successfully!");
      setLoading(false);
    } else {
      notificationFun("error", "Error Occurred", result.data.err);
      setLoading(false);
    }
    setLoading(false);
  };

  const handleOk = async () => {
    setLoading(true);

    if (!nameInput || !emailInput || !passwordInput) {
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
    if (passwordInput.trim().length < 7) {
      notificationFun("error", "Error Occurred", "Small password");
      return;
    }

    notificationFun(
      "info",
      "Please Wait...",
      "Please Adding user to database."
    );
    if (image) {
      const imageName = uuidv4();
      var metadata = {
        contentType: "image/jpeg",
      };
      // setUploadProgress(1);
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
                uploadUserDetails(fireBaseUrl);
                console.log("fireBaseUrl: ", fireBaseUrl);
              });
          }
        );
    } else {
      uploadUserDetails(
        "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
      );
      setAddUserModal(false);
    }
    setLoading(false);
  };

  const showConfirmation = () => {
    confirm({
      title: "Do you Want to delete these Users?",
      icon: (
        <AiOutlineInfoCircle style={{ color: "#faad14", fontSize: "30px" }} />
      ),
      content: "After deleting you can not recover Data.",
      onOk() {
        return new Promise(async (resolve, reject) => {
          try {
            await deleteUsersFun();
            resolve();
          } catch (err) {
            reject(err);
          }
        }).catch((err) => console.log(err));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const uploadUserDetails = async (url) => {
    setLoading(true);
    const result = await uploadUser({
      name: nameInput,
      email: emailInput,
      password: passwordInput,
      image: url,
    });
    if (result.status === "success") {
      console.log("result.data: ", result.data.data);
      setUsers(result.data.data);
      notificationFun("success", "Success", "Updated Successfully!");
      cancelAddUser();
      setAddUserModal(false);
    } else {
      notificationFun("error", "Error Occurred", result.data.err);
      setLoading(false);
    }
    setLoading(false);
  };

  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    // console.log(image);
    // if (image) {
    //   console.log("Image: ", URL.createObjectURL(image));
    // }
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
      setImage(as);
    }
  };
  const cancelAddUser = () => {
    setFileList([]);
    setImage(null);
    setNameInput("");
    setPasswordInput("");
    setEmailInput("");
    setAddUserModal(false);
  };
  return (
    <div style={{ margin: "10px 50px" }}>
      <div className={classes.search}>
        <Input
          placeholder="Search Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          placeholder="Search Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Select
          placeholder="Admin"
          style={{ width: 120 }}
          value={admin}
          size="large"
          onChange={(e) => {
            setAdmin(e);
          }}
          allowClear
        >
          <Option value="true">Yes</Option>
          <Option value="false">No</Option>
        </Select>
        <Tooltip title="search">
          <Button
            size="large"
            type="primary"
            onClick={allUsers}
            icon={
              <AiOutlineSearch
                style={{ marginRight: "6px", fontSize: "20px" }}
              />
            }
          >
            Search
          </Button>
        </Tooltip>
        <Tooltip title="Reset">
          <Button
            size="large"
            type="primary"
            onClick={reset}
            shape="circle"
            icon={<GrPowerReset />}
          ></Button>
        </Tooltip>
      </div>
      <div className={classes.btns}>
        <div className={classes.deleteButton}>
          <Button
            disabled={selectedRowKeys.length === 0}
            onClick={showConfirmation}
            type="danger primary"
            icon={<AiOutlineDelete style={{ marginRight: "10px" }} />}
          >
            Delete
          </Button>
        </div>
        <div className={classes.deleteButton}>
          <Button
            onClick={() => {
              setAddUserModal(true);
            }}
            type="primary"
            icon={<AiOutlineUserAdd style={{ marginRight: "10px" }} />}
          >
            Add User
          </Button>
        </div>
      </div>

      <Table
        scroll={{ x: 1000 }}
        rowSelection={{
          onChange: onSelectChange,
        }}
        columns={columns}
        dataSource={users.map((user) => {
          return {
            key: user._id,
            name: user.name,
            email: user.email,
            image: <Avatar size={40} src={user.image} />,
            isAdmin: user.isAdmin ? "Yes" : "No",
            createdAt: formate(user.createdAt),
            editBtn: user.isAdmin ? (
              <Button
                // size="large"
                onClick={() => {
                  updateAdmin({ userId: user._id, admin: false });
                }}
                type="danger primary"
                icon={<RiAdminFill style={{ marginRight: "10px" }} />}
              >
                Remove Admin
              </Button>
            ) : (
              <Button
                // size="large"
                onClick={() => {
                  updateAdmin({ userId: user._id, admin: true });
                }}
                type="danger primary"
                icon={<RiAdminFill style={{ marginRight: "10px" }} />}
              >
                Create Admin
              </Button>
            ),
          };
        })}
        loading={loading}
      />
      <Modal
        title="Add User"
        visible={addUserModal}
        className={classes.addUserModal}
        onOk={handleOk}
        onCancel={cancelAddUser}
      >
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
          <Input.Password
            style={{
              padding: "0px",
              paddingRight: "10px",
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
        </div>
      </Modal>
    </div>
  );
};

export default AllUsers;
