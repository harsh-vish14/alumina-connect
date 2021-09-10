import { useState } from "react";
import Chat from "../chat/chat";
import List from "../list/list";
import classes from "./home.module.scss";
const Home = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  return (
    <div className={classes.home}>
      <div className={classes.sideBar}>
        <List selectedChat={setSelectedChat} />
      </div>
      <Chat id={selectedChat} />
    </div>
  );
};
export default Home;
