import {
  Table,
  Button,
  Avatar,
  Select,
  Input,
  Tooltip,
  Modal,
  Upload,
  DatePicker,
  InputNumber,
  Form,
} from "antd";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import moment from "moment";
import {
  getAllAlumina,
  updateUser,
  uploadAlumina,
  deleteAlumina,
  updateAluminaProfile,
} from "../../lib/gettingandsetting";
import notificationFun from "../../lib/notification";
import classes from "./allAlumina.module.scss";
import {
  AiOutlineSearch,
  AiOutlineDelete,
  AiOutlineUserAdd,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import formate from "../../lib/formateDate";
import { RiEdit2Line } from "react-icons/ri";
import ImgCrop from "antd-img-crop";
import { storage } from "../../lib/firebase";
import { validateEmail, validationCheck } from "../../lib/validationCheck";
import { findLinkedInId } from "../../lib/slug";

const { TextArea } = Input;
const { confirm } = Modal;
const { Option } = Select;

const AllAlumina = () => {
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
      title: "Passing Year",
      dataIndex: "passingYear",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Edit",
      dataIndex: "editBtn",
    },
  ];

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [addUserModal, setAddUserModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState(null);
  const [edit, setEdit] = useState(null);

  // app alumina
  const [nameInput, setNameInput] = useState(null);
  const [emailInput, setEmailInput] = useState(null);
  const [passingYearInput, setPassingYearInput] = useState(null);
  const [workExperience, setWorkExperience] = useState(null);
  const [passingYearResultInput, setPassingYearResultInput] = useState(null);
  const [phonenumberInput, setPhonenumberInput] = useState(null);
  const [linkedIn, setLinkedIn] = useState(null);
  const [github, setGithub] = useState(null);
  const [website, setWebsite] = useState(null);
  const [aluminaDetails, setAluminaDetails] = useState(null);
  const [projectsLinks, setProjectLinks] = useState(null);
  const [aluminaInterest, setAluminaInterest] = useState(null);
  const [form] = Form.useForm();

  const [image, setImage] = useState(null);
  // useEffect(() => {
  //   console.log("setSelectedRowKeys: ", selectedRowKeys);
  // }, [selectedRowKeys]);

  const dateFormat = "YYYY";

  useEffect(() => {
    allAlumina();
  }, []);

  const allAlumina = async (reset = false) => {
    setLoading(true);
    let filter;
    if (reset === true) {
      filter = { name: "", email: "", year: "" };
    } else {
      filter = { name, email, year };
    }

    const result = await getAllAlumina(filter);
    if (result.status === "success") {
      console.log("result.data: ", result.data.data);
      setLoading(false);
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
    setYear(null);
    allAlumina(true);
  };

  const deleteUsersFun = async () => {
    setLoading(true);
    const result = await deleteAlumina(selectedRowKeys);
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

  const updateAlumina = async (url) => {
    if (!edit) {
      console.log("Please");
      return;
    }
    setLoading(true);
    const result = await updateAluminaProfile(edit._id, {
      name: nameInput,
      image: url,
      passingYear: passingYearInput,
      workExperience: workExperience,
      passingYearResult: passingYearResultInput,
      aluminaContacts: {
        number: phonenumberInput,
        emailId: emailInput,
        linkedIn: linkedIn,
        github,
        website,
      },
      aluminaDetail: aluminaDetails,
      projectsLinks,
      aluminaInterest,
    });
    if (result.status === "success") {
      console.log("result.data: ", result.data.data);
      setUsers(result.data.data);
      allAlumina();
      notificationFun("success", "Success", "Updated Successfully!");
      cancelAddUser();
      setAddUserModal(false);
    } else {
      notificationFun("error", "Error Occurred", result.data.err);
      setLoading(false);
    }
    setLoading(false);
  };

  const handleOk = async () => {
    setLoading(true);

    const validation = validationCheck({
      name: nameInput,
      passingYear: passingYearInput,
      workExperience: workExperience,
      passingYearResult: passingYearResultInput,
      about: aluminaDetails?.trim(),
    });
    console.log(aluminaDetails);
    if (!validation.status) {
      notificationFun(
        "error",
        "Error Occurred",
        `Please provide a ${validation?.errorAt}`
      );
      return;
    }
    console.log("next");
    const aluminaContactsValidation = validationCheck({
      phoneNumber: phonenumberInput,
      emailId: emailInput,
      linkedIn: linkedIn,
    });
    if (!aluminaContactsValidation.status) {
      console.log();
      notificationFun(
        "error",
        "Error Occurred",
        `Please provide a ${aluminaContactsValidation?.errorAt}`
      );
      return;
    }
    if (!validateEmail(emailInput)) {
      notificationFun("error", "Error Occurred", "Invalid email address");
      return;
    }

    if (edit) {
      console.log("edit is enabled");
      notificationFun(
        "info",
        "Please Wait...",
        "Please Wait Updating Alumina profile."
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
                  updateAlumina(fireBaseUrl);
                  console.log("fireBaseUrl: ", fireBaseUrl);
                });
            }
          );
      } else {
        if (fileList.length === 0) {
          updateAlumina(
            "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
          );
          setAddUserModal(false);
        } else {
          updateAlumina(edit.image);
          setAddUserModal(false);
        }
      }
    } else {
      notificationFun(
        "info",
        "Please Wait...",
        "Please Adding Alumina to database."
      );
      console.log("add new Alumina");
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
    }
    setLoading(false);
  };

  const showConfirmation = () => {
    confirm({
      title: "Do you Want to delete these Aluminas?",
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
    const result = await uploadAlumina({
      name: nameInput,
      image: url,
      passingYear: passingYearInput,
      workExperience: workExperience,
      passingYearResult: passingYearResultInput,
      aluminaContacts: {
        number: phonenumberInput,
        emailId: emailInput,
        linkedIn: linkedIn,
        github,
        website,
      },
      aluminaDetail: aluminaDetails,
      projectsLinks,
      aluminaInterest,
    });
    if (result.status === "success") {
      console.log("result.data: ", result.data.data);
      setUsers(result.data.data);
      allAlumina();
      notificationFun("success", "Success", "Added Successfully!");
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

  const editAlumina = (alumina) => {
    setEdit(alumina);
    console.log("editing alumina: ", alumina);
    form.setFieldsValue({
      name: alumina.name,
      email: alumina.aluminaContacts.emailId,
      phone: alumina.aluminaContacts.number,
      about: alumina.aluminaDetail,
      passingYear: moment(new Date(alumina.passingYear), dateFormat),
      workExperience: alumina.workExperience,
      passingYearResultInput: alumina.passingYearResult,
      linkedIn: alumina.aluminaContacts.linkedIn,
      github: alumina.aluminaContacts.github,
      websiteURL: alumina.aluminaContacts.website,
      "Project Links": alumina.projectsLinks || [],
      Interest: alumina.aluminaInterest || [],
    });
    setFileList([
      {
        uid: "1",
        name: "image.png",
        status: "done",
        url: alumina.image,
      },
    ]);
    setNameInput(alumina.name);
    setEmailInput(alumina.aluminaContacts.emailId);
    setPassingYearInput(alumina.passingYear);
    setWorkExperience(alumina.workExperience);
    setPassingYearResultInput(alumina.passingYearResult);
    setPhonenumberInput(alumina.aluminaContacts.number);
    setLinkedIn(alumina.aluminaContacts.linkedIn);
    setGithub(alumina.aluminaContacts.github);
    setWebsite(alumina.aluminaContacts.website);
    setAluminaDetails(alumina.aluminaDetail);
    setProjectLinks(alumina?.projectsLinks);
    setAluminaInterest(alumina.aluminaInterest);
    setAddUserModal(true);
  };
  const cancelAddUser = () => {
    form.resetFields();
    setEdit(null);
    setFileList([]);
    setImage(null);
    setNameInput("");
    setEmailInput("");
    setPassingYearInput(null);
    setWorkExperience(null);
    setPassingYearResultInput(null);
    setPhonenumberInput(null);
    setAddUserModal(false);
    setLinkedIn(null);
    setGithub(null);
    setWebsite(null);
    setAluminaDetails(null);
    setProjectLinks(null);
    setAluminaInterest([]);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
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
        <DatePicker
          placeholder="Passing Year"
          value={year ? moment(year, dateFormat) : null}
          onChange={(date, dateString) => {
            console.log("date: ", date);
            if (date) {
              const currentDate = new Date(date);
              setYear(currentDate.getFullYear());
            } else {
              setYear(null);
            }
          }}
          format={dateFormat}
          style={{ width: "100%" }}
          picker="year"
        />
        <Tooltip title="search">
          <Button
            size="large"
            type="primary"
            onClick={allAlumina}
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
            Add Alumina
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
            name: (
              <Link
                href={`/alumina/${findLinkedInId(
                  user.aluminaContacts.linkedIn
                )}`}
              >
                <a>
                  <div style={{ fontWeight: "bold" }}>{user.name}</div>
                </a>
              </Link>
            ),
            email: user.aluminaContacts.emailId,
            image: <Avatar size={40} src={user.image} />,
            passingYear: new Date(user.passingYear).getFullYear(),
            createdAt: formate(user.createdAt),
            editBtn: (
              <Tooltip title="Edit">
                <Button
                  onClick={() => {
                    editAlumina(user);
                  }}
                  shape="circle"
                  type="danger primary"
                  icon={<RiEdit2Line />}
                ></Button>
              </Tooltip>
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
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          {...formItemLayout}
          labelAlign="left"
          size="large"
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input
              placeholder="name"
              value={nameInput}
              onChange={(e) => {
                setNameInput(e.target.value);
              }}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please provide email!" }]}
          >
            <Input
              placeholder="email"
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.target.value);
              }}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="phone"
            value={phonenumberInput}
            onChange={(e) => {
              setPhonenumberInput(e.target.value);
            }}
            label="Phone Number"
          >
            <Input type="number" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="About"
            name="about"
            rules={[{ required: true, message: "Please Provide about!" }]}
          >
            <TextArea
              value={aluminaDetails}
              showCount
              onChange={(e) => {
                setAluminaDetails(e.target.value);
              }}
              placeholder="Controlled autosize"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
          <Form.Item
            label="Passing Year"
            name="passingYear"
            rules={[
              { required: true, message: "Please Provide Passing Year!" },
            ]}
          >
            <DatePicker
              placeholder="Passing Year"
              // defaultValue={moment(passingYearInput, dateFormat)}
              onChange={(date, dateString) => {
                const currentDate = new Date(date);
                setPassingYearInput(currentDate.getFullYear());
              }}
              format={dateFormat}
              style={{ width: "100%" }}
              picker="year"
            />
          </Form.Item>
          <Form.Item
            label="Work Experience"
            name="workExperience"
            rules={[
              {
                required: true,
                message: "Please Provide Year of Work Experience!",
              },
            ]}
          >
            <InputNumber
              min={1}
              value={workExperience}
              onChange={(e) => {
                setWorkExperience(e);
              }}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Passing Year CGPA"
            name="passingYearResultInput"
            rules={[
              {
                required: true,
                message: "Please Provide CGPA!",
              },
            ]}
          >
            <InputNumber
              min={1}
              max={10}
              value={passingYearResultInput}
              onChange={(e) => {
                console.log(e);
                setPassingYearResultInput(e);
              }}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="linkedIn"
            label="linkedIn URL"
            rules={[
              { required: true, message: "Please provide linkedIn URL!" },
            ]}
          >
            <Input
              placeholder="linkedIn URL"
              value={linkedIn}
              onChange={(e) => {
                setLinkedIn(e.target.value);
              }}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item name="github" label="github URL">
            <Input
              placeholder="github URL"
              value={github}
              onChange={(e) => {
                setGithub(e.target.value);
              }}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item name="websiteURL" label="Personal website URL">
            <Input
              placeholder="Personal website URL"
              value={website}
              onChange={(e) => {
                setWebsite(e.target.value);
              }}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item name="Project Links" label="Project Links">
            <Select
              mode="tags"
              placeholder="Project Links"
              style={{ width: "100%" }}
              onChange={(e) => {
                setProjectLinks(e);
              }}
              value={projectsLinks}
              tokenSeparators={[","]}
            >
              {/* {children} */}
            </Select>
          </Form.Item>
          <Form.Item name="Interest" label="Interests">
            <Select
              mode="tags"
              placeholder="Interests"
              style={{ width: "100%" }}
              onChange={(e) => {
                setAluminaInterest(e);
              }}
              value={aluminaInterest}
              tokenSeparators={[","]}
            >
              {/* {children} */}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AllAlumina;
