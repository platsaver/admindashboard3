import React from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Divider, Space } from 'antd';
import { CloudOutlined, FireOutlined, LineChartOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const recentUpdates = [
  {
    key: '1',
    chiSo: 'Phát thải quý I',
    thoiGian: '12/06/2025',
    thayDoi: 'Tăng từ 118 lên 126 tấn',
    minhChung: 'https://example.com/images/update1.jpg',
  },
  {
    key: '2',
    chiSo: 'Tín chỉ Verra',
    thoiGian: '10/06/2025',
    thayDoi: 'Giảm từ 270 còn 250 tín chỉ',
    minhChung: 'https://example.com/images/update2.jpg',
  },
  {
    key: '3',
    chiSo: 'Tỉ lệ CBAM',
    thoiGian: '09/06/2025',
    thayDoi: 'Từ 95% cập nhật thành 100%',
    minhChung: 'https://example.com/images/update3.jpg',
  },
];


const postData = [
  {
    key: '1',
    tieuDe: 'Cơ hội đầu tư tín chỉ carbon tại Đông Nam Á',
    tacGia: 'Nguyễn Văn A',
    ngayDang: '12/06/2025',
    binhLuan: 14,
    luotThich: 87,
  },
  {
    key: '2',
    tieuDe: 'So sánh các hệ thống định giá carbon toàn cầu',
    tacGia: 'Lê Thị B',
    ngayDang: '28/05/2025',
    binhLuan: 5,
    luotThich: 42,
  },
  {
    key: '3',
    tieuDe: 'Áp dụng CBAM và tác động đến thị trường Việt Nam',
    tacGia: 'Hoàng Minh C',
    ngayDang: '05/05/2025',
    binhLuan: 23,
    luotThich: 119,
  },
];

const PostDashboard = () => {
  const { t } = useTranslation();
  /*Tổng quan*/
  const summaryStats = [
    {
      title: t('totalEmission'),
      value: 428,
      icon: <CloudOutlined style={{ color: '#1890ff' }} />,
    },
    {
      title: t('useCarbonCredit'),
      value: 395,
      icon: <FireOutlined style={{ color: '#fa541c' }} />,
    },
    {
      title: t('offsetRate'),
      value: '92%',
      icon: <LineChartOutlined style={{ color: '#52c41a' }} />,
    },
  ];
  /*Bài viết*/
  const columns = [
    {
      title: t('title'),
      dataIndex: 'tieuDe',
      key: 'tieuDe',
      render: (title) => <strong>{title}</strong>,
    },
    {
      title: t('author'),
      dataIndex: 'tacGia',
      key: 'tacGia',
      render: (author) => <Tag color="blue">{author}</Tag>,
    },
    {
      title: t('publishedDate'),
      dataIndex: 'ngayDang',
      key: 'ngayDang',
    },
    {
      title: t('interaction'),
      key: 'interaction',
      render: (_, record) => (
        <Space>
          {record.binhLuan} 💬 / {record.luotThich} 👍 
        </Space>
      ),
    },
  ];
  /*Chỉ số*/
  const columnsUpdates = [
    {
      title: t('metrics'),
      dataIndex: 'chiSo',
      key: 'chiSo',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: t('updatedAt'),
      dataIndex: 'thoiGian',
      key: 'thoiGian',
    },
    {
      title: t('modification'),
      dataIndex: 'thayDoi',
      key: 'thayDoi',
    },

    {
      title: t('proof'),
      dataIndex: 'minhChung',
      key: 'minhChung',
      render: (src) => (
        <a href={src} target="_blank" rel="noopener noreferrer">
          <img
            src={src}
            alt="Minh chứng"
            style={{ width: 100, borderRadius: 4, objectFit: 'cover', cursor: 'pointer' }}
          />
        </a>
      ),
    }
  ];
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

      <Divider>Các bài viết liên quan đến tín chỉ carbon</Divider>

      <Card>
        <Table
          columns={columns}
          dataSource={postData}
          pagination={false}
          scroll={{ x: true }}
        />
      </Card>

      <Divider>Cập nhật gần đây</Divider>
      <Card>
        <Table
          columns={columnsUpdates}
          dataSource={recentUpdates}
          pagination={false}
          scroll={{ x: true }}
        />
      </Card>
    </div>
  );
};

export default PostDashboard;
