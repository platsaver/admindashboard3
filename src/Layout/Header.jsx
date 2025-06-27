import { Flex, Avatar, Menu, Dropdown, Badge, Button } from "antd";
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '@ant-design/v5-patch-for-react-19';

const CustomHeader = ({ collapsed, onToggle }) => {
  const { t } = useTranslation();

  const notificationMenu = (
    <Menu
      items={[
        {
          key: '1',
          label: 'New message from Admin',
          onClick: () => console.log('Notification 1 clicked'),
        },
        {
          key: '2',
          label: 'System update available',
          onClick: () => console.log('Notification 2 clicked'),
        },
        {
          key: '3',
          label: 'Meeting reminder at 3 PM',
          onClick: () => console.log('Notification 3 clicked'),
        },
      ]}
    />
  );

  const userMenu = (
    <Menu
      items={[
        {
          key: 'logout',
          label: t('Log Out'),
          onClick: () => {
            localStorage.removeItem('access_token');
            navigate('/verify');
          },
        },
      ]}
    />
  );
  const navigate = useNavigate();

  return (
    <Flex align="center" justify="space-between">
      <Flex align="center" justify="start">
          <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
          className="trigger-btn"
          style={{ fontSize: 18 }}
          />
      </Flex>
      <Flex align="center" justify="end">
        <Flex align="center" gap="10px">
          <Dropdown overlay={notificationMenu} trigger={['hover']} placement="bottomRight">
            <Badge dot>
              <BellOutlined className="header-icon" style={{ cursor: 'pointer' }} />
            </Badge>
          </Dropdown>
          <Dropdown overlay={userMenu} trigger={['hover']} placement="bottomRight">
            <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
          </Dropdown>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CustomHeader;