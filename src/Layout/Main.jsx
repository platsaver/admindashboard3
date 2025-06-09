import React from "react";
import { Layout, Button } from 'antd';
import SideBar from "./SideBar";
import CustomHeader from "./Header";
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import '../App.css';

const { Sider, Header, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <Layout>
      <Sider 
        theme='light' 
        trigger={null} 
        collapsible 
        collapsed={collapsed} 
        className="sider"
      >
        <SideBar />
        <Button 
          type='text' 
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} 
          onClick={() => setCollapsed(!collapsed)}
          className="trigger-btn"
        />
      </Sider>
      <Layout>
        <Header className="header">
          <CustomHeader/>
        </Header>
        <Content className="content"></Content>
      </Layout>
    </Layout>
  );
};

export default App;
