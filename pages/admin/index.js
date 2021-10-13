import { getSession } from "next-auth/client";
import AdminComponent from "../../components/admin/Admin";
import User from "../../model/user";
const Admin = () => {
  return (
    <div>
      <AdminComponent />
    </div>
  );
};

export default Admin;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      notFound: true,
    };
  }
  let validUser = true;
  await User.findOne({ _id: session.user.userID }).then((user) => {
    console.log("user: ", user);
    if (!user) {
      validUser = false;
    }
    if (!user.isAdmin) {
      validUser = false;
    }
  });

  if (!validUser) {
    return {
      notFound: true,
    };
  }
  return {
    props: {},
  };
};
