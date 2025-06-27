import React from "react";
import { Layout, Button } from "antd";
import { Outlet } from "react-router-dom"; // Thêm Outlet
import SideBar from "./SideBar";
import CustomHeader from "./Header";
import '@ant-design/v5-patch-for-react-19';
import "../App.css";

const { Sider, Header, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth={0}
        onBreakpoint={(broken) => setCollapsed(broken)}
        className="sider"
      >
        <SideBar />
        
      </Sider>
      <Layout>
        <Header className="header">
          <CustomHeader
            collapsed={collapsed}
            onToggle={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content className="content">
          <Outlet /> {/* Render các component con dựa trên route */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;