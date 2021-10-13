import { Tabs } from "antd";
import AllAlumina from "../allAlumina/allAlumina";
import AllUsers from "../allUsers/allUsers";
const { TabPane } = Tabs;
const AdminComponent = () => {
  return (
    <div>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="All Alumina Details" key="1">
          <AllAlumina />
        </TabPane>
        <TabPane tab="All Users" key="2">
          <AllUsers />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminComponent;
