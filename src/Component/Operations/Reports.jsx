import React from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Divider, Space } from 'antd';
import { CloudOutlined, FireOutlined, LineChartOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import '@ant-design/v5-patch-for-react-19';

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
      title: t('offSetRate'),
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

      <Divider>{t('posts')}</Divider>

      <Card>
        <Table
          columns={columns}
          dataSource={postData}
          pagination={false}
          scroll={{ x: true }}
        />
      </Card>
    </div>
  );
};

export default PostDashboard;
