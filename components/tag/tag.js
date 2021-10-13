import { Tag } from "antd";

const TagCom = ({ tagName }) => {
  //   console.log("tagName: ", tagName);
  const colors = [
    "magenta",
    "volcano",
    "orange",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",
  ];
  return (
    <Tag
      style={{ fontSize: "20px", padding: "5px", marginBottom: "5px" }}
      color={colors[Math.floor(Math.random() * colors.length - 1)]}
    >
      {tagName}
    </Tag>
  );
};

export default TagCom;
