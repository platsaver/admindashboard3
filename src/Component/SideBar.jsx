import React from "react";
import { Menu } from "antd";
import { Flex } from "antd"; 
import {FaLeaf} from 'react-icons/fa';
import { UserOutlined } from '@ant-design/icons';
const SideBar = () => {
  return (
    <>
      <Flex align='center' justify='center'>
        <div className="logo">
            <FaLeaf />
        </div>
      </Flex>
      <Menu 
        mode="inline" 
        defaultSelectedKeys={['1']} 
        className="menu-bar" 
        items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: 'Tổng quan',
          },
          {
            key: '2',
            icon: <UserOutlined />,
            label: 'Đối tác',
          },
          {
            key: '3',
            icon: <UserOutlined />,
            label: 'Tiêu chuẩn',
          },
          {
            key: '4',
            icon: <UserOutlined />,
            label: 'Vận hành',
          }
        ]}
      />
    </>
  );
};

export default SideBar;
