import { useRef, useEffect } from "react";
import Message from "./messages/messages";
import classes from "./chats.module.scss";
const currentUserDummyId = "thisisdummyidjustfortestinfrontend";
const Chats = ({ chatsMessage = [] }) => {
  useEffect(() => {
    scrollToBottom();
  }, [chatsMessage]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  if (chatsMessage.length == 0) {
    return <div className={classes.label}>You Can Start Your Conversation</div>;
  }
  return (
    <div>
      {chatsMessage &&
        chatsMessage.map((chat, i) => {
          console.log(chat);
          return (
            <Message
              message={chat.message}
              dateAndTime={chat.dateAndTime}
              key={i}
              currentUser={currentUserDummyId === chat.id}
            />
          );
        })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Chats;
