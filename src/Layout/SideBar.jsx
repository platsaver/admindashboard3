import React from "react";
import { Menu } from "antd";
import { Flex } from "antd";
import { FaLeaf } from "react-icons/fa";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <Flex align="center" justify="center">
        <div className="logo">
          <FaLeaf />
        </div>
      </Flex>
      <Menu
        mode="inline"
        defaultSelectedKeys={["dashboard"]} // Match default route
        className="menu-bar"
        onClick={({ key }) => navigate(key)}
        items={[
          {
            key: "dashboard",
            icon: <UserOutlined />,
            label: "Tổng quan",
          },
          {
            key: "partners",
            icon: <UserOutlined />,
            label: "Đối tác",
          },
          {
            key: "standards",
            icon: <UserOutlined />,
            label: "Tiêu chuẩn",
          },
          {
            key: "operations",
            icon: <UserOutlined />,
            label: "Vận hành",
          },
        ]}
      />
    </>
  );
};

export default SideBar;