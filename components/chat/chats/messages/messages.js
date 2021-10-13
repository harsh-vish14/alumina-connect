import { Avatar } from "antd";
import classes from "./messages.module.scss";
const Message = ({ message, currentUser, dateAndTime, image, name }) => {
  const date = new Date(dateAndTime);

  if (currentUser) {
    return (
      <div className={classes.currentUser}>
        <div>{name}</div>
        <div>
          <Avatar
            size={40}
            src={image}
            style={{
              marginRight: "20px",
              height: "40px",
              width: "40px",
              marginBottom: 10,
            }}
          />
          <div>
            {message}
            <div className={classes.date}>{date.toLocaleString()}</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.otherUser}>
      <div>{name}</div>
      <div>
        <Avatar
          size={40}
          src={image}
          style={{
            marginRight: "20px",
            height: "40px",
            width: "40px",
            marginBottom: 10,
          }}
        />
        <div>
          {message}
          <div className={classes.date}>{date.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default Message;
