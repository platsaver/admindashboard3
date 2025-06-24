import React, { useState } from 'react';
import { Table, Tag, Space, Input, Row, Col, Card, Button } from 'antd';
import { SearchOutlined, PhoneOutlined, MailOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import CarbonDrawer from '../../Reusable/Drawer';

const nhanSuData = [
  {
    key: '1',
    tenNhanSu: 'Nguyễn Văn An',
    soDienThoai: '0901234567',
    email: 'nguyenvanan@company.com',
    vaiTro: 'Nhân viên',
    status: 'active',
  },
  {
    key: '2',
    tenNhanSu: 'Trần Thị Bình',
    soDienThoai: '0912345678',
    email: 'tranthibinh@company.com',
    vaiTro: 'Nhân viên',
    status: 'active',
  },
  {
    key: '3',
    tenNhanSu: 'Lê Minh Cường',
    soDienThoai: '0923456789',
    email: 'leminhcuong@company.com',
    vaiTro: 'Người cấp chứng chỉ',
    status: 'active',
  },
  {
    key: '4',
    tenNhanSu: 'Phạm Thu Hà',
    soDienThoai: '0934567890',
    email: 'phamthuha@company.com',
    vaiTro: 'Nhân viên',
    status: 'inactive',
  },
  {
    key: '5',
    tenNhanSu: 'Hoàng Văn Đức',
    soDienThoai: '0945678901',
    email: 'hoangvanduc@company.com',
    vaiTro: 'Hỗ trợ cấp chứng chỉ',
    status: 'active',
  },
  {
    key: '6',
    tenNhanSu: 'Đinh Thị Lan',
    soDienThoai: '0956781234',
    email: 'dinhthilan@company.com',
    vaiTro: 'Hỗ trợ cấp chứng chỉ',
    status: 'active',
  },
  {
    key: '7',
    tenNhanSu: 'Vũ Minh Tuấn',
    soDienThoai: '0967812345',
    email: 'vuminhtuan@company.com',
    vaiTro: 'Quản lý',
    status: 'pending',
  },
  {
    key: '8',
    tenNhanSu: 'Ngô Thị Mai',
    soDienThoai: '0978123456',
    email: 'ngothimai@company.com',
    vaiTro: 'Chuyên viên',
    status: 'active',
  },
  {
    key: '9',
    tenNhanSu: 'Đỗ Văn Hùng',
    soDienThoai: '0989234567',
    email: 'dovanhung@company.com',
    vaiTro: 'Trưởng nhóm',
    status: 'active',
  },
  {
    key: '10',
    tenNhanSu: 'Bùi Thị Thu',
    soDienThoai: '0990345678',
    email: 'buithithu@company.com',
    vaiTro: 'Nhân viên',
    status: 'inactive',
  },
  {
    key: '11',
    tenNhanSu: 'Trương Minh Khoa',
    soDienThoai: '0901456789',
    email: 'truongminhkhoa@company.com',
    vaiTro: 'Kỹ thuật viên',
    status: 'active',
  },
  {
    key: '12',
    tenNhanSu: 'Lý Thị Hoa',
    soDienThoai: '0912567890',
    email: 'lythihoa@company.com',
    vaiTro: 'Thực tập sinh',
    status: 'pending',
  }
];

const NhanSuList = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(nhanSuData);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = nhanSuData.filter(item =>
      item.tenNhanSu.toLowerCase().includes(value.toLowerCase()) ||
      item.email.toLowerCase().includes(value.toLowerCase()) ||
      item.vaiTro.toLowerCase().includes(value.toLowerCase()) ||
      item.soDienThoai.includes(value)
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
    { name: 'tenNhanSu', label: 'Tên nhân sự' },
    { name: 'soDienThoai', label: 'Số điện thoại' },
    { name: 'email', label: 'Email' },
    { name: 'vaiTro', label: 'Vai trò' },
    { name: 'status', label: 'Trạng thái' } 
  ];

  const columns = [
    {
      title: 'Tên nhân sự',
      dataIndex: 'tenNhanSu',
      key: 'tenNhanSu',
      render: (text, record) => (
        <Space direction="vertical" size="small">
          <strong>{text}</strong>
        </Space>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDienThoai',
      key: 'soDienThoai',
      render: (phone) => (
        <Space>
          <PhoneOutlined />
          {phone}
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
      title: 'Vai trò',
      dataIndex: 'vaiTro',
      key: 'vaiTro',
      render: (role) => (
        <Space>
          <UserOutlined />
          <Tag color="blue">{role}</Tag>
        </Space>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === 'active' ? 'green' : status === 'inactive' ? 'red' : 'orange';
        const label = status === 'active' ? 'Đang làm việc' : status === 'inactive' ? 'Nghỉ việc' : 'Chờ duyệt';
        return <Tag color={color}>{label}</Tag>;
      },
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
                    placeholder="Tìm kiếm theo tên, email, vai trò hoặc số điện thoại..."
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

export default NhanSuList;