import React, { useState } from 'react';
import { Table, Tag, Space, Input, Row, Col, Card, Button } from 'antd';
import { SearchOutlined, CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import CarbonDrawer from '../../Reusable/Drawer';

const carbonEvents = [
  {
    key: '1',
    tenSuKien: 'Hội thảo CBAM & Thị trường carbon',
    loai: 'Hội thảo',
    thoiGian: '15/07/2025',
    status: 'sắp diễn ra',
  },
  {
    key: '2',
    tenSuKien: 'Giao lưu doanh nghiệp - chia sẻ tín chỉ',
    loai: 'Kết nối',
    thoiGian: '10/05/2025',
    status: 'đã tổ chức',
  },
  {
    key: '3',
    tenSuKien: 'Chiến dịch "Plant 1 Million Trees"',
    loai: 'Hoạt động cộng đồng',
    thoiGian: '02/09/2025',
    status: 'đang mở đăng ký',
  },
  {
    key: '4',
    tenSuKien: 'Họp nội bộ đánh giá tín chỉ quý II',
    loai: 'Nội bộ',
    thoiGian: '30/06/2025',
    status: 'hoàn thành',
  },
];

const CarbonEventList = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(carbonEvents);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = carbonEvents.filter(item =>
      item.tenSuKien.toLowerCase().includes(value.toLowerCase()) ||
      item.loai.toLowerCase().includes(value.toLowerCase()) ||
      item.status.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const handleUpdate = (updatedRecord) => {
    setFilteredData((prev) =>
      prev.map((item) => (item.key === updatedRecord.key ? updatedRecord : item))
    );
  };

  const handleDelete = (key) => {
    setFilteredData((prev) => prev.filter((item) => item.key !== key));
  };

  const fieldsConfig = [
    { name: 'tenSuKien', label: 'Tên hoạt động' },
    { name: 'loai', label: 'Loại' },
    { name: 'thoiGian', label: 'Thời gian' },
    { name: 'status', label: 'Trạng thái' } 
  ];

  const columns = [
    {
      title: 'Tên sự kiện',
      dataIndex: 'tenSuKien',
      key: 'tenSuKien',
      render: (text) => (
        <Space>
          <EnvironmentOutlined />
          <strong>{text}</strong>
        </Space>
      ),
    },
    {
      title: 'Loại',
      dataIndex: 'loai',
      key: 'loai',
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Thời gian',
      dataIndex: 'thoiGian',
      key: 'thoiGian',
      render: (text) => (
        <Space>
          <CalendarOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        if (!status) return <Tag color="default">Không xác định</Tag>;
        let color = 'green';
        if (status.includes('sắp')) color = 'orange';
        else if (status.includes('đang')) color = 'gold';
        else if (status.includes('hoàn') || status.includes('đã tổ')) color = 'green';
        return <Tag color={color}>{status}</Tag>;
      },
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
                  placeholder="Tìm kiếm sự kiện..."
                  allowClear
                  enterButton={<Button icon={<SearchOutlined />} />}
                  onSearch={handleSearch}
                  onChange={(e) => {
                    if (!e.target.value) handleSearch('');
                  }}
                  style={{ width: '100%' }}
                />
              </Col>
            </Row>
          }
        >
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{ responsive: true, pageSize: 5 }}
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
          {selectedRecord && (
            <CarbonDrawer
              visible={drawerVisible}
              onClose={() => setDrawerVisible(false)}
              record={selectedRecord}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              fieldsConfig={fieldsConfig}
            />
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default CarbonEventList;
