import React from "react";
import { Menu } from "antd";
import { Flex } from "antd"; 
import {FaLeaf} from 'react-icons/fa';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
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
        onClick={({ key }) => navigate(key)}
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
