import { notification } from "antd";

const notificationFun = (type, title, description) => {
  notification[type]({
    message: title,
    description: description,
  });
};
export default notificationFun;
