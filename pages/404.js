import { Result, Button } from "antd";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
const notFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary">
          <Link href="/">
            <a>
              <AiFillHome style={{ marginRight: "10px" }} /> Home
            </a>
          </Link>
        </Button>
      }
    />
  );
};

export default notFound;
