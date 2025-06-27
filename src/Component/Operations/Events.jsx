import React, { useState } from 'react';
import { Table, Tag, Space, Input, Row, Col, Card, Button } from 'antd';
import { SearchOutlined, CalendarOutlined, EnvironmentOutlined, PlusOutlined } from '@ant-design/icons';
import CarbonDrawer from '../../Reusable/Drawer';
import { useTranslation } from 'react-i18next';
import '@ant-design/v5-patch-for-react-19';
import dayjs from 'dayjs';

const carbonEvents = [
  {
    key: '1',
    tenSuKien: 'Hội thảo CBAM & Thị trường carbon',
    thoiGian: '15/07/2025',
    status: 'upcoming',
  },
  {
    key: '2',
    tenSuKien: 'Giao lưu doanh nghiệp - chia sẻ tín chỉ',
    thoiGian: '10/05/2025',
    status: 'complete',
  },
  {
    key: '3',
    tenSuKien: 'Chiến dịch "Plant 1 Million Trees"',
    thoiGian: '02/09/2025',
    status: 'continuing',
  },
  {
    key: '4',
    tenSuKien: 'Họp nội bộ đánh giá tín chỉ quý II',
    thoiGian: '30/06/2025',
    status: 'complete',
  },
];

const CarbonEventList = () => {
  const { t } = useTranslation();
  const [,setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(carbonEvents);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

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
      name: 'tenSuKien',
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
        { value: 'upcoming', label: t('upcoming') },
        { value: 'continuing', label: t('continuing') },
        { value: 'complete', label: t('complete') },
      ],
      rules: [{ required: true, message: `${t('status')} ${t('isRequired')}` }],
    },
  ];

  const columns = [
    {
      title: t('name'),
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

        if (status === 'upcoming') color = 'orange';
        else if (status === 'continuing') color = 'gold';
        else if (status === 'complete') color = 'green';

        return <Tag color={color}>{t(status)}</Tag>;
      },
    },
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
                  placeholder="Tìm kiếm sự kiện..."
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
                ></Button>
              </Space>
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
            initialValues={
              isAdding
                ? {
                    thoiGian: dayjs(),
                  }
                : undefined
            }
          />
        </Card>
      </Col>
    </Row>
  );
};

export default CarbonEventList;
