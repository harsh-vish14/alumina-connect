import classes from "./messages.module.scss";
const Message = ({ message, currentUser, dateAndTime }) => {
  const date = new Date(dateAndTime);

  if (currentUser) {
    return (
      <div className={classes.currentUser}>
        {message}
        <div className={classes.date}>{date.toLocaleString()}</div>
      </div>
    );
  }
  return (
    <div className={classes.otherUser}>
      {message}
      <div className={classes.date}>{date.toLocaleString()}</div>
    </div>
  );
};

export default Message;
