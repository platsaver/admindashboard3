import React, { useState } from 'react';
import { Table, Tag, Space, Input, Row, Col, Card, Button } from 'antd';
import { SearchOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined,PlusOutlined } from '@ant-design/icons';
import CarbonDrawer from '../../Reusable/Drawer';
import { useTranslation } from 'react-i18next';

const partnerData = [
  {
    key: '1',
    name: 'Công ty TNHH ABC',
    email: 'contact@abc.com.vn',
    address: 'Số 123, Đường Láng, Đống Đa, Hà Nội',
    phone: '024-3856-7890',
    status: 'active',
  },
  {
    key: '2',
    name: 'Tập đoàn XYZ',
    email: 'info@xyz.com.vn',
    address: '456 Nguyễn Huệ, Quận 1, TP.HCM',
    phone: '028-3925-1234',
    status: 'active',
  },
  {
    key: '3',
    name: 'Công ty Cổ phần DEF',
    email: 'support@def.vn',
    address: '789 Trần Hưng Đạo, Hải Châu, Đà Nẵng',
    phone: '0236-3567-890',
    status: 'inactive',
  },
  {
    key: '4',
    name: 'Doanh nghiệp GHI',
    email: 'hello@ghi.com',
    address: '321 Lê Lợi, Quận 1, TP.HCM',
    phone: '028-3876-5432',
    status: 'active',
  },
  {
    key: '5',
    name: 'Công ty JKL',
    email: 'contact@jkl.vn',
    address: '654 Hoàng Hoa Thám, Ba Đình, Hà Nội',
    phone: '024-3765-4321',
    status: 'pending',
  },
  {
    key: '6',
    name: 'Tổng công ty MNO',
    email: 'admin@mno.com.vn',
    address: '987 Nguyễn Văn Cừ, Quận 5, TP.HCM',
    phone: '028-3654-7890',
    status: 'active',
  },
  {
    key: '7',
    name: 'Công ty TNHH PQR',
    email: 'info@pqr.vn',
    address: '159 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội',
    phone: '024-3543-2109',
    status: 'active',
  },
  {
    key: '8',
    name: 'Doanh nghiệp STU',
    email: 'support@stu.com',
    address: '753 Điện Biên Phủ, Bình Thạnh, TP.HCM',
    phone: '028-3432-1098',
    status: 'inactive',
  },
  {
    key: '9',
    name: 'Công ty VWX',
    email: 'contact@vwx.vn',
    address: '852 Cầu Giấy, Cầu Giấy, Hà Nội',
    phone: '024-3321-0987',
    status: 'pending',
  },
  {
    key: '10',
    name: 'Tập đoàn YZ',
    email: 'hello@yz.com.vn',
    address: '741 Võ Văn Tần, Quận 3, TP.HCM',
    phone: '028-3210-9876',
    status: 'active',
  },
  {
    key: '11',
    name: 'Công ty Alpha',
    email: 'info@alpha.vn',
    address: '963 Hai Bà Trưng, Quận 1, TP.HCM',
    phone: '028-3109-8765',
    status: 'active',
  },
  {
    key: '12',
    name: 'Doanh nghiệp Beta',
    email: 'contact@beta.com',
    address: '147 Nguyễn Thái Học, Ba Đình, Hà Nội',
    phone: '024-3098-7654',
    status: 'inactive',
  }
];

const PartnerList = () => {
  const [,setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(partnerData);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const { t } = useTranslation();

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = partnerData.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.email.toLowerCase().includes(value.toLowerCase()) ||
      item.address.toLowerCase().includes(value.toLowerCase()) ||
      item.phone.includes(value)
    );
    setFilteredData(filtered);
  };
  const handleUpdate = (updatedRecord) => {
    setFilteredData((prev) =>
      prev.map((item) => (item.key === updatedRecord.key ? updatedRecord : item))
    );
  };

  const handleAdd = (newRecord) => {
    setFilteredData((prev) => [...prev, { ...newRecord, key: `${prev.length + 1}` }]);
  };

  const handleDelete = (key) => {
    setFilteredData((prev) => prev.filter((item) => item.key !== key));
  };

  const fieldsConfig = [
    { name: 'name', label: 'Tên Doanh nghiệp' },
    { name: 'email', label: 'Email' },
    { name: 'address', label: 'Địa chỉ' },
    { name: 'phone', label: 'Số điện thoại' },
    { name: 'status', label: 'Trạng thái' } 
  ];
  const columns = [
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space direction="vertical" size="small">
          <strong>{text}</strong>
        </Space>
      ),
    },
    {
      title: t('Email'),
      dataIndex: 'email',
      key: 'email',
      render: (email) => (
        <Space>
          <MailOutlined />
          {email}
        </Space>
      ),
    },
    {
      title: t('address'),
      dataIndex: 'address',
      key: 'address',
      render: (address) => (
        <Space>
          <EnvironmentOutlined />
          {address}
        </Space>
      ),
    },
    {
      title: t('phone'),
      dataIndex: 'phone',
      key: 'phone',
      render: (phone) => (
        <Space>
          <PhoneOutlined />
          {phone}
        </Space>
      ),
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === 'active' ? 'green' : status === 'inactive' ? 'red' : 'orange';
        const label = status === 'active'
          ? t('active')
          : status === 'inactive'
          ? t('inactive')
          : t('pending');
        return <Tag color={color}>{label}</Tag>;
      }
    }
  ];

  const handleOpenAddDrawer = () => {
    setIsAdding(true);
    setSelectedRecord(null);
    setDrawerVisible(true);
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card
          title={
            <Row justify="end" gutter={[8, 8]}>
              <Col xs={24} sm={16} md={12} lg={8} xl={6}>
              <Space>
                <Input.Search
                  placeholder={t('partnerSearch')}
                  allowClear
                  enterButton={<Button icon={<SearchOutlined />} />}
                  onSearch={handleSearch}
                  onChange={(e) => {
                    if (!e.target.value) {
                      handleSearch('');
                    }
                  }}
                  style={{ width: '100%' }}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleOpenAddDrawer}
                  className="force-color"
                >
                </Button>
              </Space>
              </Col>
            </Row>
          }
          styles={{ padding: 16 }}
        >
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{
              responsive: true,
              pageSize: 5,
            }}
            scroll={{ x: 'max-content' }} 
            size="middle"
            onRow={(record) => ({
              onClick: () => {
                setSelectedRecord(record);
                setDrawerVisible(true);
              },
              style: { cursor: 'pointer' },
            })}
          />
          <CarbonDrawer
            visible={drawerVisible}
            onClose={() => {
              setDrawerVisible(false);
              setIsAdding(false);
            }}
            record={selectedRecord}
            onUpdate={handleUpdate}
            onAdd={handleAdd}
            onDelete={handleDelete}
            fieldsConfig={fieldsConfig}
            isAdding={isAdding}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default PartnerList;