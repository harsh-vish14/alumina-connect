import { useState } from "react";
import { Input } from "antd";
import { RiSendPlaneFill } from "react-icons/ri";
import select from "../../animation/chatSelect.json";
import LottieAnimation from "../lottie/lottieAnimation";
import classes from "./chat.module.scss";
import Chats from "./chats/chats";
const currentUserDummyId = "thisisdummyidjustfortestinfrontend";
const Chat = ({ id }) => {
  const [input, setInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  console.log(id);
  const submitMessage = () => {
    if (input) {
      console.log("enter pressed", input);
      setChatMessages((preve) => {
        return [
          ...preve,
          {
            id: currentUserDummyId,
            message: input,
            dateAndTime: new Date().toISOString(),
          },
        ];
      });
    }
    setInput("");
  };
  const addOtherUsers = () => {
    setChatMessages((preve) => {
      return [
        ...preve,
        {
          id: "thisisotheruserdata",
          message: "other user message",
          dateAndTime: new Date().toISOString(),
        },
      ];
    });
  };

  if (!id) {
    return (
      <div className={classes.notSelected}>
        <LottieAnimation lottie={select} height={300} />
        <div>SELECT THE ALUMINA TO CHAT WITH THEM</div>
      </div>
    );
  }
  return (
    <div className={classes.chat}>
      <div className={classes.testing} onClick={addOtherUsers}>
        Testing Btn
      </div>
      <div className={classes.messages}>
        <Chats chatsMessage={chatMessages} />
      </div>
      <div className={classes.ChatInput}>
        <div>
          <Input
            placeholder="Enter your message"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onPressEnter={submitMessage}
          />
          <div className={classes.ChatInputIcon} onClick={submitMessage}>
            <RiSendPlaneFill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
