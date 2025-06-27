import React, { useState } from 'react';
import { Table, Tag, Space, Input, Row, Col, Card, Button } from 'antd';
import { SearchOutlined, EnvironmentOutlined, CalendarOutlined, PlusOutlined } from '@ant-design/icons';
import CarbonDrawer from '../../Reusable/Drawer';
import { useTranslation } from 'react-i18next';
import '@ant-design/v5-patch-for-react-19';

const carbonActivities = [
  {
    key: '1',
    tenHoatDong: 'Trồng rừng tại Gia Lai',
    thoiGian: '15/05/2024',
    status: 'complete',
  },
  {
    key: '2',
    tenHoatDong: 'Lắp đặt hệ thống điện mặt trời',
    thoiGian: '12/09/2023',
    status: 'supervised',
  },
  {
    key: '3',
    tenHoatDong: 'Tham gia giao dịch tín chỉ carbon với Singapore',
    thoiGian: '12/12/2024',
    status: 'expected',
  },
  {
    key: '4',
    tenHoatDong: 'Đánh giá chuỗi cung ứng theo ESG',
    thoiGian: '11/03/2025',
    status: 'processing',
  },
];

const CarbonActivityList = () => {
  const { t } = useTranslation();
  const [,setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(carbonActivities);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = carbonActivities.filter(item =>
      item.tenHoatDong.toLowerCase().includes(value.toLowerCase()) ||
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

  const handleAdd = (newRecord) => {
    setFilteredData((prev) => [
      ...prev,
      { ...newRecord, key: `${prev.length + 1}` }
    ]);
  };

  const handleDelete = (key) => {
    setFilteredData((prev) => prev.filter((item) => item.key !== key));
  };

  const fieldsConfig = [
    {
      name: 'tenHoatDong',
      label: t('name'),
      rules: [{ required: true, message: `${t('name')} ${t('isRequired')}` }],
    },
    {
      name: 'thoiGian',
      label: t('time'),
      type: 'date',
      rules: [{ required: true, message: `${t('time')} ${t('isRequired')}` }],
    },
    {
      name: 'status',
      label: t('status'),
      type: 'select',
      options: [
        { value: 'upcoming', label: t('expected') },
        { value: 'continuing', label: t('processing') },
        { value: 'complete', label: t('complete') },
      ],
      rules: [{ required: true, message: `${t('status')} ${t('isRequired')}` }],
    },
  ];

  const columns = [
    {
      title: t('name'),
      dataIndex: 'tenHoatDong',
      key: 'tenHoatDong',
      render: (text) => (
        <Space>
          <EnvironmentOutlined />
          <strong>{text}</strong>
        </Space>
      ),
    },
    {
      title: t('time'),
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
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'green';

        if (status.includes('expected')) color = 'orange';
        else if (status.includes('processing') || status.includes('supervised')) color = 'gold';
        else if (status.includes('complete')) color = 'green';

        return <Tag color={color}>{t(status)}</Tag>;
      },
    }
  ];

  const handleOpenAddDrawer = () => {
    setIsAdding(true);
    setSelectedRecord(false);
    setDrawerVisible(true);
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card
          title={
            <Row justify="end" gutter={[8, 8]}>
              <Col xs={24} sm={16} md={12} lg={8} xl={6}>
              <Space>
                <Input.Search
                  placeholder={t('searchActivities')}
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
                  icon = {<PlusOutlined />}
                  onClick = {handleOpenAddDrawer}
                  className='force-color'
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

export default CarbonActivityList;
