import React from "react";
import { Layout, Button } from "antd";
import { Outlet } from "react-router-dom"; // Thêm Outlet
import SideBar from "./SideBar";
import CustomHeader from "./Header";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
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
        onBreakpoint={(broken) => setCollapsed(broken)}
        className="sider"
      >
        <SideBar />
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="trigger-btn"
        />
      </Sider>
      <Layout>
        <Header className="header">
          <CustomHeader />
        </Header>
        <Content className="content">
          <Outlet /> {/* Render các component con dựa trên route */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;