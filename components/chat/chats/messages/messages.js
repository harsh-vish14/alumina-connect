import { Avatar } from "antd";
import classes from "./messages.module.scss";
const Message = ({ message, currentUser, dateAndTime, image, name }) => {
  const date = new Date(dateAndTime);

  if (currentUser) {
    return (
      <div className={classes.currentUser}>
        <div style={{ marginBottom: 10 }}>{name}</div>
        <div>
          <div>
            <Avatar
              size={40}
              src={image}
              style={{
                marginRight: 10,
                float: "left",
              }}
            />
            <p>{message}</p>
          </div>
          <div className={classes.date}>{date.toLocaleString()}</div>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.otherUser}>
      <div style={{ marginBottom: 10 }}>{name}</div>
      <div>
        <div>
          <Avatar
            size={40}
            src={image}
            style={{
              marginRight: 10,
              float: "left",
            }}
          />
          <p>{message}</p>
        </div>
        <div className={classes.date}>{date.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default Message;
