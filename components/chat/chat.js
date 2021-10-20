import { useEffect, useState } from "react";
import { Avatar, Input } from "antd";
import Link from "next/link";
import { RiSendPlaneFill } from "react-icons/ri";
import select from "../../animation/chatSelect.json";
import login from "../../animation/login.json";
import LottieAnimation from "../lottie/lottieAnimation";
import chatLoading from "../../animation/chatloading.json";
import classes from "./chat.module.scss";
import Chats from "./chats/chats";
import { useSession } from "next-auth/client";
import socket from "../../socket/socket";
import { getAluminaById } from "../../lib/gettingandsetting";
import { findLinkedInId } from "../../lib/slug";

const Chat = ({ id }) => {
  const [input, setInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [session, loading] = useSession();
  const [aluminaDetails, setAluminaDetails] = useState({});
  const [loadingChats, setLoadingChats] = useState(false);
  useEffect(() => {
    if (id) {
      alumina();
    }
  }, [id]);

  useEffect(() => {
    socket.on(`message-came-${id}`, (chatData) => {
      setChatMessages((preve) => {
        return [
          ...preve,
          {
            ...chatData,
          },
        ];
      });
    });
  }, [id]);

  const alumina = async () => {
    setLoadingChats(true);
    const res = await getAluminaById(id);
    if (res.status === "success") {
      console.log("id: ", id, res.data.data.chatsMessage);
      setChatMessages(res.data.data.chatsMessage);
      setAluminaDetails(res.data.data);
    }
    setLoadingChats(false);
  };

  const submitMessage = () => {
    if (input && session && !loading) {
      console.log("enter pressed", session);
      socket.emit("chat-input", {
        channelId: id,
        authorization: process.env.AUTH_KEY,
        chatDetails: {
          userId: session.user.userID,
          name: session.user.name,
          image: session.user.image,
          dateAndTime: new Date().toISOString(),
          message: input,
        },
      });
      setChatMessages((preve) => {
        return [
          ...preve,
          {
            userId: session.user.userID,
            name: session.user.name,
            image: session.user.image,
            dateAndTime: new Date().toISOString(),
            message: input,
          },
        ];
      });
    }
    setInput("");
  };

  if (loadingChats) {
    return (
      <div className={classes.notSelected}>
        <LottieAnimation lottie={chatLoading} height={300} />
        <div>Loading Please Wait...</div>
      </div>
    );
  }

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
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          margin: "-10px",
        }}
      >
        {aluminaDetails && (
          <Link
            href={`/alumina/${findLinkedInId(
              aluminaDetails?.aluminaContacts?.linkedIn
            )}`}
          >
            <a>
              <Avatar size={40} src={aluminaDetails?.image} />
            </a>
          </Link>
        )}
        <div>{`${aluminaDetails?.currentPosition} - ${aluminaDetails?.companyName}`}</div>
        <div>{aluminaDetails?.name}</div>
      </div>
      {session && !loading ? (
        <>
          <div className={classes.messages}>
            <Chats chatsMessage={chatMessages} session={session} />
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
        </>
      ) : (
        <div className={classes.login}>
          <LottieAnimation lottie={login} height={300} />
          <div>Please Login</div>
        </div>
      )}
    </div>
  );
};

export default Chat;
