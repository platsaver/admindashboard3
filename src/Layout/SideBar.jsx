import React from "react";
import { Menu } from "antd";
import { Flex } from "antd";
import { FaLeaf } from "react-icons/fa";
import { TeamOutlined, FundOutlined, PlayCircleOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const SideBar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <Flex align="center" justify="center">
        <div className="logo">
          <FaLeaf />
        </div>
      </Flex>
      <Menu
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        className="menu-bar"
        onClick={({ key }) => navigate(key)}
        defaultOpenKeys={["management", "management1"]} 
        items={[
          {
            key: "management",
            icon: <TeamOutlined />,
            label: t('partners'),
            children: [
              {
                key: "partners",
                label: t('partners'),
              },
              {
                key: "personnel",
                label: t('personnel'),
              },
            ],
          },
          {
            key: "management1",
            icon: <SafetyCertificateOutlined />,
            label: t('standards'),
            children: [
              {
                key: "standards",
                label: t('standards'),
              },
              {
                key: "metrics",
                label: t('metrics'),
              },
            ],
          },
          {
            key: "management2",
            icon: <PlayCircleOutlined />,
            label: t('operations'),
            children: [
              {
                key: "activities",
                label: t('activities'),
              },
              {
                key: "reports",
                label: t('reports'),
              },
              {
                key: "events",
                label: t('events'),
              },
            ],
          },
        ]}
      />
    </>
  );
};

export default SideBar;