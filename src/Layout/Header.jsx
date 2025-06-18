import { Flex, Typography, Avatar, Menu, Dropdown, Badge } from "antd";
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from 'react-i18next';

const CustomHeader = () => {
  const { t, i18n } = useTranslation(); // Lấy cả t và i18n

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

  const languageMenu = (
    <Menu
      items={[
        {
          key: 'en',
          label: t('english'), 
          onClick: () => {
            i18n.changeLanguage('en');
            console.log('Selected English');
          },
        },
        {
          key: 'vi',
          label: t('vietnamese'), 
          onClick: () => {
            i18n.changeLanguage('vi');
            console.log('Selected Vietnamese');
          },
        },
      ]}
    />
  );

  return (
    <Flex align="center" justify="space-between">
      <Typography.Title level={4} type="secondary"></Typography.Title>
      <Flex align="center" gap="3rem">
        <Flex align="center" gap="10px">
          <Dropdown
            overlay={notificationMenu}
            trigger={['hover']}
            placement="bottomRight"
          >
            <Badge dot>
              <BellOutlined className="header-icon" style={{ cursor: 'pointer' }} />
            </Badge>
          </Dropdown>
          <Dropdown
            overlay={languageMenu}
            trigger={['hover']}
            placement="bottomRight"
          >
            <GlobalOutlined className="header-icon" />
          </Dropdown>
          <Avatar icon={<UserOutlined />} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CustomHeader;