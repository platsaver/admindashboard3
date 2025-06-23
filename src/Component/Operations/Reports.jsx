import React from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Divider } from 'antd';
import { CloudOutlined, FireOutlined, LineChartOutlined } from '@ant-design/icons';

const summaryStats = [
  {
    title: 'Tổng lượng phát thải CO₂',
    value: 428,
    suffix: 'tấn',
    icon: <CloudOutlined style={{ color: '#1890ff' }} />,
  },
  {
    title: 'Tín chỉ carbon đã sử dụng',
    value: 395,
    suffix: 'tín chỉ',
    icon: <FireOutlined style={{ color: '#fa541c' }} />,
  },
  {
    title: 'Tỉ lệ bù trừ',
    value: '92%',
    icon: <LineChartOutlined style={{ color: '#52c41a' }} />,
  },
];

const detailData = [
  {
    key: '1',
    chiSo: 'CBAM (EU)',
    loai: 'Chính sách',
    giaTri: '100%',
    trangThai: 'đạt yêu cầu',
  },
  {
    key: '2',
    chiSo: 'Verra Verified Credits',
    loai: 'Tín chỉ quốc tế',
    giaTri: '250 tín chỉ',
    trangThai: 'đã sử dụng',
  },
  {
    key: '3',
    chiSo: 'Phát thải quý II',
    loai: 'Phát thải',
    giaTri: '126 tấn',
    trangThai: 'đang cập nhật',
  },
];

const columns = [
  {
    title: 'Tên chỉ số',
    dataIndex: 'chiSo',
    key: 'chiSo',
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
  },
  {
    title: 'Trạng thái',
    dataIndex: 'trangThai',
    key: 'trangThai',
    render: (status) => {
      let color = 'green';
      if (status.includes('đang')) color = 'orange';
      else if (status.includes('không')) color = 'red';
      return <Tag color={color}>{status}</Tag>;
    },
  },
];

const ReportDashboard = () => {
  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[16, 16]}>
        {summaryStats.map((stat, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                suffix={stat.suffix}
                prefix={stat.icon}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Divider>Chi tiết chỉ số</Divider>

      <Card>
        <Table
          columns={columns}
          dataSource={detailData}
          pagination={false}
          scroll={{ x: true }}
        />
      </Card>
    </div>
  );
};

export default ReportDashboard;
