import React, { useState } from 'react';
import { Table, Tag, Space, Button, Input, Avatar, Typography, Row, Col, Card } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title } = Typography;

// Dữ liệu mẫu cho danh sách đối tác
const partnerData = [
  {
    key: '1',
    name: 'Công ty TNHH ABC',
    email: 'contact@abc.com.vn',
    address: 'Số 123, Đường Láng, Đống Đa, Hà Nội',
    phone: '024-3856-7890',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=ABC&background=1890ff&color=fff'
  },
  {
    key: '2',
    name: 'Tập đoàn XYZ',
    email: 'info@xyz.com.vn',
    address: '456 Nguyễn Huệ, Quận 1, TP.HCM',
    phone: '028-3925-1234',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=XYZ&background=52c41a&color=fff'
  },
  {
    key: '3',
    name: 'Công ty Cổ phần DEF',
    email: 'support@def.vn',
    address: '789 Trần Hưng Đạo, Hải Châu, Đà Nẵng',
    phone: '0236-3567-890',
    status: 'inactive',
    avatar: 'https://ui-avatars.com/api/?name=DEF&background=faad14&color=fff'
  },
  {
    key: '4',
    name: 'Doanh nghiệp GHI',
    email: 'hello@ghi.com',
    address: '321 Lê Lợi, Quận 1, TP.HCM',
    phone: '028-3876-5432',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=GHI&background=722ed1&color=fff'
  },
  {
    key: '5',
    name: 'Công ty JKL',
    email: 'contact@jkl.vn',
    address: '654 Hoàng Hoa Thám, Ba Đình, Hà Nội',
    phone: '024-3765-4321',
    status: 'pending',
    avatar: 'https://ui-avatars.com/api/?name=JKL&background=eb2f96&color=fff'
  },
  {
    key: '6',
    name: 'Tổng công ty MNO',
    email: 'admin@mno.com.vn',
    address: '987 Nguyễn Văn Cừ, Quận 5, TP.HCM',
    phone: '028-3654-7890',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=MNO&background=13c2c2&color=fff'
  },
  {
    key: '7',
    name: 'Công ty TNHH PQR',
    email: 'info@pqr.vn',
    address: '159 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội',
    phone: '024-3543-2109',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=PQR&background=f5222d&color=fff'
  },
  {
    key: '8',
    name: 'Doanh nghiệp STU',
    email: 'support@stu.com',
    address: '753 Điện Biên Phủ, Bình Thạnh, TP.HCM',
    phone: '028-3432-1098',
    status: 'inactive',
    avatar: 'https://ui-avatars.com/api/?name=STU&background=fa8c16&color=fff'
  },
  {
    key: '9',
    name: 'Công ty VWX',
    email: 'contact@vwx.vn',
    address: '852 Cầu Giấy, Cầu Giấy, Hà Nội',
    phone: '024-3321-0987',
    status: 'pending',
    avatar: 'https://ui-avatars.com/api/?name=VWX&background=2f54eb&color=fff'
  },
  {
    key: '10',
    name: 'Tập đoàn YZ',
    email: 'hello@yz.com.vn',
    address: '741 Võ Văn Tần, Quận 3, TP.HCM',
    phone: '028-3210-9876',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=YZ&background=52c41a&color=fff'
  },
  {
    key: '11',
    name: 'Công ty Alpha',
    email: 'info@alpha.vn',
    address: '963 Hai Bà Trưng, Quận 1, TP.HCM',
    phone: '028-3109-8765',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Alpha&background=1890ff&color=fff'
  },
  {
    key: '12',
    name: 'Doanh nghiệp Beta',
    email: 'contact@beta.com',
    address: '147 Nguyễn Thái Học, Ba Đình, Hà Nội',
    phone: '024-3098-7654',
    status: 'inactive',
    avatar: 'https://ui-avatars.com/api/?name=Beta&background=faad14&color=fff'
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
      width: 250,
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={record.avatar} size={40} style={{ marginRight: 12 }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{text}</div>
            <Tag 
              color={
                record.status === 'active' ? 'green' : 
                record.status === 'inactive' ? 'red' : 'orange'
              }
              style={{ marginTop: 4, fontSize: 11 }}
            >
              {record.status === 'active' ? 'Hoạt động' : 
               record.status === 'inactive' ? 'Ngừng hoạt động' : 'Chờ duyệt'}
            </Tag>
          </div>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      render: (email) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MailOutlined style={{ marginRight: 6, color: '#1890ff' }} />
          <a href={`mailto:${email}`} style={{ color: '#1890ff' }}>
            {email}
          </a>
        </div>
      ),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      width: 300,
      render: (address) => (
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <EnvironmentOutlined style={{ marginRight: 6, color: '#52c41a', marginTop: 2 }} />
          <span style={{ lineHeight: '20px' }}>{address}</span>
        </div>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
      render: (phone) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <PhoneOutlined style={{ marginRight: 6, color: '#fa8c16' }} />
          <a href={`tel:${phone}`} style={{ color: '#fa8c16' }}>
            {phone}
          </a>
        </div>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            size="small"
            style={{ color: '#1890ff' }}
            onClick={() => console.log('Edit:', record.key)}
          >
            Sửa
          </Button>
          <Button 
            type="text" 
            icon={<DeleteOutlined />} 
            size="small"
            danger
            onClick={() => console.log('Delete:', record.key)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Row style={{ background: '#f0f2f5', minHeight: '100vh', padding: 24 }}>
      <Col span={24}>
        <Card 
          title={
            <Row justify="space-between" align="middle">
              <Col xs={24} sm={12} md={8}>
                <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
                  Danh sách Đối tác
                </Title>
              </Col>
              <Col xs={24} sm={12} md={16} style={{ textAlign: 'right' }}>
                <Input.Search
                  placeholder="Tìm kiếm theo tên, email, địa chỉ hoặc số điện thoại..."
                  allowClear
                  enterButton={<SearchOutlined />}
                  size="large"
                  style={{ width: '100%', maxWidth: 400 }}
                  onSearch={handleSearch}
                  onChange={(e) => {
                    if (!e.target.value) {
                      handleSearch('');
                    }
                  }}
                />
              </Col>
            </Row>
          }
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        >
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{
              pageSize: 5,
              responsive: true,
            }}
            scroll={{ x: 1000 }}
            rowClassName={(record, index) => 
              index % 2 === 0 ? 'even-row' : 'odd-row'
            }
          />
        </Card>
      </Col>
    </Row>
  );
};

export default PartnerList;