import React, { useState } from 'react';
import { Table, Tag, Space, Input, Row, Col, Card, Button } from 'antd';
import { SearchOutlined, PhoneOutlined, MailOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import CarbonDrawer from '../../Reusable/Drawer';
import { useTranslation } from 'react-i18next';
import '@ant-design/v5-patch-for-react-19';

const nhanSuData = [
  {
    key: '1',
    tenNhanSu: 'Nguyễn Văn An',
    soDienThoai: '0901234567',
    email: 'nguyenvanan@company.com',
    vaiTro: 'staff',
    status: 'working',
    dob: '12/03/1990',
  },
  {
    key: '2',
    tenNhanSu: 'Trần Thị Bình',
    soDienThoai: '0912345678',
    email: 'tranthibinh@company.com',
    vaiTro: 'staff',
    status: 'retired',
    dob: '24/07/1992',
    lydo: 'Hết hợp đồng lao động'
  },
  {
    key: '3',
    tenNhanSu: 'Lê Minh Cường',
    soDienThoai: '0923456789',
    email: 'leminhcuong@company.com',
    vaiTro: 'professional',
    status: 'working',
    dob: '08/01/1988',
  },
  {
    key: '4',
    tenNhanSu: 'Phạm Thu Hà',
    soDienThoai: '0934567890',
    email: 'phamthuha@company.com',
    vaiTro: 'staff',
    status: 'retired',
    dob: '15/06/1995',
  },
  {
    key: '5',
    tenNhanSu: 'Hoàng Văn Đức',
    soDienThoai: '0945678901',
    email: 'hoangvanduc@company.com',
    vaiTro: 'professional',
    status: 'working',
    dob: '29/09/1987',
  },
  {
    key: '6',
    tenNhanSu: 'Đinh Thị Lan',
    soDienThoai: '0956781234',
    email: 'dinhthilan@company.com',
    vaiTro: 'professional',
    status: 'working',
    dob: '03/05/1993',
  },
  {
    key: '7',
    tenNhanSu: 'Vũ Minh Tuấn',
    soDienThoai: '0967812345',
    email: 'vuminhtuan@company.com',
    vaiTro: 'manager',
    status: 'working',
    dob: '10/12/1985',
  },
  {
    key: '8',
    tenNhanSu: 'Ngô Thị Mai',
    soDienThoai: '0978123456',
    email: 'ngothimai@company.com',
    vaiTro: 'admin',
    status: 'working',
    dob: '06/04/1990',
  },
  {
    key: '9',
    tenNhanSu: 'Đỗ Văn Hùng',
    soDienThoai: '0989234567',
    email: 'dovanhung@company.com',
    vaiTro: 'superAdmin',
    status: 'working',
    dob: '27/08/1989',
  },
  {
    key: '10',
    tenNhanSu: 'Bùi Thị Thu',
    soDienThoai: '0990345678',
    email: 'buithithu@company.com',
    vaiTro: 'staff',
    status: 'retired',
    dob: '13/11/1994',
  },
  {
    key: '11',
    tenNhanSu: 'Trương Minh Khoa',
    soDienThoai: '0901456789',
    email: 'truongminhkhoa@company.com',
    vaiTro: 'staff',
    status: 'working',
    dob: '02/02/1991',
  },
  {
    key: '12',
    tenNhanSu: 'Lý Thị Hoa',
    soDienThoai: '0912567890',
    email: 'lythihoa@company.com',
    vaiTro: 'manager',
    status: 'working',
    dob: '19/07/2000',
  }
];

const NhanSuList = () => {
  const { t } = useTranslation();
  const [,setSearchText] = useState('');
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
    {
      name: 'tenNhanSu',
      label: t('name'),
      rules: [{ required: true, message: `${t('name')} ${t('isRequired')}` }],
    },
    {
      name: 'soDienThoai',
      label: t('phone'),
      rules: [{ required: true, message: `${t('phone')} ${t('isRequired')}` }],
    },
    {
      name: 'email',
      label: t('email'),
      rules: [{ required: true, message: `${t('email')} ${t('isRequired')}` }],
    },
    {
      name: 'vaiTro',
      label: t('role'),
      type: 'select',
      options: [
        { value: 'staff', label: t('staff') },
        { value: 'manager', label: t('manager') },
        { value: 'professional', label: t('professional') },
        { value: 'admin', label: t('admin') },
        { value: 'superAdmin', label: t('superAdmin') },
      ],
      rules: [{ required: true, message: `${t('role')} ${t('isRequired')}` }],
    },
    {
      name: 'status',
      label: t('status'),
      type: 'select',
      options: [
        { value: 'working', label: t('working') },
        { value: 'retired', label: t('retired') },
      ],
      rules: [{ required: true, message: `${t('status')} ${t('isRequired')}` }],
    },
    {
      name: 'dob',
      label: t('dob'),
      rules: [{ required: true, message: `${t('dob')} ${t('isRequired')}` }],
    },
    {
      name: 'lydo',
      label: t('retiredReason') // Không có rules → không bắt buộc
    }
  ];

  const columns = [
    {
      title: t('name'),
      dataIndex: 'tenNhanSu',
      key: 'tenNhanSu',
      render: (text, record) => (
        <Space direction="vertical" size="small">
          <strong>{text}</strong>
        </Space>
      ),
    },
    {
      title: t('phone'),
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
      title: t('email'),
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
      title: t('role'),
      dataIndex: 'vaiTro',
      key: 'vaiTro',
      render: (role) => (
        <Space>
          <UserOutlined />
          <Tag color="blue">{t(role)}</Tag>
        </Space>
      ),
    },
    {
      title: t('dob'),
      dataIndex: 'dob',
      key: 'dob',
      render: (dob) => (
        <Space>
          <MailOutlined />
          {dob}
        </Space>
      ),
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color =
          status === 'working' ? 'green' :
          status === 'retired' ? 'red' :
          'orange';

        const label =
          status === 'working' ? t('working') :
          status === 'retired' ? t('retired') :
          null;

        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: t('retiredReason'),
      dataIndex: 'lydo',
      key: 'lydo',
      render: (lydo) => (
        <Space>
          {lydo}
        </Space>
      ),
    },
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
                    placeholder={t('personnelSearch')}
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