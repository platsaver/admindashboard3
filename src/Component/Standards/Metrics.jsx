import React, { useState } from 'react';
import { Table, Tag, Space, Input, Row, Col, Card, Button } from 'antd';
import { SearchOutlined, CloudOutlined, FireOutlined } from '@ant-design/icons';
import CarbonDrawer from '../../Reusable/Drawer';

const carbonData = [
  {
    key: '1',
    tenChiSo: 'Lượng phát thải CO₂ (tháng 6)',
    loai: 'Phát thải',
    giaTri: '128 tấn',
    trangThai: 'vượt ngưỡng',
  },
  {
    key: '2',
    tenChiSo: 'Tín chỉ carbon đã mua',
    loai: 'Bù trừ',
    giaTri: '150 tấn',
    trangThai: 'đã bù đủ',
  },
  {
    key: '3',
    tenChiSo: 'Tín chỉ khả dụng',
    loai: 'Tài sản carbon',
    giaTri: '42 tín chỉ',
    trangThai: 'còn lại',
  },
  {
    key: '4',
    tenChiSo: 'Tỉ lệ tuân thủ CBAM',
    loai: 'Chính sách',
    giaTri: '100%',
    trangThai: 'đạt yêu cầu',
  },
];

const CarbonCreditDashboard = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(carbonData);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = carbonData.filter(item =>
      item.tenChiSo.toLowerCase().includes(value.toLowerCase()) ||
      item.loai.toLowerCase().includes(value.toLowerCase())
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
    { name: 'tenChiSo', label: 'Tên chỉ số' },
    { name: 'loai', label: 'Loại' },
    { name: 'giaTri', label: 'Giá trị' },
    { name: 'trangThai', label: 'Trạng thái' },
  ];

  const columns = [
    {
      title: 'Tên chỉ số',
      dataIndex: 'tenChiSo',
      key: 'tenChiSo',
      render: (text, record) => (
        <Space>
          <CloudOutlined />
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
      title: 'Giá trị',
      dataIndex: 'giaTri',
      key: 'giaTri',
      render: (value) => (
        <Space>
          <FireOutlined />
          {value}
        </Space>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (status) => {
        let color = 'green';
        if (status.includes('vượt')) color = 'red';
        else if (status.includes('còn lại')) color = 'gold';
        else if (status.includes('đã bù')) color = 'blue';
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
                  placeholder="Tìm kiếm chỉ số carbon..."
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

export default CarbonCreditDashboard;