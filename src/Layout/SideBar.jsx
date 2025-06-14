import React from "react";
import { Menu } from "antd";
import { Flex } from "antd";
import { FaLeaf } from "react-icons/fa";
import { TeamOutlined, FundOutlined, PlayCircleOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
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
        defaultOpenKeys={["management"]["management1"]}
        items={[
          {
            key: "dashboard",
            icon: <FundOutlined />,
            label: "Tổng quan",
          },
          {
            key: "management",
            icon: <TeamOutlined />,
            label: "Đối tác",
            children: [
              {
                key: "partners",
                label: "Danh sách đối tác",
              },
              {
                key: "personnel",
                label: "Nhân sự",
              },
            ],
          },
          {
            key: "management1",
            icon: <SafetyCertificateOutlined />,
            label: "Tiêu chuẩn",
            children: [
              {
                key: "standards",
                label: "Bộ tiêu chuẩn",
              },
              {
                key: "metrics",
                label: "Bộ chỉ số",
              },
            ],
          },
          {
            key: "management2",
            icon: <PlayCircleOutlined />,
            label: "Vận hành",
            children: [
              {
                key: "activities",
                label: "Hoạt động",
              },
              {
                key: "reports",
                label: "Báo cáo",
              },
              {
                key: "events",
                label: "Sự kiện",
              },
            ],
          },
        ]}
      />
    </>
  );
};

export default SideBar;