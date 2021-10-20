import { getAllAlumina } from "../../lib/gettingandsetting";
import notificationFun from "../../lib/notification";
import Bar from "./bar/bar";
import { useState, useEffect } from "react";
import classes from "./list.module.scss";
const List = ({ selectedChat }) => {
  const [alumina, setAlumina] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getAllAlumina({ name: "", email: "", year: "" });
      if (result.status === "success") {
        console.log("result.data: ", result.data.data);
        setLoading(false);
        setAlumina(result.data.data);
      } else {
        notificationFun("error", "Error Occurred", result.data.err);
      }
      setLoading(false);
    })();
  }, []);
  return (
    <div className={classes.list}>
      Alumina List
      {alumina.map((user, i) => {
        return (
          <Bar
            onClick={() => {
              selectedChat(user._id);
            }}
            key={user._id}
            name={user.name}
            company={user.companyName}
            position={user.currentPosition}
            image={user.image}
          />
        );
      })}
    </div>
  );
};

export default List;
