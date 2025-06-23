import React, { useState } from 'react';
import { Table, Tag, Space, Input, Row, Col, Card, Button } from 'antd';
import { SearchOutlined, CheckCircleOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

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
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(carbonStandards);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = carbonStandards.filter(item =>
      item.tenTieuChuan.toLowerCase().includes(value.toLowerCase()) ||
      item.loai.toLowerCase().includes(value.toLowerCase()) ||
      item.moTa.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: 'Tên tiêu chuẩn',
      dataIndex: 'tenTieuChuan',
      key: 'tenTieuChuan',
      render: (text) => (
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

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card
          title={
            <Row justify="end" gutter={[8, 8]}>
              <Col xs={24} sm={16} md={12} lg={8} xl={6}>
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
          />
        </Card>
      </Col>
    </Row>
  );
};

export default CarbonStandardList;
