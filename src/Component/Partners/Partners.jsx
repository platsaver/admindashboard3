import React, { useState } from 'react';
import { Table, Tag, Space, Input, Row, Col, Card, Button } from 'antd';
import { SearchOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';

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
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(partnerData);

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
  const columns = [
    {
      title: 'Tên đối tác',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space direction="vertical" size="small">
          <strong>{text}</strong>
          <Tag 
            color={
              record.status === 'active' ? 'green' : 
              record.status === 'inactive' ? 'red' : 'orange'
            }
          >
            {record.status === 'active' ? 'Hoạt động' : 
             record.status === 'inactive' ? 'Ngừng hoạt động' : 'Chờ duyệt'}
          </Tag>
        </Space>
      ),
    },
    {
      title: 'Email',
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
      title: 'Địa chỉ',
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
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone) => (
        <Space>
          <PhoneOutlined />
          {phone}
        </Space>
      ),
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card
          title={
            <Row justify="end" gutter={[8, 8]}>
              <Col xs={24} sm={16} md={12} lg={8} xl={6}>
                <Input.Search
                  placeholder="Tìm kiếm theo tên, email, địa chỉ hoặc số điện thoại..."
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
            scroll={{ x: 'max-content' }} // Enable horizontal scroll for small screens
            size="middle" // Adjust table size for better mobile display
          />
        </Card>
      </Col>
    </Row>
  );
};

export default PartnerList;