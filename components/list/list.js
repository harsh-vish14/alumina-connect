import Bar from "./bar/bar";
const dummyData = [
  {
    name: "harsh vishwakarma",
    year: "2019-23",
    image: "http://image",
    id: "kdnajsdnajsd",
  },
  {
    name: "harsh vishwakarma",
    year: "2019-23",
    image: "http://image",
    id: "kdnajsdnajsd",
  },
  {
    name: "harsh vishwakarma",
    year: "2019-23",
    image: "http://image",
    id: "kdnajsdnajsd",
  },
  {
    name: "harsh vishwakarma",
    year: "2019-23",
    image: "http://image",
    id: "kdnajsdnajsd",
  },
  {
    id: "aksndkaksndaknds",
    name: "surajit Mondal",
    year: "2019-23",
    image: "http://image",
  },
  {
    id: "askdmaksdmaskd",
    name: "kiran maharana",
    year: "2019-23",
    image: "http://image",
  },
  {
    id: "askdaksdmakmds",
    name: "harshkumar Vishwakarma",
    year: "2019-23",
    image: "http://image",
  },
  {
    id: "askdnasknddaksmd",
    name: "harsh",
    year: "2019-23",
    image: "http://image",
  },
];
import classes from "./list.module.scss";
const List = ({ selectedChat }) => {
  return (
    <div className={classes.list}>
      Alumina List
      {dummyData.map((user, i) => {
        return (
          <Bar
            onClick={() => {
              console.log(user);
              selectedChat(user.id);
            }}
            key={i}
            name={user.name}
            year={user.year}
            image={`https://avatars.dicebear.com/api/personas/${user.name}.svg`}
          />
        );
      })}
    </div>
  );
};

export default List;
