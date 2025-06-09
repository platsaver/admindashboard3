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
        defaultOpenKeys={["management"]}
        items={[
          {
            key: "dashboard",
            icon: <UserOutlined />,
            label: "Tổng quan",
          },
          {
            key: "management",
            icon: <UserOutlined/>,
            label: "Đối tác",
            children: [
              {
                key: "partners",
                label: "Đối tác",
              },
              {
                key: "personnel",
                label: "Nhân sự",
              },
            ],
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