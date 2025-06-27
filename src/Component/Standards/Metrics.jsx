import React, { useState } from 'react';
import { Table, Space, Input, Row, Col, Card, Button } from 'antd';
import { SearchOutlined, CloudOutlined, PlusOutlined } from '@ant-design/icons';
import CarbonDrawer from '../../Reusable/Drawer';
import { useTranslation } from 'react-i18next';
import '@ant-design/v5-patch-for-react-19';

const carbonData = [
  {
    key: '1',
    tenChiSo: 'Điện từ than đá',
    AD: '0.9',
    EF: '98.0',
    heSoPhatThaiCO2: '882',
  },
  {
    key: '2',
    tenChiSo: 'Điện từ khí thiên nhiên',
    AD: '0.85',
    EF: '75.0',
    heSoPhatThaiCO2: '510',
  },
  {
    key: '3',
    tenChiSo: 'Điện từ dầu diesel',
    AD: '0.88',
    EF: '85.0',
    heSoPhatThaiCO2: '742',
  },
  {
    key: '4',
    tenChiSo: 'Sinh khối (biomass)',
    AD: '0.5',
    EF: '25.0',
    heSoPhatThaiCO2: '100',
  },
  {
    key: '5',
    tenChiSo: 'Thủy điện',
    AD: '0.95',
    EF: '5.0',
    heSoPhatThaiCO2: '24',
  },
  {
    key: '6',
    tenChiSo: 'Năng lượng mặt trời',
    AD: '1.0',
    EF: '0.0',
    heSoPhatThaiCO2: '0',
  },
];

const CarbonCreditDashboard = () => {
  const { t } = useTranslation();
  const [,setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(carbonData);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = carbonData.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(value.toLowerCase())
      )
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
    { name: 'tenChiSo', label: t('name') },
    { name: 'AD', label: t('ad') },
    { name: 'EF', label: t('ef') },
    { name: 'heSoPhatThaiCO2', label: t('CO₂ Emission Factor') },
  ];

  const columns = [
    {
      title: t('name'),
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
      title: t('ad'),
      dataIndex: 'AD',
      key: 'AD',
    },
    {
      title: t('ef'),
      dataIndex: 'EF',
      key: 'EF',
    },
    {
      title: t('coefficient'),
      dataIndex: 'heSoPhatThaiCO2',
      key: 'heSoPhatThaiCO2',
      render: (value) => (
        <Space>
          {value}
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
                    placeholder={t('metricSearch')}
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

export default CarbonCreditDashboard;