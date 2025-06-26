import React, { useState } from 'react';
import { Table, Tag, Space, Input, Row, Col, Card, Button } from 'antd';
import { SearchOutlined, SafetyCertificateOutlined, PlusOutlined } from '@ant-design/icons';
import CarbonDrawer from '../../Reusable/Drawer';

const carbonStandards = [
  {
    key: '1',
    tenTieuChuan: 'Verra (VCS)',
    loai: 'Quốc tế',
    moTa: 'Tiêu chuẩn xác minh tín chỉ carbon tự nguyện lớn nhất thế giới',
    trangThai: 'đã áp dụng',
  },
  {
    key: '2',
    tenTieuChuan: 'Gold Standard',
    loai: 'Quốc tế',
    moTa: 'Tiêu chuẩn carbon tập trung vào phát triển bền vững',
    trangThai: 'đã áp dụng',
  },
  {
    key: '3',
    tenTieuChuan: 'CBAM (EU)',
    loai: 'Pháp lý',
    moTa: 'Thuế carbon biên giới do Liên minh châu Âu áp dụng từ 2026',
    trangThai: 'bắt buộc',
  },
  {
    key: '4',
    tenTieuChuan: 'Tiêu chuẩn quốc gia (TCVN)',
    loai: 'Quốc gia',
    moTa: 'Hệ thống tiêu chuẩn hóa do Bộ TN&MT ban hành',
    trangThai: 'đang xây dựng',
  },
];

const CarbonStandardList = () => {
  const [,setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(carbonStandards);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = carbonStandards.filter(item =>
      item.tenTieuChuan.toLowerCase().includes(value.toLowerCase()) ||
      item.loai.toLowerCase().includes(value.toLowerCase()) ||
      item.moTa.toLowerCase().includes(value.toLowerCase())
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
    { name: 'tenTieuChuan', label: 'Tên tiêu chuẩn' },
    { name: 'loai', label: 'Loại' },
    { name: 'moTa', label: 'Mô tả' },
    { name: 'trangThai', label: 'Trạng thái' },
  ];

  const columns = [
    {
      title: 'Tên tiêu chuẩn',
      dataIndex: 'tenTieuChuan',
      key: 'tenTieuChuan',
      render: (text, record) => (
        <Space>
          <SafetyCertificateOutlined />
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
      title: 'Mô tả',
      dataIndex: 'moTa',
      key: 'moTa',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (status) => {
        let color = 'green';
        if (status.includes('bắt buộc')) color = 'red';
        else if (status.includes('đang xây')) color = 'orange';
        return <Tag color={color}>{status}</Tag>;
      },
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
                    placeholder="Tìm kiếm tiêu chuẩn carbon..."
                    allowClear
                    enterButton={<Button icon={<SearchOutlined />} />}
                    onSearch={handleSearch}
                    onChange={(e) => {
                      if (!e.target.value) handleSearch('');
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
                setIsAdding(false);
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

export default CarbonStandardList;